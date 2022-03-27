const ongoingFunctionDisplay = document.getElementById('ongoingFunction');
const currentInputDisplay = document.getElementById('currentInput');
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
const decimalButton = document.getElementById("decimalBtn");
const equalsButton = document.getElementById("equalsBtn");
const buttons = document.querySelectorAll("button");

let initialEntry = true;
let decimalUsed = false;
let firstOperator = "";
let secondOperator = "";
let firstOperand = "";
let secondOperand = "";

function add(a,b) {
    return (+a + +b);
}

function subtract(a,b){
    return (a - b);
}

function multiply(a,b){
    return (a * b);
}

function divide(a,b){
    return a/b;
}

// make sure to check for equals button
function operate(operator, a, b){
    //switch statement for which operator
    switch (operator){
    case '+': 
        return add(a,b); 
        break;
    case '-':
        return subtract(a,b);
        break;
    case '*':
        return multiply(a,b);
        break;
    case '/':
        return divide(a,b);
        break;
    }
}

// attach updateDisplay function to buttons
numberButtons.forEach((button) => button.addEventListener('click', () => {
    updateDisplay(button.textContent);
}));

decimalButton.addEventListener('click', decimalPushed);

function decimalPushed(){
    if (!decimalUsed) {
        updateDisplay(".")
        decimalUsed = true;
    }
    else {
        errorMessage("Decimal has been used");
    }
}

operatorButtons.forEach((button) => button.addEventListener('click', () => {
    // if no previous number, add current num and chosen operator to ongoing function display
    if(initialEntry){ errorMessage("Must enter a value") }
    else if(!firstOperand){
        firstOperand = currentInputDisplay.textContent;
        firstOperator = button.textContent;
        setOngoingFunction(`${firstOperand} ${firstOperator}`);
        console.log(firstOperator);
    }
    // second operation chosen, and first operand/operator exists
    else{
        secondOperand = currentInputDisplay.textContent;
        secondOperator = button.textContent;
        let currentResult = operate(firstOperator, firstOperand, secondOperand);
        // set ongoing function with result and second operator
        setOngoingFunction(`${currentResult} ${secondOperator}`);
        // recent inputs now become first operator/operand for next entry
        firstOperand = currentResult;
        firstOperator = secondOperator;
    }
    decimalUsed = false;
    clearDisplay();
}));

equalsButton.addEventListener('click', () => {
    // before we do anything, check there are two operands and operator
    if(firstOperand && firstOperator){
        secondOperand = currentInputDisplay.textContent;
        if(firstOperator === '/' && secondOperand == 0){
            errorMessage("Cannot divide by 0");
            clearDisplay();
        }
        else{
            let result = +operate(firstOperator, firstOperand, secondOperand).toFixed(6);
            showResult(result);
        }
    }
});

function showResult(answer){
    currentInputDisplay.textContent = answer;
    setOngoingFunction("");
    firstOperand = "";
}

function clearDisplay(){
    currentInputDisplay.textContent = 0;
    initialEntry = true;
}

/**
 * Update current input display with number, or decimal, given
 * @param {char} char to be added to display 
 */
function updateDisplay(str){
    if(initialEntry){
        currentInputDisplay.textContent = str;
        initialEntry = false;
    }
    else {
        currentInputDisplay.textContent += str;
    }
}

// Set ongoing function display for user to know current state.
function setOngoingFunction(str){
    ongoingFunctionDisplay.textContent = str;
}

/*
    Clear ongoing function, set display to 0, and reset all variables
*/
function clearAll(){
    currentInputDisplay.textContent = 0;
    ongoingFunctionDisplay.textContent = "";
    initialEntry = true;
    decimalUsed = false;
    firstOperand = "";
    secondOperand = "";
    firstOperator = "";
    secondOperator = "";
}

/**
 * Delete previous number/decimal from current input
 */
function deleteLastEntry(){
    let splitText = currentInputDisplay.textContent.split("");
    if(splitText[splitText.length-1] === '.'){ decimalUsed = false }
    splitText = splitText.slice(0,-1).join("");
    if(!splitText.length){
        currentInputDisplay.textContent = 0;
        initialEntry = true;
    }
    else{
        currentInputDisplay.textContent = splitText;
    }
}

/**
 * Displays error message on seconday display, resets display after 1 sec timer
 * @param msg message to be shown on screen
 */
function errorMessage(msg){
    let savedOngoingFunction = ongoingFunctionDisplay.textContent;
    setOngoingFunction(msg);
    setTimeout(setOngoingFunction, 1000, savedOngoingFunction);
}

document.addEventListener("keyup", function(e){
    if(e.key === "Enter"){
        equalsButton.click();
    }
    else{
        buttons.forEach((button) => {
            if(button.textContent == e.key) { button.click() };
        })
    }
});
