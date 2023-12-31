import './App.css';
import {useState} from 'react';

function App() {

  const [display, setDisplay] = useState('0');
  const [equalFlag, setEqualFlag] = useState(false);

  const handleNumber = (event) => {
    const number = event.target.textContent.toString();
    if (display === '0') {
      setDisplay(number);
    } else {
      if (equalFlag === true) {
        setDisplay(number);
        setEqualFlag(false);
      }
      else {
        setDisplay(display + number);
      }
    }
  }

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    setEqualFlag(false);
    let lastDigit = display[display.length - 1];

    if (lastDigit === '-' && operator === '+') {
      setDisplay(display.slice(0, -1) + operator);
    }
    if ((lastDigit === '/' || lastDigit === '*' || lastDigit === '+' || lastDigit === '-') && operator !== '-') {
      setDisplay(display.slice(0, -1) + operator);
    }
    else {
      setDisplay(display + operator);
    }
  }

  const isOperator = (char) => {
    return /[*/+-]/.test(char);
  }

  const handleEqual = () => {
    if (!(isOperator(display.charAt(display.length - 1)))) {
      if (display.includes('--')) {
        let tempDisplay = display.replace('--', '');
        let tempResult = eval(tempDisplay).toString();
        setDisplay(tempResult);
        setEqualFlag(true);
        tempDisplay = null;
        console.log(display + ' = ' + tempResult);
      }
      else if (display.includes('*+')){
        let tempDisplay = display.replace('*+', '+');
        let tempResult = eval(tempDisplay).toString();
        setDisplay(tempResult);
        setEqualFlag(true);
        tempDisplay = null;
        console.log(display + ' = ' + tempResult);
      }
      else {
        let tempResult = eval(display).toString();
        setDisplay(tempResult);
        setEqualFlag(true);
        console.log(display + ' = ' + tempResult);
      }
    }
  }

  const handleDecimal = () => {
    setEqualFlag(false);
    const array = display.split(/[/*+-]/g);
    let lastArrayElement = array[array.length - 1];
    if (!lastArrayElement.includes('.')) {
      setDisplay(display + '.');
    }
  }

  const handleClear = () => {
    setEqualFlag(false);
    setDisplay('0');
  }

  return (
    <div id="app">
      <div id='calculator'>
      {console.log('equalFlag = ', equalFlag)}
        <div className='row' id='display'>{display}</div>
        <div id='clear' className='row' onClick={handleClear}>AC</div>
        <div id='seven' className='number' onClick={handleNumber}>7</div>
        <div id='eight' className='number' onClick={handleNumber}>8</div>
        <div id='nine' className='number' onClick={handleNumber}>9</div>
        <div id='multiply' className='operators' onClick={handleOperator}>*</div>
        <div id='four' className='number' onClick={handleNumber}>4</div>
        <div id='five' className='number' onClick={handleNumber}>5</div>
        <div id='six' className='number' onClick={handleNumber}>6</div>
        <div id='divide' className='operators' onClick={handleOperator}>/</div>
        <div id='one' className='number' onClick={handleNumber}>1</div>
        <div id='two' className='number' onClick={handleNumber}>2</div>
        <div id='three' className='number' onClick={handleNumber}>3</div>
        <div id='add' className='operators' onClick={handleOperator}>+</div>
        <div id='zero' className='number' onClick={handleNumber}>0</div>
        <div id='decimal' onClick={handleDecimal}>.</div>
        <div id='equals' onClick={handleEqual}>=</div>
        <div id='subtract' className='operators' onClick={handleOperator}>-</div>
      </div>
    </div>
  );
}

export default App;
