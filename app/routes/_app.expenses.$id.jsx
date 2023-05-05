// /expenses/<some-id>
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { updateExpense } from '../data/expenses.server';
import { redirect } from '@remix-run/node';
import { validateExpenseInput } from '../data/validation.server';
// import { getExpense } from '../data/expenses.server';

export default function UpdateExpensesPage() {
  const navigate = useNavigate();
  function closeHandler() {
    // navigate programmatically to the home page
    navigate('..');
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader({ params }) {
// old loader which extracts and returns a single expense
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export async function action({ params, request }) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await updateExpense(expenseId, expenseData);
  return redirect('/expenses');
}
