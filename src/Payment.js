import React, { useEffect, useState } from 'react'
import './Payment.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
import axios from './axios'

function Payment() {
  const history = useHistory()

  const [{ basket, user, subtotal }] = useStateValue()

  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState("")
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${subtotal.toFixed(2) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  }, [basket])

  console.log('THE SECRET IS >>>', clientSecret)


  const handleSubmit = async e => {
    e.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymantIntent }) => {
      //paymentIntent = payment confirmation

      setSucceeded(true);
      setError(null)
      setProcessing(false)

      history.replace('/orders')
    })
  }
  const handleChange = e => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  }
  return (
    <div>
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout {<Link to="./checkout">{basket?.length} items</Link>}
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <p>
                    <strong>{value}</strong>
                  </p>
                </>
              )}
              decimalScale={2}
              value={subtotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </h1>
          {/**Payment adress */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>Email: {user?.email}</p>
              <p>Ukraine, Kiev</p>
            </div>
          </div>
          {/**Items */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items</h3>
            </div>
            <div className="payment__items">
              <h3>Review items</h3>
              {basket.map(el => {
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
          {/**Method */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment method</h3>
            </div>
            <div className="payment__details">
              <form action="" onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <p>
                          <strong>{value}</strong>
                        </p>
                      </>
                    )}
                    decimalScale={2}
                    value={subtotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? "processing" : "Buy now"}</span>
                  </button>
                </div>
                {error && { error }}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
