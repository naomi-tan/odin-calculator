// Define arithmetic operations

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b) {
    if(n2 == 0){
        return 'Error: cannot divide by 0!'
    }
    return a / b;
}

function power(a, b){
    return a ** b;
}

function operate(n1, n2, op){
    switch(op){
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
        case 'x':
            return multiply(n1, n2);
        case '/':
            return divide(n1, n2);
        case '^':
            return power(n1, n2);
    }
}

let n1 = undefined;
let n2 = undefined;
let op = undefined;

// Get display and button containers to update

let display = document.querySelector('.display');
let buttons = document.querySelector('.buttons');

// Define button text

button_text = [
    ['+', '-', 'x', '/'],
    ['7', '8', '9', 'CE'],
    ['4', '5', '6', 'DEL'],
    ['1', '2', '3', '^'],
    ['+/-', '0', '.', '=']
]

// Populate buttons and text
let i = 0;
for(let row of button_text){
    let j = 0;
    let row_element = document.createElement('div');
    row_element.className = 'row';
    row_element.id = `row${i}`;
    for(let text of row){
        let button = document.createElement('button');
        button.textContent = text;
        button.id = text;
        row_element.appendChild(button);
        j++;
    }
    buttons.appendChild(row_element);
    i++;
}

// Button press functions

let update_text;

buttons.addEventListener('click', (event) => {
    let display_text = display.textContent;
    // if operator pressed store n1 and operator
    // if = pressed store n2 and operate
    if(event.target.tagName == 'BUTTON'){
        switch(event.target.textContent){
            case 'CE':
                update_text = '';
                n1 = undefined;
                n2 = undefined;
                op = undefined;
                break;
            // sometimes writes all buttons text content
            case '+':
            case '-':
            case 'x':
            case '/':
            case '^':
                if(display_text == ""){ // cannot start with operator
                    break;
                }
                else if(op == undefined){ // only allow 1 operator per sum
                    op = event.target.textContent;
                    n1 = Number(display_text.replace('+', ''));
                    update_text = display_text + event.target.textContent;
                    break;
                }
                else{
                    break;
                }
            case '=':
                // n1, op and n2 must exist otherwise do nothing
                if((n1 !== undefined) && (op != undefined) &&
                (display_text.slice(display_text.indexOf(op) + 1, display_text.length) !== '')){ // && (rest of string not empty)
                    // set n2 and calculate based on op
                    n2 = Number(display_text.slice(display_text.indexOf(op) + 1, display_text.length));
                    // display ans and clear vars
                    update_text = String(operate(n1, n2, op));
                    n1 = undefined;
                    n2 = undefined;
                    op = undefined;
                    break;
                }
                else {
                    break;
                }
            case 'DEL':
                if(display_text.length == 0){
                    break;
                }
                else {
                    update_text = display_text.slice(0, display_text.length - 1);
                    if(isNaN(Number(display_text.slice(display_text.length - 1, display_text.length)))){
                        op = undefined; // what if . or +/-
                    }
                    break;
                }
            case '.': // 1 . per number not per display
                if(display_text.includes('.')) {
                    break;
                }
                else {
                    update_text = display_text + event.target.textContent;
                }
            default: update_text = display_text + event.target.textContent;
        }
    }
    display.textContent = update_text;
})

// if . in display dont append
