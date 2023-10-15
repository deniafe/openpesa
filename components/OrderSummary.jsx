import React from 'react';
import { useStateContext } from '../context/StateContext';
import toast from 'react-hot-toast';

const OrderSummary = () => {
  const { openModal, totalPrice, cartItems, activeTab } = useStateContext();

  const openPaymentModal = () => {
    if(activeTab !== 'openpesa') {
      return toast.error('Payment option not available')
    }

    return openModal()

  }

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="original-amount-summary" key={item._id}>
              <p>{item.name} : {item.quantity}</p>
              <p>${item.price}</p>
            </div>
          ))}
     
      <div className="line"></div>

      <div className="total-amount-summary">
        <p>Total Amount:</p>
        <p>${totalPrice}</p>
      </div>
     
      {/* <button >Confirm Order</button> */}
      <button
        type="button"
        onClick={openPaymentModal}
        className="btn"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderSummary;
