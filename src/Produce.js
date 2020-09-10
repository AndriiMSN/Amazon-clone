import React, { useState } from 'react';
import './Produce.css'
import { useStateValue } from './StateProvider'

function Produce({ title, image, price, rating, id }) {
  const [{ basket, subtotal }, dispatch] = useStateValue()
  // console.log(basket);
  const addToBasket = () => {

    // dispatch
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        quantity: 1,
        image: image
      },
      amount: +price
    }
    )
    dispatch({
      type: "ITEMS"
    }
    )

  }
  return (
    <div className="product" id={id}>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__raiting">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img className="product__image" src={image} alt="" />
      <button type="button" onClick={addToBasket}>Add to Basket</button>
      <p>{(basket.find((el) => el.id.match(id))) ? (basket.find((el) => el.id.match(id)).quantity) : 0}</p>
    </div>
  );
}

export default Produce;
