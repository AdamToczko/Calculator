const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

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
      calculator.dataset.previousKeyType = 'number' // update previousKeyType for each clicked key
   }

   if (
     action === 'add' ||
     action === 'subtract' ||
     action === 'multiply' ||
     action === 'divide'
   ) {
     // logic for hitting first number - operator - second number - operator again 
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    const secondValue = displayedNum

    
    if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
      const calcValue = calculate(firstValue, operator, secondValue)
      display.textContent = calcValue
      // take calculated value as first value if we press operator again 
      calculator.dataset.firstValue = calcValue

    } else {
      calculator.dataset.firstValue = displayedNum // store first number before operator was hit 
    }

    calculator.dataset.previousKeyType = 'operator' //the previous key is an operator key.
    
    calculator.dataset.operator = action // get the operator 
   } 

   if (action === 'decimal') {
     //no action if . already on display
    if (!displayedNum.includes('.')) {
      display.textContent = displayedNum + '.'
    } 
    //Display to show "0." if a user hits a decimal key after an operator key 
    else if (previousKeyType === 'operator') {
      display.textContent = '0.'
    }
    calculator.dataset.previousKeyType = 'decimal' // update previousKeyType for each clicked key
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
      calculator.dataset.modValue = ''
    } else {
      key.textContent = 'AC'
    }
    display.textContent = '0'

    calculator.dataset.previousKeyType = 'clear' // update previousKeyType for each clicked key
  }

// CE shows after operator is hit
  if (action != 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
  
  if (action === 'calculate') {
    let secondValue = displayedNum // when we hit calculate we only see second number that was hit
    let firstValue = calculator.dataset.firstValue // getting first number
    const operator = calculator.dataset.operator // getting operator 
    
    // if first value does not exist equal will not calculate 
    if(firstValue) {
      // adding scenario when equal is hit multiple times so should continue to calculate 
      if (previousKeyType === 'calculate'){
        firstValue = displayedNum
        secondValue = calculator.dataset.modValue
      }

      display.textContent = calculate(firstValue, operator, secondValue) // need to define function calculate 
    }
    // we need to carry forward previous second value into new calculation
    // need to store it in custome attribute 
    calculator.dataset.modValue = secondValue
    calculator.dataset.previousKeyType = 'calculate' // update previousKeyType for each clicked key
  }
}
 
})