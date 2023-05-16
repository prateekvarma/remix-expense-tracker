import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({request}) {
  //triggers then form is submitted
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
