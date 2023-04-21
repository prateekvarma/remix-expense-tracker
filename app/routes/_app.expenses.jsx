const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'first title',
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: 'e2',
    title: 'second title',
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

import { Link, Outlet } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/ExpensesList';
import expensesStyles from '~/styles/expenses.css';
// tbd: create a new layout file called _app.tsx and put all the expenses files in it, so they can share the mainHeader
export default function ExpensesLayout() {
  return (
    <>
      <Outlet />
      <main>
        <section id='expenses-actions'>
          {/* below, adding a relative link */}
          <Link to='add'>
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href='/expenses/raw'>
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}
