const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const acbutton = document.querySelector('#ac');

var displayValue = '0';
var operator = '';
var num1 = 0;
var num2 = 0;
var maxLength = false;

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function clear() {
    display.textContent = '0';
    displayValue = '';
    operator = '';
    num1 = 0;
    num2 = 0;
    maxLength = false;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return substract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
    }    
}

function updateDisplay() {
    checkLength();
    display.textContent = roundToTwo(displayValue);
}

function checkLength() {
    if (displayValue.length > 9) {
        maxLength = true;
    } 
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

operators.forEach (button => {
    button.addEventListener('click', () => { 
        operator = button.value;
        num1 = parseInt(display.textContent);
        displayValue = '';
    });
});

numbers.forEach (button => {
    button.addEventListener('click', () => {
        if (displayValue == '0' || displayValue == "0"){
            displayValue = '';
        }
        if (!maxLength) {
            displayValue += button.value;
        }        
        updateDisplay();        
    });
});

acbutton.addEventListener('click', () => {
    clear();    
});

equalsButton.addEventListener('click', () => {
    num2 = parseInt(display.textContent);
    displayValue = operate(num1, num2, operator);
    updateDisplay();
    num1 = parseInt(displayValue);
    displayValue = '';
});

updateDisplay();