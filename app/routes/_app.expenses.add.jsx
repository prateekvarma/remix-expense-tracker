import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { addExpense } from '../data/expenses.server';
import { redirect } from '@remix-run/node';

export default function AddExpensesPage() {
  const navigate = useNavigate();
  function closeHandler() {
    // navigate programmatically to the home page
    navigate('..');
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />;
    </Modal>
  );
}

export async function action({ request }) {
  //this is triggered when a form submits or another similar action is taken
  const formData = await request.formData();
  // formData.get('title') //to get individual entries, or:
  const expenseData = Object.fromEntries(formData); //made an object from the form data
  await addExpense(expenseData);
  return redirect('/expenses')
}
