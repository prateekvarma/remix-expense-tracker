import { destroyUserSession } from '../data/auth.server';

// triggered when logout button is clicked
export function action({ request }) {
  if (request.method !== 'POST') {
    throw json({ message: 'Invalid request method' }, { status: 400 });
  }

  return destroyUserSession(request);
}
