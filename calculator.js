const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', event => {
 if (event.target.matches('button')) {
    const key = event.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType

  if (!action) {
     if (displayedNum === '0' || previousKeyType === 'operator') {
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
    calculator.dataset.previousKeyType = 'operator' //the previous key is an operator key.
    calculator.dataset.firstValue = displayedNum // store first number before operator was hit 
    calculator.dataset.operator = action // get the operator 
   } 
   if (action === 'decimal') {
    display.textContent = displayedNum + '.'
  }
  // logic for two clear options :
  // All Clear (AC) clears everything and resets the calculator to its initial state.
  //Clear entry (CE) clears the current entry. It keeps previous numbers in memory. 
  if (action === 'clear') {
    // resetting to initial state means resetting all previously set atributes 
    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    } else {
      key.textContent = 'AC'
    }
    display.textContent = '0'
    calculator.dataset.previousKeyType = 'clear'
  }
// CE shows after operator is hit
  if (action != 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
  
  if (action === 'calculate') {
    const secondValue = displayedNum // when we hit calculate we only see second number that was hit
    const firstValue = calculator.dataset.firstValue // getting first number
    const operator = calculator.dataset.operator // getting operator 

    const calculate = (n1, operator, n2) => {
        let result = ''
        
        if (operator === 'add') {
            result = parseFloat(n1) + parseFloat(n2)
          } else if (operator === 'subtract') {
            result = parseFloat(n1) - parseFloat(n2)
          } else if (operator === 'multiply') {
            result = parseFloat(n1) * parseFloat(n2)
          } else if (operator === 'divide') {
            result = parseFloat(n1) / parseFloat(n2)
          }
      
        return result
      }
  
    display.textContent = calculate(firstValue, operator, secondValue) // need to define function calculate 
  }
}
 
})