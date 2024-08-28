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
        solution = (b / a);
        return solution;
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
        currentValue = result;
        return currentValue;

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































