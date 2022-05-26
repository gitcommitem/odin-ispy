import '../styles/BottomBar.css';
import Timer from './Timer';
import pigImg from '../imgs/item1.png';
import greenDieImg from '../imgs/item2.png';
import triangleImg from '../imgs/item3.png';
import multiDieImg from '../imgs/item4.png';
import woodTileImg from '../imgs/item5.png';
import rectangleImg from '../imgs/item6.png';

import Item from './Item';

const itemsList = [
  {
    id: 1,
    name: 'Pig',
    imgSrc: pigImg
  },
  {
    id: 2,
    name: 'Green Die',
    imgSrc: greenDieImg
  },
  {
    id: 3,
    name: 'Orange Triangle',
    imgSrc: triangleImg
  },
  {
    id: 4,
    name: 'Multi-sided Die',
    imgSrc: multiDieImg
  },
  {
    id: 5,
    name: 'M Wood Tile',
    imgSrc: woodTileImg
  },
  {
    id: 6,
    name: 'Blue Rectangle',
    imgSrc: rectangleImg
  }
];

const generatedItems = [];

itemsList.forEach(item => {
  generatedItems.push(
    <Item
      imgSrc={item.imgSrc}
      itemName={item.name}
      itemId={item.id}
      key={item.id}
    />
  );
});

const BottomBar = ({ isGameStart, isGameEnd }) => {
  return (
    <div className="hflex" id="bottom-bar">
      <div className="hflex" id="item-cont">
        {generatedItems}
      </div>
      <Timer isGameStart={isGameStart} isGameEnd={isGameEnd} />
    </div>
  );
};

export default BottomBar;
