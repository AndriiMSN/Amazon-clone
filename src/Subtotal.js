import React from 'react'
import CurrencyFormat from 'react-currency-format';
import './Subtotal.css'
import { useStateValue } from './StateProvider';


function Subtotal() {
  const [{ subtotal, basket }, dispatch] = useStateValue()
  console.log(basket.length);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ( {basket?.length} items):
        <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" name="" id="gift" />
              <label htmlFor="gift">This order contains a gift</label>
            </small>
          </>
        )}
        decimalScale={2}
        value={subtotal}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button>Procceed to Checkout</button>
    </div>
  )
}

export default Subtotal
