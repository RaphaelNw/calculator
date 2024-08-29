let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener('DOMContentLoaded', function(){
    //Store all components on HTML in our JS
    let clear = document.querySelector('.clear-button');
    let decimal = document.querySelector('.decimal');
    let equal = document.querySelector('.equal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');

    let previousScreen = document.querySelector('.previous');
    let currentScreen = document.querySelector('.current');

    numbers.forEach((number) => number.addEventListener('click', function(e){
            handleNumber(e.target.dataset.value)
            currentScreen.textContent = currentValue;

    }))

    operators.forEach((op) => op.addEventListener('click', function(e){
        handleOperator(e.target.dataset.value)
        previousScreen.textContent = `${previousValue} ${operator}`;
        currentScreen.textContent = currentValue;
    }))

    clear.addEventListener('click', function(e){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })

    equal.addEventListener('click', function(e){
        if(previousValue != '' && currentValue != ''){
            calculate()
            let result = calculate();
            previousScreen.textContent = '';
            if(result.length <=5){
                currentScreen.textContent = calculate(); 
            } else{
            currentScreen.textContent = `${result.slice(0,5)}...`;
            }
        }
   })

    decimal.addEventListener('click', function(e){
        addDecimal()
    })
});

    function handleNumber(num) {
        //console.log(num);
        if(currentValue.length <= 8){
            currentValue += num;
        }
    }

    function handleOperator(op) {
        //console.log(op);
        operator = op;
        previousValue = currentValue
        currentValue = '';
    }

    const add = function(a, b) {
        solution = (a + b);
        return solution;
    };
    
    //subtract function
    const subtract = function(a, b) {
        solution = (b - a);
        return solution;
    };
    
    //multiply function
    const multiply = function(a, b) {
        solution = (a * b);
        return solution;
    };
    
    //divide function
    const divide = function(a, b) {
        if (a === '0'){
            return 'funny';
        } else {
        solution = (b / a);
        return solution;
        }
    };

    function calculate(){
        previousValue = Number(previousValue);
        currentValue = Number(currentValue);
        let result = '';

        if(operator === '+'){
            result = add(currentValue, previousValue);
        } else if (operator === '-'){
            result = subtract(currentValue, previousValue);
        } else if (operator === '/'){
            result = divide(currentValue, previousValue);
        } else if (operator === '*'){
            result = multiply(currentValue, previousValue);
        } 

        result = roundNumber(result);
        result = result.toString();
        return result;

        console.log(result)
        console.log(currentValue)
        console.log(previousValue)
        console.log(operator)
        console.log(add(currentValue, previousValue))
        console.log(subtract(currentValue, previousValue))
        console.log(divide(currentValue, previousValue))
        console.log(multiply(currentValue, previousValue))
    }

    function roundNumber(num) {
        return Math.round(num * 100000) / 100000;
    }


    function addDecimal() {
        if(!currentValue.includes('.')){
            currentValue += '.';
        }
    }


    //Proper logic below for taking second operator below
    //moving on for now for sake of time
/*
    let displayValue = '0';
    let firstOperand = null;
    let secondOperand = null;
    let firstOperator = null;
    let secondOperator = null;
    let result = null;
    const buttons = document.querySelectorAll('button');
    
    window.addEventListener('keydown', function(e){
        const key = document.querySelector(`button[data-key='${e.keyCode}']`);
        key.click();
    });
    
    function updateDisplay() {
        const display = document.getElementById('display');
        display.innerText = displayValue;
        if(displayValue.length > 9) {
            display.innerText = displayValue.substring(0, 9);
        }
    }
      
    updateDisplay();
    
    function clickButton() {
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                if(buttons[i].classList.contains('operand')) {
                    inputOperand(buttons[i].value);
                    updateDisplay();
                } else if(buttons[i].classList.contains('operator')) {
                    inputOperator(buttons[i].value);
                } else if(buttons[i].classList.contains('equals')) {
                    inputEquals();
                    updateDisplay();
                } else if(buttons[i].classList.contains('decimal')) {
                    inputDecimal(buttons[i].value);
                    updateDisplay();
                } else if(buttons[i].classList.contains('percent')) {
                    inputPercent(displayValue);
                    updateDisplay();
                } else if(buttons[i].classList.contains('sign')) {
                    inputSign(displayValue);
                    updateDisplay();
                } else if(buttons[i].classList.contains('clear'))
                    clearDisplay();
                    updateDisplay();
            }
        )}
    }
    
    clickButton();
    
    function inputOperand(operand) {
        if(firstOperator === null) {
            if(displayValue === '0' || displayValue === 0) {
                //1st click - handles first operand input
                displayValue = operand;
            } else if(displayValue === firstOperand) {
                //starts new operation after inputEquals()
                displayValue = operand;
            } else {
                displayValue += operand;
            }
        } else {
            //3rd/5th click - inputs to secondOperand
            if(displayValue === firstOperand) {
                displayValue = operand;
            } else {
                displayValue += operand;
            }
        }
    }
    
    function inputOperator(operator) {
        if(firstOperator != null && secondOperator === null) {
            //4th click - handles input of second operator
            secondOperator = operator;
            secondOperand = displayValue;
            result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            result = null;
        } else if(firstOperator != null && secondOperator != null) {
            //6th click - new secondOperator
            secondOperand = displayValue;
            result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
            secondOperator = operator;
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            result = null;
        } else { 
            //2nd click - handles first operator input
            firstOperator = operator;
            firstOperand = displayValue;
        }
    }
    
    function inputEquals() {
        //hitting equals doesn't display undefined before operate()
        if(firstOperator === null) {
            displayValue = displayValue;
        } else if(secondOperator != null) {
            //handles final result
            secondOperand = displayValue;
            result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
            if(result === 'lmao') {
                displayValue = 'lmao';
            } else {
                displayValue = roundAccurately(result, 15).toString();
                firstOperand = displayValue;
                secondOperand = null;
                firstOperator = null;
                secondOperator = null;
                result = null;
            }
        } else {
            //handles first operation
            secondOperand = displayValue;
            result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
            if(result === 'lmao') {
                displayValue = 'lmao';
            } else {
                displayValue = roundAccurately(result, 15).toString();
                firstOperand = displayValue;
                secondOperand = null;
                firstOperator = null;
                secondOperator = null;
                result = null;
            }
        }
    }
    
    function inputDecimal(dot) {
        if(displayValue === firstOperand || displayValue === secondOperand) {
            displayValue = '0';
            displayValue += dot;
        } else if(!displayValue.includes(dot)) {
            displayValue += dot;
        } 
    }
    
    function inputPercent(num) {
        displayValue = (num/100).toString();
    }
    
    function inputSign(num) {
        displayValue = (num * -1).toString();
    }
    
    function clearDisplay() {
        displayValue = '0';
        firstOperand = null;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    }
    
    function inputBackspace() {
        if(firstOperand != null) {
            firstOperand = null;
            updateDisplay();
        }
    }
    
    function operate(x, y, op) {
        if(op === '+') {
            return x + y;
        } else if(op === '-') {
            return x - y;
        } else if(op === '*') {
            return x * y;
        } else if(op === '/') {
            if(y === 0) {
                return 'lmao';
            } else {
            return x / y;
            }
        }
    }
    
    function roundAccurately(num, places) {
        return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
    }

    */




























