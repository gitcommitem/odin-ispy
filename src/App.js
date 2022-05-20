import './styles/App.css';
import gameImg from './imgs/game.jpg';
import StartPrompt from './components/StartPrompt';
import BottomBar from './components/BottomBar';
import Cursor from './components/Cursor';
import React, { useState } from 'react';

function App () {
  const [isGameStart, setGameStart] = useState(false);

  const handleStartButtonClick = () => {
    setGameStart(true);
  };

  return (
    <div id="page-cont">
      <Cursor />
      <StartPrompt
        hidePrompt={isGameStart}
        handleButtonClick={handleStartButtonClick}
      />
      <div className="center" id="game-cont">
        <img className={isGameStart ? '' : 'blur'} id="game" src={gameImg} />
      </div>
      <BottomBar />
    </div>
  );
}

export default App;
