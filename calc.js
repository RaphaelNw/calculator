










































/* //add function
const add = function(a, b) {
	return Number(a + b);
};

//subtract function
const subtract = function(a, b) {
	return Number(a - b);
};

//multiply function
const multiply = function(a, b) {
	return Number(a * b);
};

//divide function
const divide = function(a, b) {
	return Number(a / b);
};

const value1 = 1;
const value2 = 3;

const operate = (oper, val1, val2) => {
    const num1 = Number(val1)
    const num2 = Number(val2)
    if(oper === '/') {
        calcInput.innerText = divide(num1, num2);
    }
    if(oper === '*') {
        calcInput.innerText = multiply(num1, num2);
    }
    if(oper === '-') {
        calcInput.innerText = subtract(num1, num2);
    }
    if(oper === '+') {
        calcInput.innerText = add(num1, num2);
    }
    console.log(oper, num1, num2)
}

const calcInput = document.querySelector('.calc-input');
const allButtons = document.querySelectorAll('.button');

allButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.dataset.value
        calcInput.innerText += value
            if (value === "=") {
                if (calcInput.innerText.includes('/')) {
                    const splitExpression = calcInput.innerText.split('/');
                    let fixNaN = Number(splitExpression[1].slice(0, -1));
                    console.log(splitExpression[0], fixNaN)
                    console.log(operate('/', splitExpression[0], fixNaN));
                }
                if (calcInput.innerText.includes('*')) {
                    const splitExpression = calcInput.innerText.split('*');
                    let fixNaN = Number(splitExpression[1].slice(0, -1));
                    console.log(splitExpression[0], fixNaN)
                    console.log(operate('*', splitExpression[0], fixNaN));
                }
                if (calcInput.innerText.includes('-')) {
                    const splitExpression = calcInput.innerText.split('-');
                    let fixNaN = Number(splitExpression[1].slice(0, -1));
                    console.log(splitExpression[0], fixNaN)
                    console.log(operate('-', splitExpression[0], fixNaN));
                }
                if (calcInput.innerText.includes('+')) {
                    const splitExpression = calcInput.innerText.split('+');
                    let fixNaN = Number(splitExpression[1].slice(0, -1));
                    console.log(splitExpression[0], fixNaN)
                    console.log(operate('+', splitExpression[0], fixNaN));
                }
            }
            if (value === 'clear') {
                calcInput.innerText = '';
            }
    })
});
