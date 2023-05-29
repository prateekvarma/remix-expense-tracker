import { hash, compare } from 'bcryptjs';

import { prisma } from './database.server';
import { createCookieSessionStorage } from '@remix-run/node';

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

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error('A user with this email already exists'); //works
    error.status = 422; //does not work
    throw error;
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({ data: { email: email, password: passwordHash } });
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
}
