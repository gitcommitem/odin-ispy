import '../styles/StartPrompt.css';

const StartPrompt = () => {
  return (
    <div class='start-cont center'>
      <div id='start-prompt'>
        <p>Find the items listed below as quickly as possible.</p>
        <button>Start Game</button>
        <p>Credits</p>
        <p>
          Photo by{' '}
          <a href='https://www.flickr.com/photos/mag3737/' target='_blank'>
            {' '}
            Tom Magliery
          </a>{' '}
        </p>
      </div>
    </div>
  );
};

export default StartPrompt;
