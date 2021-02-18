import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../icons';

const CartItem = ({ item, ...funcs }) => {
  const { title, imageUrl, price, quantity } = item;
  const { increase, decrease, removeProduct } = funcs;
  console.log(item);
  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h4>{title}</h4>
        <p>${price}</p>
      </div>
      <div className="quantity">
        <p>{`Quantity: ${quantity}`}</p>
      </div>
      <div className="btns-container">
        <button
          className="btn-increase"
          onClick={() => {
            increase(item);
          }}
        >
          <PlusCircleIcon width="20px" />
        </button>
        {quantity === 1 && (
          <button className="btn-trash" onClick={() => removeProduct(item)}>
            <TrashIcon width="20px" />
          </button>
        )}
        {quantity > 1 && (
          <button
            className="btn-decrease"
            onClick={() => {
              decrease(item);
            }}
          >
            <MinusCircleIcon width="20px" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
