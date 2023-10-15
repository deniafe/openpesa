import React, {useEffect} from 'react'
import { PaymentTab, OrderSummary, OpenPesaModal } from '../components';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';

const checkout = () => {
  const { showModal, closeModal, cartItems } = useStateContext();

  const router = useRouter()

  useEffect(() => {
    if(cartItems.length < 1) {
      return router.push("/")
    }
   }, []);

  return (
    <div className="checkout-container">
      {showModal && <OpenPesaModal onClose={closeModal} />}
      {/* <OpenPesaModal onClose={closeModal} /> */}
      <div className="payment-column">
        <PaymentTab />
      </div>
      <div className="summary-column">
        <OrderSummary />

      </div>
    </div>
  )
}

export default checkout