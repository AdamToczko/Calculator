const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys')

keys.addEventListener('click', event => {
 if (event.target.matches('button')) {
    const key = event.target
    const action = key.dataset.action
  if (!action) {
     console.log('number key!')
   }
   if (
     action === 'add' ||
     action === 'subtract' ||
     action === 'multiply' ||
     action === 'divide'
   ) {
     console.log('operator key!')
   } 
   if (action === 'decimal') {
    console.log('decimal key!')
  }
  
  if (action === 'clear') {
    console.log('clear key!')
  }
  
  if (action === 'calculate') {
    console.log('equal key!')
  }
}
 
})