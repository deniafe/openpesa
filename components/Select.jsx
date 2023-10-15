import React, { useState } from 'react';

const Select = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown();
  };

  return (
    <div className="custom-select">
      <div className={`select-box ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <span>{selectedOption || 'Select an option'}</span>
        <i className={`arrow ${isOpen ? 'up' : 'down'}`}></i>
      </div>
      <ul className={`options ${isOpen ? 'open' : ''}`}>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
