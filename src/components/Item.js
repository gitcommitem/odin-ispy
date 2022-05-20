import '../styles/Item.css';

const Item = ({ imgSrc, itemName }) => {
  return (
    <div className='item vcenter'>
      <div>
        <img className='item-img' src={imgSrc} />
      </div>
      <p>{itemName}</p>
    </div>
  );
};

export default Item;
