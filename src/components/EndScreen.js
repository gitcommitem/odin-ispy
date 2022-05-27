import React, { useState } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../FirebaseConfig';

const EndScreen = ({ isGameEnd, finalTime }) => {
  const [value, loading, error] = useCollection(collection(db, 'leaderboard'));
  //Loading returns as true if still loading, false if data is retrieved

  const [scoreCheck, setScoreCheck] = useState(false);

  const checkTopScores = () => {
    if (isGameEnd === true && loading === false && scoreCheck === false) {
      const playerScore = +finalTime.replaceAll(':', '');

      const slot2Score = value.docs[1].data().score;
      const slot2Time = value.docs[1].data().time;

      const slot3Score = value.docs[2].data().score;
      const slot3Time = value.docs[2].data().time;

      const slot4Score = value.docs[3].data().score;
      const slot4Time = value.docs[3].data().time;

      const slot5Score = value.docs[4].data().score;
      const slot5Time = value.docs[4].data().time;

      const nextSlot = {
        slot1: 'slot2',
        slot2: 'slot3',
        slot3: 'slot4',
        slot4: 'slot5'
      };

      value.docs.every(slot => {
        let { score, time } = slot.data();
        if (
          (playerScore < score && scoreCheck === false) ||
          (score === 0 && scoreCheck === false)
        ) {
          //Update document with player score and break loop
          const docRef = doc(db, 'leaderboard', slot.id);
          updateDoc(docRef, { score: playerScore, time: finalTime });

          if (score !== 0) {
            //Need to update / shift all the previous scores if a new score gets updated
            if (slot.id !== 'slot5') {
              const nextDocRef = doc(db, 'leaderboard', nextSlot[slot.id]);
              updateDoc(nextDocRef, { score: score, time: time });
            }

            if (slot.id === 'slot1') {
              if (slot3Score !== 0) {
                const slot3Ref = doc(db, 'leaderboard', 'slot3');
                updateDoc(slot3Ref, { score: slot2Score, time: slot2Time });
              }

              if (slot4Score !== 0) {
                const slot4Ref = doc(db, 'leaderboard', 'slot4');
                updateDoc(slot4Ref, { score: slot3Score, time: slot3Time });
              }

              if (slot5Score !== 0) {
                const slot5Ref = doc(db, 'leaderboard', 'slot5');
                updateDoc(slot5Ref, { score: slot4Score, time: slot4Time });
              }
            } else if (slot.id === 'slot2') {
              if (slot4Score !== 0) {
                const slot4Ref = doc(db, 'leaderboard', 'slot4');
                updateDoc(slot4Ref, { score: slot3Score, time: slot3Time });
              }

              if (slot5Score !== 0) {
                const slot5Ref = doc(db, 'leaderboard', 'slot5');
                updateDoc(slot5Ref, { score: slot4Score, time: slot4Time });
              }
            } else if (slot.id === 'slot3') {
              if (slot5Score !== 0) {
                const slot5Ref = doc(db, 'leaderboard', 'slot5');
                updateDoc(slot5Ref, { score: slot4Score, time: slot4Time });
              }
            }
          }

          setScoreCheck(true);
          return false;
        } else {
          //Check the rest of the scores against player score
          return true;
        }
      });
    }
  };

  (() => {
    if (scoreCheck === false) {
      const checkedScores = checkTopScores();
      if (checkedScores === true) {
        setScoreCheck(true);
      }
    }
  })();

  const top5 = [];

  // Read firestore to list the leaderboard
  (() => {
    if (loading === false) {
      value.docs.forEach(slot => {
        let { score, time } = slot.data();
        top5.push(<li key={slot.id}>{time}</li>);
      });
    }
  })();

  return (
    <div className={isGameEnd ? 'center' : 'hidden'}>
      <div>
        <h1>You found all items!</h1>
        <h1>{finalTime}</h1>
        <h1>Top 5</h1>
        <ol>{top5}</ol>
      </div>
    </div>
  );
};

export default EndScreen;
