import AuthForm from '~/components/auth/AuthForm';
import { validateCredentials } from '../data/validation.server';

import authStyles from '~/styles/auth.css';

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

  if(authMode === 'login') {
    
  } else {

  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
