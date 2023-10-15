import React, { useState } from 'react';
import CreditCardForm from './CreditCard';
import { useStateContext } from '../context/StateContext';

const PaymentTab = () => {
  // const [activeTab, setActiveTab] = useState('creditDebit');
  const { activeTab, setActiveTab } = useStateContext();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-container">
      <h2 className="tab-heading">Payment Method</h2>
      <div className="tab-titles">
        <div
          className={`tab-title ${activeTab === 'creditDebit' && 'active'}`}
          onClick={() => handleTabClick('creditDebit')}
        >
          {/* Credit/Debit */}
          <img src="./assets/credit.png" alt="credit" style={{width: '40px', height: '20px', marginTop: '0px'}} />
        </div>
        <div
          className={`tab-title ${activeTab === 'paypal' && 'active'}`}
          onClick={() => handleTabClick('paypal')}
        >
          {/* PayPal */}
          <img src="./assets/paypal.png" alt="paypal" style={{width: '80px', height: '16px', marginTop: '8px'}} />
        </div>
        <div
          className={`tab-title ${activeTab === 'openpesa' && 'active'}`}
          onClick={() => handleTabClick('openpesa')}
        >
          {/* Openpesa */}
          <img src="./assets/openpesa1.png" alt="openpesa" style={{width: '80px', height: '16px', marginTop: '8px'}} />
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 'creditDebit' && (
          <div>
            {/* <p>Content for Credit/Debit tab goes here.</p> */}
            <CreditCardForm />
          </div>
        )}
        {activeTab === 'paypal' && (
          <div>
            <p>In order to complete your transaction, we will transfer you over to PayPal's secure servers.</p>
          </div>
        )}
        {activeTab === 'openpesa' && (
          <div>
            <p>In order to complete your transaction, we will initiate / transfer you over to Openpesa's secure servers.</p>
            {/* <OpenPesa /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTab;
