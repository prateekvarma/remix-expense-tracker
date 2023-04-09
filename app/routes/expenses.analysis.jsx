import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import Chart from '~/components/expenses/Chart'

export default function ExpensesAnalysisPage() {
    return (
        <main>
            <Chart />
            <ExpenseStatistics />
        </main>
    )
}