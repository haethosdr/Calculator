////  Javascript for Calculator Project 3/29  ////

//methods, arrays, objects, DOM manipulation

//notes: 3/31 1:03pm: could rename accumulator and number. Can also possible create inside function with 
// methods and then do symbol lookup to return logic. Accumulator will be global variable though.
// notes for 4/1: decimalNumber / 1.0 isnt yeildig a decimal, start there tomorrow to first find a decimal conversion method //
// issues as of 5pm 4/1: if you hit '=' button multiple times in a row, it glitches and stops working.
// what can i use arguements parameter object for?
const inputField = document.querySelector('#displayField');
const numberButtons = document.querySelectorAll('.number-button');
const calculatorButtons = document.querySelectorAll('.button');

let numberInput;
let operatorInput;
let firstNumber;
let secondNumber;
let activeOperator;

function inputFieldText(calculatorField) {
    inputField.textContent = calculatorField; 
};
inputFieldText(0);

numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (numberInput) {numberInput += event.target.textContent;}
        else {numberInput = event.target.textContent;};
        inputFieldText(numberInput);
        // will need something to clear the operator button color;
    });
});

calculatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
    let numAffector = event.target.textContent; 
        calculatorAffector(numAffector);
    });
});

function calculatorAffector(numAffector) {
    switch (numAffector) {
        case "." :
        case "AC" :
        case "%" :
        case "+/-" : 
            console.log(numAffector);
            operatorLookup[numAffector]();
        break;
        default:
            numberInput = parseFloat(numberInput);
            operatorInput = numAffector;
            console.log(numAffector);
            operate(operatorInput);
    };
};
 
// priority: now %, then AC simplification, then +/-, then operator button color, then refactor, then CSS.

function operate(operatorInput) {
    if (firstNumber && activeOperator !== null) {  // #2 // 
        secondNumber = numberInput;
        firstNumber = operatorLookup[activeOperator](firstNumber, secondNumber);
        inputFieldText(firstNumber);
        activeOperator = operatorInput;
        if (operatorInput === '=') {[activeOperator, secondNumber] = [null, null]};
    } else if (firstNumber && activeOperator === null) {  // #4 //
        activeOperator = operatorInput;
    } else { // #1 // ///look here for %
        firstNumber = numberInput;
        activeOperator = operatorInput;
    };
    [numberInput, operatorInput] = [null, null]; //if i want to make numberInput = field, will need to change this.
};

let operatorLookup = {     // @ the end, could maybe reduce this. //
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '%': () => {
                numberInput = (parseInt(numberInput) * 0.01).toString();
                inputFieldText(numberInput);
            },
    //'=': (firstNumber, secondNumber) => {this.operatorLookup[firstOperator](firstNumber, secondNumber);
                                       // [firstOperator, secondNumber] = [null, null]}, //fix this
    '.': () => {if (numberInput === null) { numberInput = '0.' }
                else { numberInput += '.' };            
                inputFieldText(numberInput);
            },    
    'AC': () => {
                [numberInput, operatorInput, firstNumber, secondNumber, activeOperator] = [null, null, null, null, null];
                inputFieldText(0);  
            },
    'C': ('filler...'),
    '+/-': ('filler...'), // toggles number between positive or negative. //
};

////////// past code ///////////
//if (operatorInput === '.') {operatorLookup[operatorInput]}; // need to immediately put decimal on screen and with numberInput field
//////////////////////
// #4 //    // or (secondNumber = null && firstOperator = null)? // what is clearer? //
//////////////////////
// console.log(`firstNumber: ${firstNumber}`);
// console.log(`firstOperator: ${firstOperator}`);
// console.log(`numberInput: ${numberInput}`);
// if (event.target.id === 'plus' || 'minus' || 'multiply' || 'divide' || 'equal') { ///come back to this. should be class
//     operatorInput = event.target.textContent;
//     operate(operatorInput);
// };
///////////////////////
// const subtract = function(...numbers) {
//     return numbers.reduce((accumulator, currentNumber) => accumulator - currentNumber);
// };
// if (operatorInput === '=') { // #3 //    ///recent change
//     secondNumber = numberInput;
//     firstNumber = operatorLookup[firstOperator](firstNumber, secondNumber);
//     inputField.textContent = firstNumber;
//     [firstOperator, secondNumber] = [null, null]; //can also add : operatorInput = null, but not necessary//
// } else 
////////////////////////
// if (numAffector === '.') { // this will go to lookup table // ideally clear will also (as in: everything but operators (+,,-,/,*,=)).
//     console.log(numAffector);
//     operatorLookup[numAffector](); // when its  just the firstNumber, i cant ad a decimal
// } else if (event.target.id === 'clear') {
//     [numberInput, operatorInput, firstNumber, secondNumber, firstOperator] = [null, null, null, null, null];
//     inputField.textContent = 0;
// } else {
//     numberInput = parseFloat(numberInput); //still converts string to number
//     console.log(numberInput);
//     //numberInput = parseInt(numberInput); // can also put this in operate();
//     operatorInput = numAffector;
//     operate(operatorInput);
//     console.log(firstNumber);
// };
/////////////////////////
// notes/learn:  need buttons.forEach if there are multiple buttons in one button variable , 
// otherwise it wont work– not specific enough
// //still converts string to number, with or w/o decimal.
// operatorLookup[nubby](): need to have brackets if i am doing an object lookup w/ a function, even if im not passing a number to the parameter
//////////////////////////
// #1: first number input, and then first operator input goes through here
// #2: after there is a number and an operator, and another number is input ->the numberInput gets passed into 
// here when the next operator is pressed (so far for !'=' operators)
// #3: equal does the same, but clears the first Operator and secondNumber
// #4: For doing a new operation after another operation. (e.g. 3+3=6+'...')
// if an operation has already happend, and the result is in firstNumber.
// it will go to #2 or #3 for next operation
//////////////////////////
//1//  press: 3; -> firstNumber = 3; //2//  press +. -> firstOperator = + & operatorInput = + & firstOperator = +.
//3//  press: 3; -> numberInput = 3, inputField = 3 (via event target). 
//4//  press: '='; -> secondNumber = numberInput; firstNumber = operatorLookup[firstOperator](firstNumber, secondNumber);
// inputField = firstNumber; [firstOperator, secondNumber, numberInput] = [null, null, null];
//5// AS OF NOW: firstNumber = 6 & firstOperator = null & secondNumber = null & numberInput = null &o operatorInput = 'null'
//6// press '+'; -> 

