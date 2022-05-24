import './styles/App.css';
import gameImg from './imgs/game.jpg';
import StartPrompt from './components/StartPrompt';
import BottomBar from './components/BottomBar';
import Cursor from './components/Cursor';
import React, { useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDUWg0z-qQLTn6DKLdBUsXJ93ie1orolao',

  authDomain: 'ispygame-7ea84.firebaseapp.com',

  projectId: 'ispygame-7ea84',

  storageBucket: 'ispygame-7ea84.appspot.com',

  messagingSenderId: '720457772463',

  appId: '1:720457772463:web:a09f5c166f43aeedd4535a'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function App () {
  const [isGameStart, setGameStart] = useState(false);
  const [isGameEnd, setGameEnd] = useState(false);

  const handleStartButtonClick = () => {
    setGameStart(true);
    document.body.style.cursor = 'none';
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
      <Cursor isGameStart={isGameStart} />
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
      <BottomBar isGameStart={isGameStart} isGameEnd={isGameEnd} />
    </div>
  );
}

export default App;
