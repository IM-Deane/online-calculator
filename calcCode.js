let screen = document.getElementById('screen');
screen.textContent = 0; // Set initial value
const buttons = document.querySelectorAll(`button[data-key]`);
buttons.forEach(button => {
    switch (button.dataset.key) {
        case 'Backspace':
            button.addEventListener('click', back);
            break;
        case '=':
        case 'Enter':
            button.addEventListener('click', () => {
            let result = evalute();
            console.log(result);
            // Clear screen and display answer
            screen.textContent = result;
            });
            break;
        case 'Escape':
            button.addEventListener('click', clear);
            break;
        case 'info':
            button.addEventListener('click', information);
            break;
        default :
            button.addEventListener('click', setDisplay);
    }
});

window.addEventListener('keydown', validateKey);

// SECTION: MATH OPERATIONS
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
    if (a == 0 || b == 0) {
        return 'You can\'t divide by zero pal.';
    }
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

/* SECTION: HELPER FUNCTIONS */

// Allow the specified keys to be processed
function validateKey(e) {
    console.log(e.key)
    // Check for numbers
    for (let i = 0; i < 10; i++) {
        if (e.key == i) {
            return setDisplay(e);
        }
    }
    // Check for other keys
    switch (e.key) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '.':
            setDisplay(e);
            break;
        case 'Backspace':
            back();
            break;
        case '=':
        case 'Enter':
            let result = evalute();
            // Clear screen and display answer
            screen.textContent = result;
            break;
        case 'Escape':
        case 'c':
            clear();
            break;
        case 'i':
            information();
    }
}

// Displays keyboard input to screen
function setDisplay(e) {
    // If decimal is already present don't add 
    if (screen.textContent.indexOf('.') != '-1' && (e.key === '.' ||
        e.target.dataset.key === '.')) {
        return;
    }
    // Check for first zero
    if (screen.textContent[0] == '0') {
        screen.textContent = '';
    }
    if (typeof e.key !== 'undefined') {
        screen.textContent += e.key; // keyboard
    } else {
        screen.textContent += e.target.dataset.key; // button
    }
}

// Reset the window
function clear() {
    window.location.reload();
}

// Reverse last input by removing from screen and memory 
function back() {
    screen.textContent = screen.textContent.slice(0, -1);
    if (screen.textContent.length == 0) {
        screen.textContent = '0'; // Set to 0 if last character deleted
    }
}

// Displays some general information about how to use calculator app
function information() {
    return alert('Version: 2.1  --  Author: Tristan Deane' + 
        '\n\nFor Keyboard Functionality:\nSimply press the desired key and it ' +
        'will appear on the screen.\nIf the key doesn\'t show up then it isn\'t supported.' + 
        '\n\nKeys:\nNumbers:  [ 0-9 ]\nMathematical operators:  [+][-][*][/]' + 
        '\nSubmit:  [ Enter ] or  [=]\nRemove last character entered: [ Backspace ]' +
        '\nReset the screen:  [ Esc ] or [ C ]\nInformation:  [ i ]');
}

// Evaluate the memory and compute the present operations
function evalute() {
    let pattern = new RegExp('[^0-9]', 'g'); // Search for non-digits
    let opIndex = screen.textContent.search(pattern);
    // No operator found; answer = number entered
    if (opIndex == -1) {
        return parseInt(screen.textContent);
    }
    return computeBedmas();
}

// Check for mulitple operators and evalute according to BEDMAS/PEDMAS
function computeBedmas() {
    // Capture operators and convert numbers to float if decimal is present
    let memory = screen.textContent.split(/([*/+-])/g);

    // Check for the number of math operators present in array
    let countMultDiv = memory.filter(x => (x === '*' || x === '/')).length; // Div/mult
    let countAddSub = memory.filter(x => (x === '+' || x === '-')).length; // Add/sub

    let result;
    // Use order of operations to compute the data stored in memory
    for (let i = 0; i < countMultDiv; i++) {
        // Divide and replace the original items with the answer
        if (memory.indexOf('/') > memory.indexOf('*') && memory.indexOf('/') > -1) {
            // Note '+memory' converts the value from a string to a number
            result = divide(+memory[memory.indexOf('/') - 1], +memory[memory.indexOf('/') + 1]);
            memory.splice(memory.indexOf('/') - 1, 3, result); // replace
            // Multiply
        } else if (memory.indexOf('*') > memory.indexOf('/') && memory.indexOf('*') > -1) {
            result = multiply(+memory[memory.indexOf('*') - 1], +memory[memory.indexOf('*') + 1]);
            memory.splice(memory.indexOf('*') - 1, 3, result);
        }
    }
    // Add/subtract then replace original items with answer
    for (let i = 0; i < countAddSub; i++) {
        if (memory.indexOf('+') > memory.indexOf('-') && memory.indexOf('+') > -1) {
            result = add(+memory[memory.indexOf('+') - 1], +memory[memory.indexOf('+') + 1]);
            memory.splice(memory.indexOf('+') - 1, 3, result);
        } else if (memory.indexOf('-') > memory.indexOf('+') && memory.indexOf('-') > -1) {
            result = subtract(+memory[memory.indexOf('-') - 1], +memory[memory.indexOf('-') + 1]);
            memory.splice(memory.indexOf('-') - 1, 3, result);
        }
    }
    return memory;
}