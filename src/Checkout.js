import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';


export default function Checkout() {

  const [{ basket, user }] = useStateValue()

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423592668_.jpg" alt="" className="checkout_ad" />
        <div>
          <h3>{user?.email}</h3>
          <h2 className="checkout__title">
            Shopping basket
          </h2>
          <div className="checkout_items">
            {basket.map((el) => {
              return (
                <CheckoutProduct
                  title={el.title}
                  id={el.id}
                  image={el.image}
                  price={el.price}
                  quantity={el.quantity}
                  rating={el.rating}
                />
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
