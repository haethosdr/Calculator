////  Javascript for Calculator Project 3/29-4/4  ////

// update: deleted secondNumber variable in operateLogic, and inserted numberInput into operatorLookup object function
//can convert number to string and slice if over length of 10 and convert back (or array.from --> slice..---> join)
//to 14. also need to set text on the other side.
// still need keyboard support. can come back to it //
// approx 165  lines // last 2 days have been nit picky stuff! //

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

function updateNumberField(calculatorField = 0, fontSize) {
    inputField.textContent = calculatorField;
    inputField.style.fontSize = fontSize;
};
updateNumberField();

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
        calculatorAffectors(event.target.textContent);
    })
    button.addEventListener('keydown', (event) => {
        console.log(event.key);
        // calculatorEffectors(event.target.textContent);   
    })
});
// should be numEffectors //
function calculatorAffectors(numEffector) {
    switch (numEffector) {
        case "delete" :
        case "." :
        case "AC" :
        case "C" :
        case "%" :
        case "+/-" : 
            operatorLookup[numEffector]();
        break;
        default:
            numberInput = parseFloat(numberInput);
            operateLogic(numEffector);
        if (numEffector || activeOperator && numEffector !=="=") {updateButtonColor(numEffector)};
    };
    resizeText();
};

//10 x 10 = 100 
// accumulator ('=') (fixed@ #6), accumulator '+' '=' (fixed@ #5), accumlator '+' (fixed@ #7);
// numberInput '=' (fixed@ #6 || #4), numberInput '+' '=' (not necessary) //
function operateLogic(operatorInput) {
    console.log(`operateLogic:: accumulatorNumber: ${accumulatorNumber}`, `numberInput: ${numberInput}`, `activeOperator: ${activeOperator}`);
    if (accumulatorNumber && numberInput && activeOperator) { //#1
        accumulatorNumber = operatorLookup[activeOperator](accumulatorNumber, numberInput);
        inputField.style.borderBottomColor = 'red';
        updateNumberField(accumulatorNumber); //can i just have one input as array and choose index in function for which prt of function to perform?
        activeOperator = operatorInput;
        if (operatorInput === '=') { activeOperator = null };
        updateButtonColor(operatorInput);
        decimalButtonState = false;
        console.log("Channel 1");
    } else if (accumulatorNumber && activeOperator && operatorInput === '=') {
        accumulatorNumber = operatorLookup[activeOperator](accumulatorNumber, accumulatorNumber);
        updateNumberField(accumulatorNumber);
        updateButtonColor(operatorInput);
        inputField.style.borderBottomColor = 'red';
        activeOperator = null; // #5 //
        console.log("Channel 2");
    } else if (accumulatorNumber && activeOperator && !numberInput) { 
        console.log("Channel 3");
        return;   // #7
    } else if (accumulatorNumber && activeOperator === null && operatorInput !== '=') { 
        activeOperator = operatorInput; // #2 //
        console.log("Channel 4");
    } else {   //#6
        if (operatorInput === '=') {
            console.log("Channel 5");
            updateButtonColor(operatorInput);
            return;
        }; //accum --> numberInput --> '=' (#4) [Accu and numberinput but no activeOperator. if now i hit '+', it should leave the numbers and assign that to active operator]
        accumulatorNumber = numberInput;
        activeOperator = operatorInput;
        console.log("Channel 5.5");
    }; 
    console.log(`operateLogic:: accumulatorNumber: ${accumulatorNumber}`, `numberInput: ${numberInput}`, `activeOperator: ${activeOperator} ______________`);
    [numberInput, operatorInput] = [null, null];
}; // should i do an edgeCaseLogics() function? to keep operateLogic slim?

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
        };
    },
    '.': () => {
        if (numberInput === null) { decimalButtonState = true; numberInput = '0.'; }   
        else if (decimalButtonState === false) { decimalButtonState = true; numberInput += '.'; console.log("yo");}
        updateNumberField(numberInput);
    },    
    'AC': () => {
        [numberInput, operatorInput, accumulatorNumber, activeOperator] = [null, null, null, null];
            decimalButtonState = false;
            updateNumberField(0, '47px');
            updateButtonColor();
    },
    'C': () => {
        if (numberInput) {
            numberInput = null;
            updateNumberField(0, '47px');
            decimalButtonState = false;
        } else if (accumulatorNumber && activeOperator) {
            operatorInput = null; activeOperator = null; 
            updateButtonColor();
        } else if (accumulatorNumber && activeOperator === null) {
            [accumulatorNumber, decimalButtonState] = [null, false];
            updateNumberField(0, '47px');
            updateButtonColor();
            clearButton.textContent = 'AC';
            inputField.style.borderBottomColor = 'black';
        }
    },
    '+/-': () => { //       98 / 9-
        if (accumulatorNumber && activeOperator) {
            numberInput += '-';
        };
        if (accumulatorNumber && numberInput === null) {
            accumulatorNumber *= -1;
            return updateNumberField(accumulatorNumber);
        } else if (numberInput === null) { numberInput = '-' }
        else {    
        numberInput = (parseFloat(numberInput) * -1).toString() };
        updateNumberField(numberInput);
    },
    'delete': () => {
        if (numberInput) { numberInput = numberInput.slice(0, -1);
            if (numberInput.includes('.') === false) {decimalButtonState = false}
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