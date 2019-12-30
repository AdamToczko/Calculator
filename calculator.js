const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', event => {
 if (event.target.matches('button')) {
    const key = event.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
  if (!action) {
     console.log('number key!')
     if (displayedNum === '00') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
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