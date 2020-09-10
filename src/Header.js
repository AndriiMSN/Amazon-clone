import React from 'react';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Header.css'
import { useStateValue } from './StateProvider';
import { auth } from './firebase';


function Header() {
  const [{ items, user }, dispatch] = useStateValue()
  const handleAuthetication = () => {
    if (user) {
      auth.signOut();
    }
  }
  return (
    <div className="header">
      <Link to="/">
        <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" className="header__logo" />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthetication} className="header__option">
            <span className="header_optionLineOne">
              Hello {user?.email}
            </span>
            <span className="header_optionLineTwo">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header_optionLineOne">
            Returns
          </span>
          <span className="header_optionLineTwo">
            Orders
          </span>
        </div>
        <div className="header__option">
          <span className="header_optionLineOne">
            Your
          </span>
          <span className="header_optionLineTwo">
            Prime
          </span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">{items}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Header