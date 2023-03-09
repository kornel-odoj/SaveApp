const incomeTitle = document.querySelector('.income-title');
const expenseTitle = document.querySelector('.expenses-title');
const incomeWrapper = document.querySelector('.income');
const expensesWrapper = document.querySelector('.expenses');
const form  = document.querySelector('.add-form');
let counter = 1;
let incomeSum = 0;
let expensesSum = 0;
let budgetInfo = document.querySelector('.budget-info');
const incomeName = document.querySelector('.input-name');
const incomeValue = document.querySelector('.input-value');
const incomeAppend = document.querySelector('.add-income-wrapper');
const expensesAppend = document.querySelector('.add-expenses-wrapper');
const addButton = document.querySelector('.input-button');
const inc = document.querySelector('#inc');
const exp = document.querySelector('#exp');
let recordCounter = 1;
let wrapId;
let deleteId;
let editId;
let inputNameId;
let inputValueId;
let inputVal;
let inputName;
let value;
// refresh balance
const refreshBalance = () => {
    let balance = incomeSum - expensesSum;
    if (balance == 0) {
        budgetInfo.innerText = 'Bilans wynosi zero';
}
    else if (balance >= 0) {
        budgetInfo.innerText = `Możesz jeszcze wydać ${balance} złotych`;
}
    else if (balance <= 0) {
        budgetInfo.innerText = `Bilans jest ujemny. Jesteś na minusie ${balance*=(-1)} złotych`;
}
};
window.addEventListener('load', refreshBalance);

// switch between income/expense page
const incomeExpenseChange = () => {
    incomeTitle.style.opacity = '0.5';
    expenseTitle.style.opacity = '1';
    incomeWrapper.style.display = 'none';
    expensesWrapper.style.display = 'block';
    incomeName.setAttribute('placeholder', 'Nazwa wydatku');
    counter = 0;
}
const expenseIncomeChange = () => {
    incomeTitle.style.opacity = '1';
    expenseTitle.style.opacity = '0.5';
    incomeWrapper.style.display = 'block';
    expensesWrapper.style.display = 'none';
    incomeName.setAttribute('placeholder', 'Nazwa przychodu');
    counter = 1;
}

incomeTitle.addEventListener('click', expenseIncomeChange);
expenseTitle.addEventListener('click', incomeExpenseChange);


// add income/expense 
const addRecord = () => {
    wrapId = 'w' + recordCounter;
    deleteId = 'd' + recordCounter;
    editId = 'e' + recordCounter;
    paragraphId = 'p' + recordCounter;
    inputNameId = 'i' + recordCounter;
    inputValueId = 'v' + recordCounter;
    inputName = incomeName.value.trim();
    value = incomeValue.value;

    if (inputName !== '' && value !== '' && value > 0) {
        //create and set class to wrapper
        let wrap = document.createElement('div');
        wrap.setAttribute('class', 'added-to-list');
        wrap.setAttribute('id', wrapId);

        //append wrapper to income or expense depending on counter state
        counter == 1 ? incomeAppend.appendChild(wrap) : expensesAppend.appendChild(wrap);
        
        //create and set class to paragraph
        let paragraph = document.createElement('p');
        paragraph.setAttribute('id', paragraphId);
        paragraph.setAttribute('custom-value', value);
        paragraph.innerText = `${inputName} - ${value} zł`;
        
        //append paragraph to wrapper
        wrap.appendChild(paragraph);
        
        //create, set class and append name input to wrapper
        let input = document.createElement('input');
        input.setAttribute('id', inputNameId);
        input.setAttribute('class', 'update-input-name');
        input.setAttribute('placeholder', 'Nazwa')
        wrap.appendChild(input);
        input.style.display = 'none';

        //create, set class and append value input to wrapper
        let inputv = document.createElement('input');
        inputv.setAttribute('id', inputValueId);
        inputv.setAttribute('class', 'update-input-amount');
        inputv.setAttribute('placeholder', 'Kwota');   
        inputv.setAttribute('type', 'number');
        wrap.appendChild(inputv);
        inputv.style.display = 'none';
        inputv.style.marginLeft = '0.5em';
        
        //create, set class and append buttons wrapper to main wrapper
        let editDeleteWrap = document.createElement('div');
        editDeleteWrap.setAttribute('class', 'edit-delete-wrapper');
        wrap.appendChild(editDeleteWrap);
        
        //create, set class and append edit button to buttons wrapper
        let editButton = document.createElement('button');
        editButton.setAttribute('class', 'edit-button');
        editButton.setAttribute('id', editId);
        editButton.innerText = 'Edytuj';
        editDeleteWrap.appendChild(editButton);

        //create, set class and append delete button to buttons wrapper
        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'delete-button');
        deleteButton.setAttribute('id', deleteId)
        deleteButton.innerText = 'Usuń';
        editDeleteWrap.appendChild(deleteButton);
        
        //reset form
        form.reset();
        
        //increment counter
        recordCounter++;

        
        counter == 1 ? incomeSum = parseInt(incomeSum)+parseInt(value) : expensesSum = parseInt(expensesSum)+parseInt(value);
        inc.innerText = incomeSum + ' zł';
        exp.innerText = expensesSum + ' zł';
        refreshBalance();
    }
    else {
        swal({
            title: "Uzupełnij poprawnie dane.",
            text: "Pola \"nazwa\" oraz \"wartość\" muszą być wypełnione. \nPole \"wartość\" musi mieć wartość dodatnią.",
            icon: "error",
            button: "OK",
          });
    }
}

