const Item = ({ imgSrc, itemName }) => {
  return (
    <div>
      <img src={imgSrc} />
      <p>{itemName}</p>
    </div>
  );
};

export default Item;
