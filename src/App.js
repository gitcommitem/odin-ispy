import './styles/App.css';
import gameImg from './imgs/game.jpg';
import StartPrompt from './components/StartPrompt';
import BottomBar from './components/BottomBar';

function App () {
  return (
    <div id='page-cont'>
      <StartPrompt />
      <img className='blur' id='game' src={gameImg} />
      <BottomBar />
    </div>
  );
}

export default App;
