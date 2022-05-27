import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../FirebaseConfig';

const EndScreen = () => {
  const [value, loading, error] = useCollection(collection(db, 'leaderboard'));
  //Loading returns as true if still loading, false if data is retrieved

  const top5 = [];

  // Read firestore to list the leaderboard
  (() => {
    if (loading === false) {
      value.docs.forEach(doc => {
        let { score, time } = doc.data();
        top5.push(<li key={doc.id}>{time}</li>);
      });
    }
  })();

  return (
    <div className="center">
      <div>
        <h1>You found all items!</h1>
        <h1>Top 5</h1>
        <ol>{top5}</ol>
      </div>
    </div>
  );
};

export default EndScreen;