addButton.addEventListener('click', addRecord);

let editState = 1;
// edit income/expense 
document.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        
        let customValue;
        if (event.target.id.includes('d')){
            const bId = event.target.id;
            const wId = bId.replace('d', 'w');
            const w = document.getElementById(wId);
            const pId = bId.replace('d', 'p');
            const p = document.getElementById(pId);
            customValue = parseInt(p.getAttribute('custom-value'));
            w.parentNode.removeChild(w);
            counter == 1 ? incomeSum = parseInt(incomeSum) - parseInt(customValue) : expensesSum = parseInt(expensesSum) - parseInt(customValue);
            inc.innerText = incomeSum + ' zł';
            exp.innerText = expensesSum + ' zł';
        }
        else if (event.target.id.includes('e')){
            
            const eId = event.target.id;
            const pId = eId.replace('e', 'p');
            const iId = eId.replace('e', 'i');
            const vId = eId.replace('e', 'v');
            const dId = eId.replace('e', 'd');
            const p = document.getElementById(pId);
            const i = document.getElementById(iId);
            const e = document.getElementById(eId);
            const v = document.getElementById(vId);
            const d = document.getElementById(dId);
            customValue = parseInt(p.getAttribute('custom-value')); 
            if(editState === 1){
                const replacement = i.value;
                p.innerText = replacement;
                p.style.display = 'none';
                d.style.display = 'none';
                i.style.display = 'block';
                v.style.display = 'block';
                e.innerText = "Aktualizuj";
                counter == 1 ? incomeSum = parseInt(incomeSum) - customValue : expensesSum = parseInt(expensesSum) - customValue;
                p.removeAttribute('custom-value');
                inc.innerText = incomeSum + ' zł';
                exp.innerText = incomeSum + ' zł';
                editState = 0;
            }
            else if (editState === 0){
                if (v.value > 0 && i.value.trim() != ""){
                    const newValue = parseInt(v.value);
                    p.innerText = `${i.value} - ${newValue} zł`;
                    p.style.display = 'block';
                    d.style.display = 'inline-block';
                    i.style.display = 'none';
                    v.style.display = 'none';
                    e.innerText = "Edytuj";
                    p.setAttribute('custom-value', newValue);
                    counter == 1 ? incomeSum = parseInt(incomeSum) + newValue : expensesSum = parseInt(expensesSum) + newValue;
                    inc.innerText = incomeSum + ' zł';
                    exp.innerText = expensesSum + ' zł';
                    editState = 1;
                }
                else{
                    swal({
                        title: "Uzupełnij poprawnie dane.",
                        text: "Pola \"nazwa\" oraz \"wartość\" muszą być wypełnione. \nPole \"wartość\" musi mieć wartość dodatnią.",
                        icon: "error",
                        button: "OK",
                      });
                }
                
            }
        }
  }
  refreshBalance();
});



  