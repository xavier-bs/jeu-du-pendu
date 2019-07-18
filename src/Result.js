import React from 'react'
import PropTypes from 'prop-types' 

import './Result.css'

/**
 * Result, play again button
 */
const Result = ({ word, won, onClick }) => (
  <div className="result-wrap">
    <div className={`result ${won}`}>{won ? "GAGNÉ" : "PERDU"}</div>
    { ! won && <Solution word={word} /> }
    <div className="play-again">
      <button onClick={onClick}>Rejouer ?</button>
    </div>
  </div>
)

const Solution = ({ word }) => (
   <p className="solution">
      Il fallait trouver <span className="word">{word}</span>
   </p>
)

Result.propTypes = {
   won: PropTypes.bool.isRequired,
   onClick: PropTypes.func.isRequired,
}

Solution.propTypes = {
   word: PropTypes.string.isRequired,
}

export default Result