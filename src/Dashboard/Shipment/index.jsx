import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Shipping = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Shipping</h1>
          <Link to="/admin/create-shipping">
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/60">
              <FiPlus className="mr-2" /> Add Shipping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
