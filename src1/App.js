import React from 'react';
import { useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom';

function App() {

  // generates the random secret code for the player to guess :)
  function genRandomCode() {
    let digitList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let firstIdx = Math.floor(Math.random() * Math.floor(10));
    let secondIdx = Math.floor(Math.random() * Math.floor(9));
    let thirdIdx = Math.floor(Math.random() * Math.floor(8));
    let fourthIdx = Math.floor(Math.random() * Math.floor(7));

    let el1 = digitList.splice(firstIdx, 1)
    let el2 = digitList.splice(secondIdx, 1)
    let el3 = digitList.splice(thirdIdx, 1)
    let el4 = digitList.splice(fourthIdx, 1)

    return el1.toString() + el2.toString() + el3.toString() + el4.toString()
  }

  const [currGuess, dispCurrGuess] = useState(""); // the current guess
  const [secretCode, dispSecretCode] = useState(genRandomCode()); // the secret code
  const [cows, dispCows] = useState(""); // number of cows to display
  const [bulls, dispBulls] = useState(""); // number of bulls to display
  const [lives, dispLives] = useState("8"); // number of lives a player has to display
  const [lastGuess, dispLastGuess] = useState(""); // the most recent guess a player has made


  // updates the text box for guessing and
  // handles how many numbers can be input
  function updateGuessBox(ev) {
    let tx = ev.target.value;
    if (tx.length > 4) {
      tx = "";
    }
    dispCurrGuess(tx)
  }

  // checks guess for bulls and cows and updates appropriately
  function checkGuess(guess) { 
    let c = 0 // cows
    let b = 0 // bulls
    let guessEnum = guess.split('')
    let secretEnum = secretCode.split('')
    for(let n of guessEnum) {
      for(let s of secretEnum) {
        if(n == s) {
          if (guessEnum.indexOf(n) == secretEnum.indexOf(s)) {
            b += 1
          } else {
            c += 1
          }
        }
      }
    }
    dispCows(c)
    dispBulls(b)
    dispLastGuess(guess)
  }

  // checks if a guess "g" is valid to guess
  function valid(g) {
    return g.length == 4 && (new Set(g)).size == 4
  }

  // logic for the reset button
  function reset() {
    dispCurrGuess("");
    dispLives("8");
    dispCows("");
    dispBulls("");
    dispLastGuess("");
    dispSecretCode(genRandomCode());
  }

  // makes the guess then emptys the guess box, 
  // makes the current checks for cows and bulls,
  // and updates the most recent guess
  function placeGuess() {
    if(valid(currGuess)) {
      if(currGuess != secretCode) {
        dispLives(lives - 1)
      }
      checkGuess(currGuess);
      dispLastGuess(currGuess)
      dispCurrGuess("")
    }
  }

  // keypress for handling the enter key
  function kp(ev) {
    if (ev.key == "Enter") {
      placeGuess();
    }
  }

  // BASED THIS CODE ON NAT TUCKS LECTURE NOTES :
  
  // if we lose at any point
  if (lives == 0) {
    return (
      <div className="App">
        <h1 id="lose">Game Over You Lose</h1>
        <p><button class="reset" onClick={reset}>Reset</button></p>
      </div>);
  } else {

  // END ATTRIBUTION

  // if we win
  if(bulls == 4) {
    return (
      <div className="App">
        <h1 id="win">Game Over You Win: {secretCode}</h1>
        <p><button class="reset" onClick={reset}>Reset</button></p>
      </div>);
    }
  } // else, just keep the game going

  // BASED THIS CODE ON NAT TUCKS LECTURE NOTES :
  return (
    <div className="App">
      <h1 id="cows">Cows: {cows}</h1>
      <h2 id="bulls"> Bulls: {bulls}</h2>
      <h3 id="lives">Lives: {lives}</h3>
      <h4 id="lastGuess">Last Guess: {lastGuess}</h4>
      <p>
        <input
          id="txBox" 
          type="number"
          value={currGuess}
          onChange={updateGuessBox}
          onKeyPress={kp} />
        <button id="guess" onClick={placeGuess}>Guess</button>
      </p>
      <p><button class="reset" onClick={reset}>Reset</button></p>
    </div>
  )
  // END ATTRIBUTION
}

export default App;
