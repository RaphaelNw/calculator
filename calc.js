const calcInput = document.querySelector('.calc-input');
const allButtons = document.querySelectorAll('.button');

allButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.dataset.value
        calcInput.innerText += value
    })
});


//add function

//subtract function

//multiply function

//divide function