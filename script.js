// declare variables for all necessary elements
const ongoingFunctionDisplay = document.getElementById('ongoingFunction');
const currentInputDisplay = document.getElementById('currentInput');
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
const decimalButton = document.getElementById("decimalBtn");
const equalsButton = document.getElementById("equalsBtn");
const buttons = document.querySelectorAll("button");

// initialize vars
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

/**
 * Returns evaluated equation of a with b using given operator
 * 
 * @param {operation} operator operator used for equation
 * @param {number} a first operand
 * @param {number} b second operand
 * @returns evaluated equation using given operation and operands
 */
function operate(operator, a, b){
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

// attach click handler function to number buttons
numberButtons.forEach((button) => button.addEventListener('click', () => {
    updateDisplay(button.textContent);
}));

// attach click handler function to decimal button
decimalButton.addEventListener('click', decimalPushed);

/**
 * Add decimal to display. Display error message if already used once
 */
function decimalPushed(){
    if (!decimalUsed) {
        updateDisplay(".")
        decimalUsed = true;
    }
    else {
        errorMessage("Decimal has been used");
    }
}

// attach click handler function to operator buttons
operatorButtons.forEach((button) => button.addEventListener('click', () => {
    operatorPushed(button.textContent);
}));

/**
 * Save current input and chosen operator to secondary display if first operator.
 * Subsequent operators will evaluate previous operand and operator with current input
 * and push to secondary display
 * 
 * @param {string} op operator that was clicked
 */
function operatorPushed(op){
    // if no previous number, add current num and chosen operator to ongoing function display
    if (initialEntry) { errorMessage("Must enter a value") }
    else if (!firstOperand) {
        firstOperand = currentInputDisplay.textContent;
        firstOperator = op;
        setOngoingFunction(`${firstOperand} ${firstOperator}`);
    }
    // second operation chosen, and first operand/operator exists
    else {
        secondOperand = currentInputDisplay.textContent;
        secondOperator = op;
        let currentResult = operate(firstOperator, firstOperand, secondOperand);
        // set ongoing function with result and second operator
        setOngoingFunction(`${currentResult} ${secondOperator}`);
        // recent inputs now become first operator/operand for next entry
        firstOperand = currentResult;
        firstOperator = secondOperator;
    }
    decimalUsed = false;
    clearDisplay();
}

// attach click handler function for equals button
equalsButton.addEventListener('click', () => {
    // check for two operands and operator
    if(firstOperand && firstOperator){
        secondOperand = currentInputDisplay.textContent;
        // check divison by zero
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

/**
 * Displays evaluted equation's result to main display and resets secondary
 * 
 * @param {number} answer answer to be shown after equation evaluated
 */
function showResult(answer){
    currentInputDisplay.textContent = answer;
    setOngoingFunction("");
    firstOperand = "";
}

/**
 * Clear main display for next entry
 */
function clearDisplay(){
    currentInputDisplay.textContent = 0;
    initialEntry = true;
}

/**
 * Update current input display with number, or decimal, given
 * 
 * @param {string} str string, or char, to be added to display 
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

/**
 * 
 * @param {string} str string to add to secondary ongoing function display
 */
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
 * Displays error message on secondary display, resets display after 1 sec timer
 * 
 * @param {string} msg message to be shown on screen
 */
function errorMessage(msg){
    let savedOngoingFunction = ongoingFunctionDisplay.textContent;
    setOngoingFunction(msg);
    setTimeout(setOngoingFunction, 1000, savedOngoingFunction);
}

// attach listener to page for keyboard support
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
