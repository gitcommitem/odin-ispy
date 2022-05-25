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

    checkPosition(positionX, positionY);
  };

  const checkPosition = (x, y) => {
    const offset = 22;

    const item1X = 428;
    const item1Y = 217;

    const item2X = 1500;
    const item2Y = 802;

    const item3X = 1113;
    const item3Y = 149;

    const item4X = 1018;
    const item4Y = 299;

    const item5X = 269;
    const item5Y = 588;

    const item6X = 686;
    const item6Y = 622;

    const coordKey = [
      {
        id: 1,
        lowX: item1X - offset,
        highX: item1X + offset,
        lowY: item1Y - offset,
        highY: item1Y + offset
      },
      {
        id: 2,
        lowX: item2X - offset,
        highX: item2X + offset,
        lowY: item2Y - offset,
        highY: item2Y + offset
      },
      {
        id: 3,
        lowX: item3X - offset,
        highX: item3X + offset,
        lowY: item3Y - offset,
        highY: item3Y + offset
      },
      {
        id: 4,
        lowX: item4X - offset,
        highX: item4X + offset,
        lowY: item4Y - offset,
        highY: item4Y + offset
      },
      {
        id: 5,
        lowX: item5X - offset,
        highX: item5X + offset,
        lowY: item5Y - offset,
        highY: item5Y + offset
      },
      {
        id: 6,
        lowX: item6X - offset,
        highX: item6X + offset,
        lowY: item6Y - offset,
        highY: item6Y + offset
      }
    ];

    //If user clicks within target boundaries access firestore to validate
    if (
      coordKey[0].lowX < x &&
      x < coordKey[0].highX &&
      coordKey[0].lowY < y &&
      y < coordKey[0].highY
    ) {
      //Get document for pig
      console.log('pig');
    } else if (
      coordKey[1].lowX < x &&
      x < coordKey[1].highX &&
      coordKey[1].lowY < y &&
      y < coordKey[1].highY
    ) {
      //Get document for green die
      console.log('green die');
    } else if (
      coordKey[2].lowX < x &&
      x < coordKey[2].highX &&
      coordKey[2].lowY < y &&
      y < coordKey[2].highY
    ) {
      //Get document for triangle
      console.log('triangle');
    } else if (
      coordKey[3].lowX < x &&
      x < coordKey[3].highX &&
      coordKey[3].lowY < y &&
      y < coordKey[3].highY
    ) {
      //Get document for multi die
      console.log('multi');
    } else if (
      coordKey[4].lowX < x &&
      x < coordKey[4].highX &&
      coordKey[4].lowY < y &&
      y < coordKey[4].highY
    ) {
      //Get document for wood tile
      console.log('tile');
    } else if (
      coordKey[5].lowX < x &&
      x < coordKey[5].highX &&
      coordKey[5].lowY < y &&
      y < coordKey[5].highY
    ) {
      //Get document for rectangle
      console.log('rect');
    } else {
      alert('Keep looking 👀');
    }
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
