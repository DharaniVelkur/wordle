import React, { useContext } from 'react'
import { AppContext } from '../App'

const Key = ({keyval,bigKey,disabled}) => {
    const {onSelectLetter,onDelete,onEnter,gameOver}=useContext(AppContext);


    const selectLetter=()=>{
      if (gameOver.gameOver) return;
        if(keyval ==="ENTER"){
          onEnter();
        } else if (keyval==="DELETE") {
           onDelete();
        }
        else {
           onSelectLetter(keyval);
        }
      }

  return (
    <div className='key' id={bigKey? "big" :disabled && "disabled"} onClick={selectLetter}>{keyval}</div>
  );
}

export default Key