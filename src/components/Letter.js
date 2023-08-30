import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

const Letter = ({letterPosition,attemptVal}) => {
  const {board,correctword,currentAttempt,setDisabledletters}=useContext(AppContext);
  const letter= board[attemptVal][letterPosition];

  const correct = correctword.toUpperCase()[letterPosition]=== letter
  const almost =!correct && letter!=="" && correctword.toUpperCase().includes(letter);
  const letterState =currentAttempt.attempt>attemptVal && (correct ? "correct" : almost ? "almost" : "error")

  useEffect(()=>{
    if(letter!=="" && !correct && !almost ){
      setDisabledletters((prev)=>[...prev,letter]);
    }
  },[currentAttempt.attempt]);
  
  return (
    <div className='letter' id={letterState}>
      {letter}
    </div>
  )
}

export default Letter;
