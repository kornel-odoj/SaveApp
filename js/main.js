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
let recordCounter = 1;
let wrapId;
let deleteId;
let editId;
const addRecord = () => {
    wrapId = 'w' + recordCounter;
    deleteId = 'd' + recordCounter;
    editId = 'e' + recordCounter;
    let name = incomeName.value;
    let value = incomeValue.value;
    if (name !== '' && value !== '') {
        let wrap = document.createElement('div');
        wrap.className = 'added-to-list';
        wrap.setAttribute('id', wrapId);
        counter == 1 ? incomeAppend.appendChild(wrap) : expensesAppend.appendChild(wrap);
        let paragraph = document.createElement('p');
        paragraph.innerText = `${name} - ${value} zł`;
        wrap.appendChild(paragraph);
        let editDeleteWrap = document.createElement('div');
        editDeleteWrap.className = 'edit-delete-wrapper';
        wrap.appendChild(editDeleteWrap);
        let editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.setAttribute('id', editId);
        editButton.innerText = 'Edytuj';
        editDeleteWrap.appendChild(editButton);
        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.setAttribute('id', deleteId)
        deleteButton.innerText = 'Usuń';
        editDeleteWrap.appendChild(deleteButton);
        form.reset();
        recordCounter++;
    }
    else {
        alert('Pola \"nazwa\" oraz \"wartość\" muszą być wypełnione');
    }   
}
console.log('deleteId: ' + deleteId + ' id type: ' + typeof(deleteId));;
console.log('editId: ' + editId + ' id type: ' + typeof(editId));;
addButton.addEventListener('click', addRecord);

// const buttons = document.getElementsByTagName('button');
// const buttonPressed = e => {
//     console.log(e.target.id);
// }
// for (let button of buttons) {
//     button.addEventListener('click', buttonPressed);
// }

document.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        if (event.target.id.includes('d')){
            const bId = event.target.id;
            const wId = bId.replace('d', 'w');
            const w = document.getElementById(wId);
            // console.log(`bId: ${bId} wId: ${wId} w: ${w}`);
            w.parentNode.removeChild(w);
        }
    }
  });


  