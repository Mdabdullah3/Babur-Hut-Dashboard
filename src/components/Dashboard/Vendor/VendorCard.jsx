import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const VendorCard = ({ item }) => {
  return (
    <div className="flex shadow-xl px-4 justify-center py-4 rounded-xl items-center">
      <div>
        <h1 className="font-semibold">{item.name}</h1>
        <div className="font-normal text-gray-700">
          <h2>Products: {item.quantity}</h2>
          <h3>Active Order: {item.activeOrder}</h3>
          <h4>Complete Order: {item.completeOrder}</h4>
          <h1 className="flex items-center text-sm my-2 text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </h1>
          <h6 className="text-black font-normal text-md">4.1 | 400 Reviews</h6>
        </div>
      </div>
      <div>
        <img src={item.img} alt="" className="w-40" />
        <div className="ml-10">
          <Link to={`/admin/vendor/${item.id}`}>
            <button className="bg-primary px-3 py-1.5 rounded-lg text-sm text-white">
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
