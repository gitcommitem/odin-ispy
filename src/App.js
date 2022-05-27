import './styles/App.css';
import React, { useState } from 'react';

import gameImg from './imgs/game.jpg';
import StartPrompt from './components/StartPrompt';
import BottomBar from './components/BottomBar';
import Cursor from './components/Cursor';
import EndScreen from './components/EndScreen';

import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from './FirebaseConfig';

function App () {
  const [isGameStart, setGameStart] = useState(false);
  const [isGameEnd, setGameEnd] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [finalTime, setFinalTime] = useState('');

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
    checkGameEnd();
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
      checkData(0, x, y);
    } else if (
      coordKey[1].lowX < x &&
      x < coordKey[1].highX &&
      coordKey[1].lowY < y &&
      y < coordKey[1].highY
    ) {
      //Get document for green die
      checkData(1, x, y);
    } else if (
      coordKey[2].lowX < x &&
      x < coordKey[2].highX &&
      coordKey[2].lowY < y &&
      y < coordKey[2].highY
    ) {
      //Get document for triangle
      checkData(2, x, y);
    } else if (
      coordKey[3].lowX < x &&
      x < coordKey[3].highX &&
      coordKey[3].lowY < y &&
      y < coordKey[3].highY
    ) {
      //Get document for multi die
      checkData(3, x, y);
    } else if (
      coordKey[4].lowX < x &&
      x < coordKey[4].highX &&
      coordKey[4].lowY < y &&
      y < coordKey[4].highY
    ) {
      //Get document for wood tile
      checkData(4, x, y);
    } else if (
      coordKey[5].lowX < x &&
      x < coordKey[5].highX &&
      coordKey[5].lowY < y &&
      y < coordKey[5].highY
    ) {
      //Get document for rectangle
      checkData(5, x, y);
    } else {
      alert('Keep looking 👀');
    }
  };

  const [itemValue] = useCollection(collection(db, 'items'));

  const checkData = (index, x, y) => {
    const { lowX, id, highX, highY, lowY, name } = itemValue.docs[index].data();
    const notFoundYet = foundItems.indexOf(name) === -1;

    const itemContDiv = document.getElementById(`${id}`);

    //Validate again if x, y are within target range
    if (lowX < x && x < highX && lowY < y && y < highY && notFoundYet) {
      setFoundItems([...foundItems, name, id]);
      itemContDiv.style.opacity = 0.4;
    }
  };

  const checkGameEnd = () => {
    if (foundItems.length === 10) {
      setGameEnd(true);
      const endTime = document.querySelector('h1#timer').textContent;
      setFinalTime(endTime);
    }
  };

  //Switching classnames

  const [isFadeOut, setisFadeOut] = useState(false);

  const getImgClassName = () => {
    if (isGameStart && !isGameEnd) {
      return '';
    } else if (isGameEnd) {
      setTimeout(() => {
        setisFadeOut(true);
      }, 300);
      return 'fade-out';
    } else {
      return 'blur';
    }
  };

  const gameImgClass = getImgClassName();

  const getGameContClassName = () => {
    if (isFadeOut) {
      return 'hidden';
    } else {
      return 'center';
    }
  };

  const gameContClass = getGameContClassName();

  return (
    <div id="page-cont">
      <Cursor isGameStart={isGameStart} />
      <StartPrompt
        hidePrompt={isGameStart}
        handleButtonClick={handleStartButtonClick}
      />
      <div className={gameContClass} id="game-cont">
        <img
          onClick={handleGameImgClick}
          className={gameImgClass}
          id="game"
          src={gameImg}
        />
      </div>
      <BottomBar isGameStart={isGameStart} isGameEnd={isGameEnd} />
      <EndScreen isGameEnd={isGameEnd} finalTime={finalTime} />
    </div>
  );
}

export default App;
