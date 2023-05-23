import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '../data/expenses.server';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();


  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}

export async function loader() {
  const expenses = await getExpenses();
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'Could not load data from expenses analysis!' },
      { status: 404, statusText: 'Expenses not found!' }
    );
  }

  return expenses; // means return json(expenses) as remix does this for us
}
