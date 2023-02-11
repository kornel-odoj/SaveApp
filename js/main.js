const incomeTitle = document.querySelector('.income-title');
const expenseTitle = document.querySelector('.expenses-title');
const income = document.querySelector('.income');
const expense = document.querySelector('.expenses');
const incomeExpenseChange = () => {
    incomeTitle.style.opacity = '0.5';
    expenseTitle.style.opacity = '1';
    income.style.display = 'none';
    expense.style.display = 'block';
}
const expenseIncomeChange = () => {
    incomeTitle.style.opacity = '1';
    expenseTitle.style.opacity = '0.5';
    income.style.display = 'block';
    expense.style.display = 'none';
}
incomeTitle.addEventListener('click', expenseIncomeChange);
expenseTitle.addEventListener('click', incomeExpenseChange);