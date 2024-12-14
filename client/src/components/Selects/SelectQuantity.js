import React from 'react';

const SelectQuantity = ({ quantity, handleQuantity }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      handleQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    handleQuantity(quantity + 1);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d+$/.test(value)) {
      handleQuantity(parseInt(value));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrease}
        className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-200"
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        inputMode="numeric"
        pattern="[0-9]*"
        className="w-12 text-center border rounded"
      />
      <button
        onClick={handleIncrease}
        className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
};

export default SelectQuantity;
