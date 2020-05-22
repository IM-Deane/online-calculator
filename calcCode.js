
// Math Operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Accept operator (+,-,*,/) and call respective function
function operate(operator, a, b) {
    let result = 0;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
    }
    return result;
}

// Display input and output to screen
function display(item) {
    return document.getElementById('screen').innerHTML += item;
}

function clear() {
    window.location.reload();
}

function compute(memory) {

    // Convert to string
    let str = memory.join('');
    let pattern = new RegExp('[^0-9]'); // Search for non-digit
    let opIndex = str.search(pattern);
    // Separate string into two numbers and one operator
    let num1 = parseInt(str.slice(0, opIndex));
    let num2 = parseInt(str.slice(opIndex + 1));
    let operator = str[opIndex];
    
    return operate(operator, num1, num2);
}

const buttons = document.querySelectorAll('button');
let memory = []; // Store user input

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Clear button: reset window
        if (e.target.name === 'clr') {
            clear();
        }
        // Initiate computation of array
        if (e.target.name === '=') {
            let result = compute(memory);
            // Clear screen and display answer
            document.getElementById('screen').innerHTML = '';
            display(result);
            return;
        }
        display(e.target.name);
        memory.push(e.target.name); // store in memory
    });
});
