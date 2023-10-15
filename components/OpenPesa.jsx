import React, { useState } from 'react';
import Select from './Select';

const OpenPesa = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const banks = [
    "Access Bank",
    "Zenith Bank",
    "First Bank of Nigeria",
    "Guaranty Trust Bank (GTBank)",
    "United Bank for Africa (UBA)",
    "Ecobank Nigeria",
    "Sterling Bank",
    "Fidelity Bank",
    "Union Bank of Nigeria",
    "First City Monument Bank (FCMB)",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Keystone Bank",
    "Wema Bank",
    "Heritage Bank",
    "Unity Bank",
    "Kuda",
    "Opay"
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <Select options={banks} onSelect={handleSelect} />
    </div>
  );
};

export default OpenPesa;
