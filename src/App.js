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

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleGameImgClick = event => {
    const image = event.target;

    const bounds = image.getBoundingClientRect();
    const left = bounds.left;
    const top = bounds.top;

    //getBoundingClient is relative to viewport
    //so need to account for scroll
    const x = event.pageX - left - window.scrollX;
    const y = event.pageY - top - window.scrollY;

    const clientWidth = image.clientWidth;
    const clientHeight = image.clientHeight;

    const originalWidth = image.naturalWidth;
    const originalHeight = image.naturalHeight;

    const positionX = Math.round((x / clientWidth) * originalWidth);
    const positionY = Math.round((y / clientHeight) * originalHeight);

    setCursorPosition({ x: positionX, y: positionY });
  };

  return (
    <div id="page-cont">
      <Cursor />
      <StartPrompt
        hidePrompt={isGameStart}
        handleButtonClick={handleStartButtonClick}
      />
      <div className="center" id="game-cont">
        <img
          onClick={handleGameImgClick}
          className={isGameStart ? '' : 'blur'}
          id="game"
          src={gameImg}
        />
      </div>
      <BottomBar />
    </div>
  );
}

export default App;
