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
        case 'x^n':
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
    ['7', '8', '9', 'Clear'],
    ['4', '5', '6', 'Backspace'],
    ['1', '2', '3', 'x^n'],
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
        button.className = 'button';
        button.id = `button${i}${j}`;
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
    console.log(event.target.tagName)
    if(event.target.tagName == 'BUTTON'){
        switch(event.target.textContent){
            case 'Clear':
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
            case 'x^n':
                if(display_text == ""){ // cannot start with operator
                    break;
                }
                else if(op == undefined){ // only allow 1 operator per sum
                    op = event.target.textContent;
                    n1 = Number(display_text.replace('+', ''));
                    console.log(op)
                    console.log(n1)
                    update_text = display_text + event.target.textContent;
                    break;
                }
                else{
                    break;
                }
            case '=':
                // n1, op and n2 must exist otherwise do nothing
                if((n1 !== undefined) && (op != undefined) && ()){
                    // set n1 and calculate based on op
                }
            case 'Backspace': // what if operator deleted?
                if(display_text.length == 0){
                    break;
                }
                else {
                    update_text = display_text.slice(0, display_text.length - 1);
                    break;
                }
                // if + - * / power
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
    // display.textContent = display_text + event.target.textContent;
})

// what if multiple operators? BODMAS

// if row =0 or col = 4
// if . in display dont append
