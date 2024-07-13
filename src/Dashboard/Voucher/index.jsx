import React from "react";
import { useState } from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const VoucherAdminPanel = () => {
  const [vouchers, setVouchers] = useState([
    // Sample data
    {
      id: 1,
      code: "SAVE20",
      discount: "20%",
      expiry: "2024-12-31",
      status: "Active",
    },
    {
      id: 2,
      code: "WELCOME10",
      discount: "10%",
      expiry: "2024-06-30",
      status: "Expired",
    },
  ]);

  const header = ["Code", "Discount", "Expiry Date", "Status", "Action"];

  const handleEditVoucher = (id) => {
    // Edit voucher logic
  };

  const handleDeleteVoucher = (id) => {
    // Delete voucher logic
    setVouchers(vouchers.filter((voucher) => voucher.id !== id));
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Vouchers</h1>
          <Link to="/admin/add-voucher">
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/60">
              <FiPlus className="mr-2" /> Add Voucher
            </button>
          </Link>
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {header.map((head, index) => (
                <th
                  key={index}
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id} className="border-b border-gray-200">
                <td className="py-4 px-6">{voucher.code}</td>
                <td className="py-4 px-6">{voucher.discount}</td>
                <td className="py-4 px-6">{voucher.expiry}</td>
                <td className="py-4 px-6">{voucher.status}</td>
                <td className="py-4 px-6 flex space-x-2">
                  <button
                    onClick={() => handleEditVoucher(voucher.id)}
                    className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVoucher(voucher.id)}
                    className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FiTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherAdminPanel;
