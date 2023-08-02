import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { logout } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import classes from './navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/" className={classes.title}>
            FoodieFleet
          </Link>
        </div>
        <div className={classes.center}>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Link to="/">Home</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/foods">Foods</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/faq">FAQ</Link>
            </li>
            {user && user.isAdmin && (
              <li className={classes.listItem}>
                <Link to="/create">Create</Link>
              </li>
            )}
          </ul>
        </div>
        <div className={classes.right}>
          <AiOutlineUser className={classes.userIcon} />
          <Link to="/cart" className={classes.cartContainer}>
            <AiOutlineShoppingCart className={classes.cartIcon} />
            <div className={classes.cartQuantity}>{products.length}</div>
          </Link>
          <button onClick={handleLogout} className={classes.logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
