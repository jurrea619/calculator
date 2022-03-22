const ongoingFunctionDisplay = document.getElementById('ongoingFunction');
const currentInputDisplay = document.getElementById('currentInput');
let initialEntry = true; 

function add(a,b) {
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

// make sure to check for equals button
function operate(operator, a, b){
    //switch statement for which operator
    switch (operator){
    case 'add': 
        return add(a,b); 
        break;
    case 'subtract':
        return subtract(a,b);
        break;
    case 'multiply':
        return multiply(a,b);
        break;
    case 'divide':
        return divide(a,b);
        break;
    }
}

// Get all number and decimal button
let numberButtons = Array.from(document.getElementsByClassName("number"));
// attach updateDisplay function to buttons
// numberButtons.forEach(button => button.)

/**
 * Update current input display with number, or decimal, given
 * @number {*} number, or decimal, to be added to display 
 */
function updateDisplay(number){
    if(initialEntry){
        currentInputDisplay.textContent = number;
        initialEntry = false;
    }
    else {
        currentInputDisplay.textContent += number;
    }
}

// Set ongoing function display for user to know current state.
function setOngoingFunction(number, operator){
    ongoingFunctionDisplay.textContent = `${number} ${operator}`;
}

/*
    Clear ongoing function, set display to 0, and reset initialEntry boolean
*/
function clearAll(){
    currentInputDisplay.textContent = 0;
    ongoingFunctionDisplay.textContent = "";
    initialEntry = true;
}

/**
 * Delete previous number/decimal from current input
 */
function deleteLastEntry(){
    slicedText = currentInputDisplay.textContent
                                        .split("")
                                            .slice(0,-1)
                                                .join("");
    slicedText.length === 0 ? currentInputDisplay.textContent = 0 :
                                currentInputDisplay.textContent = slicedText;
}