import './styles/App.css';
import gameImg from './imgs/game.jpg';
import StartPrompt from './components/StartPrompt';
import BottomBar from './components/BottomBar';

function App () {
  return (
    <div>
      <StartPrompt />
      <img src={gameImg} />
      <BottomBar />
    </div>
  );
}

export default App;
