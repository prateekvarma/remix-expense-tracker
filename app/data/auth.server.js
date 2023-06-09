import { hash, compare } from 'bcryptjs';

import { prisma } from './database.server';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);

  if(!userId) {
    //user is not logged in
    throw redirect('/auth?mode=login');
  }

  return userId;
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error('A user with this email already exists'); //works
    error.status = 422; //does not work
    throw error;
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: { email: email, password: passwordHash },
  });

  // creating user session immediately after signup
  return createUserSession(user.id, '/expenses');
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error('Could not find a user with this email');
    error.status = 401;
    throw error;
  }

  const isPasswordCorrect = await compare(password, existingUser.password);

  if (!isPasswordCorrect) {
    const error = new Error('Incorrect password');
    error.status = 401;
    throw error;
  }
  // auth success
  return createUserSession(existingUser.id, '/expenses');
}
