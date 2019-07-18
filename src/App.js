import React, { Component } from 'react';
import PropTypes from 'prop-types'


import './App.css'
import { WORDS } from './dico.js'
import Key from './Key.js'
import Result from './Result.js'
import Pendu from './Pendu.js'

const HIDDEN_SYMBOL = '_'
const KEYBOARD = 'AZERTYUIOPQSDFGHJKLMWXCVBN'.split('')
const MAX_WRONG_TRIES = 9

class App extends Component {

  state = this.generateNewGameState()

  // Arrow fx for binding
  newGame = () => {
    this.setState(this.generateNewGameState())
  }

  generateNewGameState() {
    return {
      word: this.generateWord(),
      guesses: 0,
      misses: 0,
      pressedKeys: [],
    }
  }
 
  generateWord() {
    return WORDS[Math.floor(Math.random()*WORDS.length)]
  }

  getStateKey(letter) {
    return this.state.pressedKeys.includes(letter) ? 'used' : 'unused'
  }

  // Arrow fx for binding
  handleKeyClick = letter => {
    let { pressedKeys, guesses, misses, word } = this.state

    // Checks if letter has been used
    if (this.getStateKey(letter) === "used" || misses === MAX_WRONG_TRIES ) return

    guesses++

    const regex = new RegExp(letter)
    misses = regex.test(word) ? misses : misses + 1

    // pressedKeys.push(letter)
    pressedKeys = [...pressedKeys, letter]
    this.setState({ guesses: guesses, pressedKeys: pressedKeys, misses: misses })
    
  } 

  /**
   * KeyPress
   */
  handleKeyPress = e => {
    const letter = e.key.toUpperCase()
    if (! /[A-Z]/.test(letter)) return
    this.handleKeyClick(letter)
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress)
  }

  
  /**
   * Reveals the searches word
   */
  computeDisplay( word, pressedKeys ) {
    return word.replace( /\w/g, (letter) => (pressedKeys.includes(letter) ? letter : HIDDEN_SYMBOL))
  }

  render() {
    const { word, guesses, misses, pressedKeys } = this.state
    const displayWord = this.computeDisplay( word, pressedKeys )
    const won = word === displayWord
    const gameEnd = won || misses === MAX_WRONG_TRIES
    return (
      <div className="App">
        <h1>Jeu du Pendu</h1>
        <Word word={ displayWord }/>
        <div className="keyboard">
          { KEYBOARD.map((letter, index) => (
            <Key
              letter={letter}
              index={index}
              pressed={this.getStateKey(letter)}
              key={index}
              onClick={this.handleKeyClick}              
            />
          )) }
        </div>
        <GuessCount
          guesses={guesses}
          misses={misses}
        />
        <Pendu step={misses} />
        { gameEnd && 
          <Result 
            won={won}
            word={word}
            onClick={this.newGame} 
          /> }
      </div>
    );
  }
}

export default App;



/**
 * Guesses count
 */
const GuessCount = ({ guesses, misses }) => ( 
  <div className="guessesWrap">
    <div className="guesses">
      <span>Nombre d'essais&nbsp;:</span> 
      <span className="guess-count">{guesses}</span>
    </div>
    <div className="guesses misses">
      <span>Nombre d'essais manqués&nbsp;:</span>
      <span className="guess-count">{misses}</span>
    </div>
  </div>
)


GuessCount.propTypes = {
  guesses: PropTypes.number.isRequired,
}

/**
 * Word
 */
const Word = ({ word }) => (<div className="word">{word}</div>)
Word.propTypes = {
  word: PropTypes.string.isRequired,
}


