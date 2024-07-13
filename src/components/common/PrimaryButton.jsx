import React from "react";

const PrimaryButton = ({ value, onClick, disabled = false }) => {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        className="bg-primary hover:bg-primary/70  text-white font-bold py-3 px-4 rounded-lg w-full transition duration-300"
      >
        {value}
      </button>
    </div>
  );
};

export default PrimaryButton;
