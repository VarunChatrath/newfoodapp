import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './checkout.module.css';
import { clearCart } from '../../redux/cartSlice';

const Checkout = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate the total price
  const [totalPrice, setTotalPrice] = useState(0);

  // State to keep track of whether the order is completed
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    // Calculate the total price whenever the products change
    let total = 0;
    products.forEach((product) => (total += product.quantity * product.price));
    setTotalPrice(total);
  }, []);

  // Function to handle order completion
  const handleOrderComplete = () => {
    // Dispatch the clearCart action to empty the cart
    dispatch(clearCart());

    // Set the orderCompleted state to true
    setOrderCompleted(true);
  };

  // Render the checkout completion message if the order is completed
  if (orderCompleted) {
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2>Your order is successful</h2>
          <p>Expect it in 1 hour</p>
          {/* Display the total price */}
          <span>Total Price: &#8377;{totalPrice}</span>
        </div>
      </div>
    );
  }

  // If the order is not completed, show the "Complete Order" button
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Checkout</h2>
        <p>Review your order</p>
        {/* Display the total price */}
        <span>Total Price: &#8377;{totalPrice}</span>{
          
        }
        <button onClick={handleOrderComplete}>Complete Order</button>
      </div>
    </div>
  );
};

export default Checkout;
