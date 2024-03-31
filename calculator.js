////  Javascript for Calculator Project 3/29  ////

//methods, arrays, objects, DOM manipulation
// takes the three variables as its parameters, and calls a function for the needed operation //
const inputField = document.querySelector('#displayField');
const numberButtons = document.querySelectorAll('.number-button');
const calcButtons = document.querySelectorAll('.button');
inputField.textContent = '0';

let numberInput;
let firstNumber; // i like firstOperand, and secondOperand//
let operatorInput; // have variable here to store, or have first number, when operator pressed,  assigns field
// ...values to that particular operator function ??
let secondNumber;
let firstOperator;

numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        inputField.textContent = event.target.textContent;
        numberInput = parseInt(event.target.textContent); //might need to do += for numbers > 1 digit;
        console.log(numberInput);
        // will need something to clear the operator button color;
    });
})

calcButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.target.id === 'clear') {
            [numberInput, firstNumber, secondNumber = null, null, null];
            inputField.textContent = 0;
        } else {
            operatorInput = event.target.textContent;
            operate(operatorInput);
        }; 
        // if (event.target.id === 'plus' || 'minus' || 'multiply' || 'divide' || 'equal') { ///come back to this. should be class
        //     operatorInput = event.target.textContent;
        //     operate(operatorInput);
        // };
        //inputField.textContent = numberInput; // fix this
    });
})
 
// press '5'. numberinput = 5
// press '+'. operatorInput = +; 
// operate(operatorInput) --> 1. (firstNumber = numberInput) (because firstNumber or secondNumber have yet to be assigned)
// 2. numberInput is cleared 3. (firstOperator = operatorInput)
// press '6'. numberInput = 6
// press '-'. operatorInput = '-'
// operate(operatorInput) --> 1. (secondNumber = numberInput) (because frst has been assigned)
// --> 2. 


// go with function, object, switch? 

function operate(operatorInput) { // I WANT THE LOGIC IN THE OPERATE FUNCTION //
    if (firstNumber && firstOperator !== null) {
        secondNumber = numberInput;
        console.log(`secondNumber: ${secondNumber}`);
        console.log(`firstOperator: ${firstOperator}`);
        firstNumber = operatorChannel[firstOperator](firstNumber, secondNumber);                       //add(firstNumber, secondNumber);
        console.log(firstNumber);
        inputField.textContent = firstNumber;
    } else {
        firstNumber = numberInput;
        firstOperator = operatorInput;
        operatorInput = null;
        console.log(`firstNumber: ${firstNumber}`);
        console.log(`firstOperator: ${firstOperator}`);
    }; //If (!operatorInput) {operatorChannel[firstOperator](firstNumber, secondNumber)}
    //numberInput = null;
};

let operatorChannel = {
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '%': (firstNumber, secondNumber) => firstNumber || secondNumber, //filler for now
    '=': ('filler...'),
    '.': ('filler...'),



};

// const subtract = function(...numbers) {
//     return numbers.reduce((accumulator, currentNumber) => accumulator - currentNumber);
// };
//////////////////////////////////////
// notes/learn:  need buttons.forEach if there are multiple buttons in one button variable , 
// otherwise it wont work– not specific enough

