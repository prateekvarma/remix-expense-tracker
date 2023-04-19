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

export function loader() {
  return DUMMY_EXPENSES;
}
