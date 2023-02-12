const incomeTitle = document.querySelector('.income-title');
const expenseTitle = document.querySelector('.expenses-title');
const incomeWrapper = document.querySelector('.income');
const expensesWrapper = document.querySelector('.expenses');
const form  = document.querySelector('.add-form');
let counter = 1;
const incomeExpenseChange = () => {
    incomeTitle.style.opacity = '0.5';
    expenseTitle.style.opacity = '1';
    incomeWrapper.style.display = 'none';
    expensesWrapper.style.display = 'block';
    counter = 0;
}
const expenseIncomeChange = () => {
    incomeTitle.style.opacity = '1';
    expenseTitle.style.opacity = '0.5';
    incomeWrapper.style.display = 'block';
    expensesWrapper.style.display = 'none';
    counter = 1;
}

incomeTitle.addEventListener('click', expenseIncomeChange);
expenseTitle.addEventListener('click', incomeExpenseChange);

const incomeName = document.querySelector('.input-name');
const incomeValue = document.querySelector('.input-value');
const incomeAppend = document.querySelector('.add-income-wrapper');
const expensesAppend = document.querySelector('.add-expenses-wrapper');
const addButton = document.querySelector('.input-button');
//add counter if income clicked add 1 etc.
const addRecord = () => {
    let name = incomeName.value;
    let value = incomeValue.value;
    let wrap = document.createElement('div');
    wrap.className = 'added-to-list';
    counter == 1 ? incomeAppend.appendChild(wrap) : expensesAppend.appendChild(wrap);
    let paragraph = document.createElement('p');
    paragraph.innerText = `${name} - ${value}zł`;
    wrap.appendChild(paragraph);
    let editDeleteWrap = document.createElement('div');
    editDeleteWrap.className = 'edit-delete-wrapper';
    wrap.appendChild(editDeleteWrap);
    let editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerText = 'Edytuj';
    editDeleteWrap.appendChild(editButton);
    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerText = 'Usuń';
    editDeleteWrap.appendChild(deleteButton);
    form.reset();
}

addButton.addEventListener('click', addRecord);
