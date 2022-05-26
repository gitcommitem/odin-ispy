import '../styles/Item.css';

const Item = ({ imgSrc, itemName, itemId }) => {
  return (
    <div className="item vcenter" id={itemId}>
      <div>
        <img className="item-img" src={imgSrc} />
      </div>
      <p>{itemName}</p>
    </div>
  );
};

export default Item;
