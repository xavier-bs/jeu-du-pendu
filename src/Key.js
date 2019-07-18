import React from 'react'
import PropTypes from 'prop-types'

import './Key.css'

/**
 * Key
 */
const Key = ({ letter, pressed, index, onClick }) => (
  <div className={`key ${pressed}`} onClick={() => onClick(letter)}>
    <span className="symbol">
      {letter}
    </span>
  </div>
)

Key.propTypes = {
  letter: PropTypes.string.isRequired,
  pressed: PropTypes.oneOf([
    'used',
    'unused'
  ]).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Key
