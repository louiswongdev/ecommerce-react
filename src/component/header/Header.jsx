import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { auth } from '../../firebase';
import CartIcon from '../cart-icon/CartIcon';

import './Header.styles.scss';

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="nav-menu container">
      <div className="logo">
        <Link to="/">NOMAD</Link>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        {user ? (
          <li onClick={() => auth.signOut()}>Sign Out</li>
        ) : (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>

            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
      <CartIcon />
    </nav>
  );
};

export default Header;
