import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider';


export default function Checkout() {
  const [{ basket }, dispatch] = useStateValue()
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423592668_.jpg" alt="" className="checkout_ad" />
        <div>
          <h2 className="checkout__title">
            Shopping basket
          </h2>
          <div className="checkout_items">
            {basket.map((el) => {
              return (
                <div className="checkout__item">
                  <p>{el.title}</p>
                  <strong>${el.price}</strong>
                  <p>Quantity: {el.quantity}</p>
                  <img src={el.image} alt="" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}
