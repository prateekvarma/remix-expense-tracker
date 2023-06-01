import { Outlet } from '@remix-run/react';
import MainHeader from '~/components/navigation/MainHeader';
import marketingStyles from '~/styles/marketing.css';
import { getUserFromSession } from '../data/auth.server';

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export function loader({ request }) {
  return getUserFromSession(request); // this returns a promise, but it does not need to be 'await' here beacuse the loader function does that for us.
}

export function links() {
  return [{ rel: 'stylesheet', href: marketingStyles }];
}
