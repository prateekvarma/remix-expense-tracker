import AuthForm from '~/components/auth/AuthForm';
import { validateCredentials } from '../data/validation.server';

import authStyles from '~/styles/auth.css';
import { login, signup } from '../data/auth.server';
// import { redirect } from '@remix-run/node';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  //triggers when form is submitted
  const searchParams = new URL(request.url).searchParams; // URL is a Node.js constructor
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  //optional: validation
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      return await login(credentials);
    } else {
      //signup logic
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422) {
      return {
        credentials: error.message, // returning here would display error on form
      };
    }
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
