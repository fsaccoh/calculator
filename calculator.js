const calculator = document.querySelector('#calculator')
const buttonDigit = calculator.querySelectorAll('#keypad button.digit')
const buttonOperator = calculator.querySelectorAll('#keypad button.operator')
const buttonClear = calculator.querySelectorAll('#keypad button.clear')
const equalButton = calculator.querySelector('#keypad button#equals')
const displayValue = calculator.querySelector('#screen h2')
const displayHistory = calculator.querySelector('#screen h3')

displayValue.textContent = '0';
displayHistory.textContent = '';

let value = 0;
let operator = '';
let clear = false;

// buttonDigit[0].style.backgroundColor = 'red'
// buttonOperator[0].style.backgroundColor = 'Green'
// equalButton.style.backgroundColor = 'black'
// buttonClear[0].style.backgroundColor = 'black'

buttonDigit.forEach((button) => {
  button.addEventListener('click', () => {
    if (clear){
      displayValue.textContent = '';
      clear = false;
    }
    if (displayValue.textContent.length > 10)  { return }
    if (button.textContent === '.' && displayValue.textContent.includes('.')) { return }
    displayValue.textContent += button.textContent
    if (displayValue.textContent.charAt(0) === '0' && displayValue.textContent.length > 1){
      displayValue.textContent = displayValue.textContent.substring(1)
    }
  })
})

buttonOperator.forEach((button) => {
  button.addEventListener('click', () => {
    if (displayValue.textContent == '') {
    } else {
      value = operate(value,parseFloat(displayValue.textContent),operator);
    }
    operator = button.value;
    displayHistory.textContent = value +  button.textContent;
    displayValue.textContent = '';
  })
})

buttonClear.forEach((button) => {
  button.addEventListener('click', () => {
    // console.log(button.getAttribute('id'))
    switch (button.getAttribute('id')) {
      case "allClear":
        displayValue.textContent = '0';
        displayHistory.textContent = '';
        value = 0;
        operator = '';
        clear = false;
        break;
      case "clear":
        displayValue.textContent = '';
        break;
      case "delete":
        displayValue.textContent = displayValue.textContent.slice(0,-1);
        break;
      default:

    }
  })
})


equalButton.addEventListener('click', () => {
  if ( displayValue.textContent == '' ){
    displayValue.textContent = value;
  } else{
    displayValue.textContent = operate(value,parseFloat(displayValue.textContent),operator);
  }
  operator = '';
  displayHistory.textContent = '';
  clear = true;
  displayValue.textContent  = (displayValue.textContent > 99999999999) ? 'Overflow': displayValue.textContent ;
  displayValue.textContent = (Math.trunc(parseFloat(displayValue.textContent)*1000000))/1000000;
})



function operate(a , b , op){

  switch (op) {
    case 'add':
      b = a + b;
      break;
    case 'multiply':
      b = a * b;
      break;
    case 'divide':
      b = a / b;
      break;
    case 'subtract':
      b = a - b;
      break;
    case '':
      b = b;
      break;
    default:
      return false;
  }
  return b;
}

document.addEventListener('keyup', e =>{
  console.log(e.key);
  isNaN(parseInt(e.key))? false : buttonDigit[e.key].click();
  switch (e.key) {
    case '.':
    buttonDigit[10].click()
      break;
    case '+':
    buttonOperator[3].click()
      break;
    case '-':
    buttonOperator[2].click()
      break;
    case '*':
    buttonOperator[0].click()
      break;
    case '/':
    buttonOperator[1].click()
      break;
    case 'Backspace':
    buttonClear[2].click()
      break;
    case 'Delete':
    buttonClear[0].click()
      break;
    case 'c':
    buttonClear[1].click()
      break;
    case '=':
    case 'Enter':
    equalButton.click()
      break;
    default:

  }

});