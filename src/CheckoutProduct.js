import React from 'react'
import { useStateValue } from './StateProvider';
import './CheckoutProduct.css'


function CheckoutProduct({ id, rating, image, title, quantity, price }) {
  const [{ basket }, dispatch] = useStateValue()
  const removeFromBusket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
      price: price,
      quantity: quantity
    })
  }
  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} />

      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <p>quantity: <strong>{quantity}</strong></p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        <button onClick={removeFromBusket}>Remove from Basket</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
