const buttons = document.querySelectorAll('button');
let memory = []; // Store input

// Display the button once clicked
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(e.target.id)
        // If decimal is already present don't add 
        if (memory.indexOf('.') != '-1' && e.target.name === '.') {
            return;
        }
        // Skip displaying back and clear
        if (e.target.name === 'back' || e.target.name === 'clr' || 
            e.target.name === '=') {
            return;
        }
        // Check for first zero
        if (document.getElementById('screen').innerHTML[0] == '0') {
            document.getElementById('screen').innerHTML = '';
        }
        
        // Add input to memory and display
        memory.push(e.target.name);
        display(e.target.name);
    });
});

// When equals button is pressed compute available memory
document.getElementById('equals-btn').addEventListener('click', () => {
    let result = compute(memory);
    // Clear screen and display answer
    document.getElementById('screen').innerHTML = '';
    display(result);
    // Clear memory and then save answer
    return memory = [result];
});

// Remove last item entered 
document.getElementById('back-btn').addEventListener('click', back);
// Reset screen when clear is pressed
document.getElementById('clear-btn').addEventListener('click', clear);


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

// Display input/output to working screen
function display(item) {
    document.getElementById('screen').innerHTML += item;
}

// Reset the window
function clear() {
    window.location.reload();
}

// Reverse last input by removing from screen and memory 
function back() {
    let str = document.getElementById('screen').innerHTML;
    str = str.substring(0, str.length - 1);
    document.getElementById('screen').innerHTML = str;
    memory.pop();
}

// Check if decimal is present in memory
function checkDecimal(button) {
    let newMem = memory.join('');
    newMem = newMem.split(/[*/+-]/g);
    console.log(newMem)
    if(newMem[newMem.length - 1].indexOf('.') > -1) {
        console.log('made it')
        return false;
    }
    return true;
}

// Evaluate the memory and compute the present operations
function compute(memory) {
    let pattern = new RegExp('[^0-9]', 'g'); // Search for non-digits
    // Convert to string
    let str = memory.join('');
    console.log(memory)
    let opIndex = str.search(pattern);
    // No operator found; answer = number entered
    if (opIndex == -1) {
        return parseInt(str);
    }
    return computeBedmas(memory);
}

// Check for mulitple operators and evalute according to BEDMAS/PEDMAS
function computeBedmas(memory) {
    let result;
    // Capture operators and convert numbers to float if decimal is present
    memory = document.getElementById('screen').innerHTML.split(/([*/+-])/g);

    // Check for the number of math operators present in array
    let countMultDiv = memory.filter(x => (x === '*' || x === '/')).length; // Div/mult
    let countAddSub = memory.filter(x => (x === '+' || x === '-')).length; // Add/sub


    // Use order of operations to compute the data stored in memory
    for (let i = 0; i < countMultDiv; i++){
        // Divide and replace the original items with the answer
        if (memory.indexOf('/') > memory.indexOf('*') && memory.indexOf('/') > -1) {
            // Note '+memory' converts the value from a string to a number
            result = divide(+memory[memory.indexOf('/')-1], +memory[memory.indexOf('/')+1]);
            memory.splice(memory.indexOf('/')-1,3,result); // replace
            // Multiply
        } else if (memory.indexOf('*') > memory.indexOf('/') && memory.indexOf('*') > -1) {
            result = multiply(+memory[memory.indexOf('*')-1], +memory[memory.indexOf('*')+1]);
            memory.splice(memory.indexOf('*')-1,3,result);
        }
      }
      // Add/subtract then replace original items with answer
      for (let i = 0; i < countAddSub; i++){
        if (memory.indexOf('+') > memory.indexOf('-') && memory.indexOf('+') > -1) {
            result = add(+memory[memory.indexOf('+')-1], +memory[memory.indexOf('+')+1]);
            memory.splice(memory.indexOf('+')-1,3,result);
        } else if (memory.indexOf('-') > memory.indexOf('+') && memory.indexOf('-') > -1) {
            result = subtract(+memory[memory.indexOf('-')-1], +memory[memory.indexOf('-')+1]);
            memory.splice(memory.indexOf('-')-1,3,result);
        }
      }
    return memory;
}