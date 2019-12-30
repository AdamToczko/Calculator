const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys')

keys.addEventListener('click', event => {
 if (event.target.matches('button')) {
    console.log('hello')
 }
})