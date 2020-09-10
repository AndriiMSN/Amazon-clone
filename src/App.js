import React, { useEffect } from 'react';

import Header from './Header';
import Home from './Home';
import Checkout from './Checkout'
import './App.css';
import Login from './Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase'
import { useStateValue } from './StateProvider';

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
