import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/ExpensesList';
import expensesStyles from '~/styles/expenses.css';
import { getExpenses } from '../data/expenses.server';

export default function ExpensesLayout() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;

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
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && <section id='no-expenses'>
          <h1>No Expenses found!</h1>
          <p>You can <Link to='add'>add</Link> one now</p>
          </section>}
      </main>
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}

export async function loader() {
  const expenses = await getExpenses();
  return expenses;

  // if (!expenses || expenses.length < 1) {
  //   throw json(
  //     { message: 'No expenses available!' },
  //     { status: 404, statusText: 'No expenses saved in DB' }
  //   );
  // } else {
  //   return expenses
  // }
}

