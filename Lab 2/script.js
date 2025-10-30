const display = document.getElementById('display');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const equalsBtn = document.getElementById('equals');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

let currentInput = '0';
let previousInput = '';
let operation = null;

function updateDisplay() {
    display.textContent = currentInput;
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function deleteDigit() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else if (number === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function selectOperation(operator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = operator;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

// Event listeners for number buttons
numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.value);
    });
});

// Event listeners for operator buttons
operatorBtns.forEach(button => {
    button.addEventListener('click', () => {
        selectOperation(button.dataset.value);
    });
});

// Event listener for equals button
equalsBtn.addEventListener('click', calculate);

// Event listener for clear button
clearBtn.addEventListener('click', clear);

// Event listener for delete button
deleteBtn.addEventListener('click', deleteDigit);

