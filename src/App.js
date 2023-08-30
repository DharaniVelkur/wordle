import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctword, setCorrectword] = useState("RIGHT");
  const [disabledletters, setDisabledletters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedword: false,
  });

  const onSelectLetter = (keyval) => {
    if (currentAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyval;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };

  const onEnter = () => {
    
    if (currentAttempt.letterPosition !== 5) return;
    let curreWord = "";
    for (let i = 0; i < 5; i++) {
      curreWord += board[currentAttempt.attempt][i].toLowerCase()
    }
   if (wordSet.has(curreWord)) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPosition: 0,
      });
    } else {
      alert("Word does not exist");
    }
    if (curreWord === correctword) {
      setGameOver({gameOver: true,guessedword:true});
      return;
    }  
    if(currentAttempt.attempt===5){
      setGameOver({gameOver: true,guessedword:false});
      return;
    }
  };

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectword(words.todaysWord)
    });
  }, []);

  return (
    <div>
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctword,
          disabledletters,
          setDisabledletters,
          gameOver,
          setGameOver,
          correctword,
          currentAttempt
        }}
      >
        <div className="game">
          <Board />
    {gameOver.gameOver ? <GameOver/>: <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
