////  Javascript for Calculator Project 3/29  ////

//methods, arrays, objects, DOM manipulation

//notes: 3/31 1:03pm: could rename accumulator and number. Can also possible create inside function with 
// methods and then do symbol lookup to return logic. Accumulator will be global variable though.
// notes for 4/1: decimalNumber / 1.0 isnt yeildig a decimal, start there tomorrow to first find a decimal conversion method //
// issues as of 5pm 4/1: if you hit '=' button multiple times in a row, it glitches and stops working.
// what can i use arguements parameter object for?

// and refactoring and CSS, need only 1 decimal per operation and limitng digits
//can convert number to string and slice if over length of 10 and convert back (or array.from --> slice..---> join)
//to 14. also need to set text on the other side.

const inputField = document.querySelector('#displayField');
const numberButtons = document.querySelectorAll('.number-button');
const calculatorButtons = document.querySelectorAll('.button');
const clearButton = document.querySelector('#clear');
const opColorButtons = document.querySelectorAll('.operate');

let numberInput;
let operatorInput;
let accumulatorNumber;
let secondNumber;
let activeOperator;
let decimalButtonState = false;

// need to limit numberfield length to 14 until shrinks //
//then git add / commit. then, refactor //
// add backspace functionality, so the user can undo if they click the wrong button

function updateNumberField(calculatorField = 0, fontSize) {
    inputField.textContent = calculatorField;
    inputField.style.fontSize = fontSize;
};
updateNumberField();

// function updateButtonColor(buttonValue) {
//     opColorButtons.forEach(button => {
//         if (button.dataset.colored) {
//             button.dataset.colored = false;
//             button.style.color = 'black';
//         }
//         if (buttonValue === button.textContent) {
//             button.style.color = 'darkred';
//             button.dataset.colored = true;
//         }
//     })
// };


function updateButtonColor(buttonValue) {
    opColorButtons.forEach(button => {
        if (button.style.color === 'darkred') {
            button.style.color = 'black';
        }
        if (buttonValue === button.textContent) {
            button.style.color = 'darkred';
        }
    })
};

function resizeText() {
    const inputField = document.querySelector('#displayField');
    const maxWidth = inputField.offsetWidth;
    let fontSize = 47;
    while(inputField.scrollWidth > maxWidth) {
        fontSize--;
        inputField.style.fontSize = fontSize + 'px';
    }
};

numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (numberInput) { numberInput += event.target.textContent; }
        else { numberInput = event.target.textContent; };
        updateNumberField(numberInput);
        resizeText();
        clearButton.textContent = 'C';
    });
});

calculatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
    let numAffector = event.target.textContent;         
    calculatorAffectors(numAffector);
    resizeText(); // still finding best place for this. here? //
    })
});

function calculatorAffectors(numAffector) {
    switch (numAffector) {
        case "del" :
        case "." :
        case "AC" :
        case "C" :
        case "%" :
        case "+/-" : 
            operatorLookup[numAffector]();
        break;
        default:
            numberInput = parseFloat(numberInput);
            operatorInput = numAffector;
            operateLogic(operatorInput);
        if ((operatorInput || activeOperator) && numAffector !=="=") {updateButtonColor(numAffector)};
    };
};

function operateLogic(operatorInput) {
    if (accumulatorNumber && activeOperator) {
        secondNumber = numberInput; // do i need this? or insert numberInput where second num is? //
        accumulatorNumber = operatorLookup[activeOperator](accumulatorNumber, secondNumber);
        updateNumberField(accumulatorNumber);
        activeOperator = operatorInput;
        if (operatorInput === '=') {[activeOperator, secondNumber] = [null, null]};
        updateButtonColor(operatorInput);
    } else if (accumulatorNumber && activeOperator === null) {
        activeOperator = operatorInput;
    } else {
        accumulatorNumber = numberInput;
        activeOperator = operatorInput;
    };
    [numberInput, operatorInput] = [null, null];
};

let operatorLookup = {
    '+': (accumulatorNumber, secondNumber) => accumulatorNumber + secondNumber,
    '-': (accumulatorNumber, secondNumber) => accumulatorNumber - secondNumber,
    '*': (accumulatorNumber, secondNumber) => accumulatorNumber * secondNumber,
    '/': (accumulatorNumber, secondNumber) => accumulatorNumber / secondNumber,
    '%': () => { 
        if (accumulatorNumber && numberInput === null) {
            accumulatorNumber *= 0.01;
            updateNumberField(accumulatorNumber);
        } else {
            numberInput = (parseFloat(numberInput) * 0.01).toString();
            updateNumberField(numberInput);
        };  // resizeText();
    },
    '.': () => {
        if (numberInput === null) { decimalButtonState = true; numberInput = '0.'; }
        else if (decimalButtonState === false) { numberInput += '.' };            
            updateNumberField(numberInput);
    },    
    'AC': () => {
        [numberInput, operatorInput, accumulatorNumber, secondNumber, activeOperator] = [null, null, null, null, null];
            decimalButtonState = false;
            updateNumberField(0, '47px');
            updateButtonColor();
    },
    'C': () => {
        if (numberInput) {
            numberInput = null;
            updateNumberField(0, '47px');
        } else if (accumulatorNumber && activeOperator === null) {
            accumulatorNumber = null;
            updateNumberField(0, '47px');
        } else if (accumulatorNumber && activeOperator) { operatorInput = null; activeOperator = null; }
            clearButton.textContent = 'AC';
            updateButtonColor();
            decimalButtonState = false;
    },
    '+/-': () => { 
        if (accumulatorNumber && numberInput === null) {
            accumulatorNumber *= -1;
            return updateNumberField(accumulatorNumber);
        } else if (numberInput === null) { numberInput = '-' }
        else {    
        numberInput = (parseFloat(numberInput) * -1).toString() };
        updateNumberField(numberInput);
    },
    'del': () => {
        if (numberInput) {
            console.log("del");
            numberInput = numberInput.slice(0, -1);
            updateNumberField(numberInput);
        };
    },
};

/////////////////////////
// notes/learn:  need buttons.forEach if there are multiple buttons in one button variable , (how did i forget?)
// otherwise it wont work– not specific enough
// //still converts string to number, with or w/o decimal.
// operatorLookup[nubby](): need to have brackets if i am doing an object lookup w/ a function, even if im not passing a number to the parameter
//////////////////////////
// #1: first number input, and then first operator input goes through here
// #2: after there is a number and an operator, and another number is input ->the numberInput gets passed into 
// here when the next operator is pressed (so far for !'=' operators)
// #3: equal does the same, but clears the first Operator and secondNumber
// #4: For doing a new operation after another operation. (e.g. 3+3=6+'...')
// if an operation has already happend, and the result is in accumulatorNumber.
// it will go to #2 or #3 for next operation
//////////////////////////