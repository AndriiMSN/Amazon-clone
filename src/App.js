import React, { useEffect } from 'react';

import Header from './Header';
import Home from './Home';
import Checkout from './Checkout'
import './App.css';
import Login from './Login'
import Payment from './Payment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe("pk_test_51HQ9rVJsQYpVuO625gJoG4LnbmP0BIQC5YTHdaIRCJMUX3NKgi647hAd5kMDFA26fugLkiVcHNLtmBdXweqDsQrg00DMSbbU8y")
function App() {
  const [{ }, dispatch] = useStateValue()
  useEffect(() => {
    auth
      .onAuthStateChanged(authUser => {
        console.log('USER IS -->', authUser);

        if (authUser) {
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        } else {
          dispatch({
            type: 'SET_USER',
            user: null
          })
        }
      })
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/pay">
            <Elements stripe={promise}>
              <Payment />
            </Elements>

          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </div>
    </Router>
  );

  {/* Home */ }
}

export default App;
