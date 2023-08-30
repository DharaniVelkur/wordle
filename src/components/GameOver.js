import React, { useContext } from 'react'
import { AppContext } from '../App'

const GameOver = () => {
  const {gameOver,currentAttempt,correctword}=useContext(AppContext);
  return (
    <div className='gameOver'>
        <h3>{gameOver.guessedword? "You correctly guessed":"You failed"}</h3>
        <h1>Correct Word :{correctword}</h1>
        {gameOver.guessedword && (<h3>You guessed in {currentAttempt} attempts </h3>) }
    </div>
  )
}

export default GameOver