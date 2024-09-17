import React, { useEffect, useState } from "react";
import useUserStore from "../../../store/AuthStore";
import useOrderStore from "../../../store/OrderStore";
import { Link } from "react-router-dom";

const ReceivablePayment = () => {
  const { users, fetchAllVendorAndAdminUsers } = useUserStore();
  const [userOrders, setUserOrders] = useState({});
  const [totalOrderCost, setTotalOrderCost] = useState(0);
  const [totalVendorIncome, setTotalVendorIncome] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  const { fetchAllVendorOrders } = useOrderStore();

  // Fetch all users on component mount
  useEffect(() => {
    fetchAllVendorAndAdminUsers();
  }, [fetchAllVendorAndAdminUsers]);

  // Fetch orders for all users once the users are loaded
  useEffect(() => {
    const loadOrdersForAllUsers = async () => {
      const ordersByUser = {};
      let totalCost = 0;
      let vendorIncome = 0;
      let profit = 0;

      for (let user of users) {
        const orders = await fetchAllVendorOrders(user._id);
        ordersByUser[user?._id] = orders;
        const activeOrders = calculateActiveOrders(orders);
        totalCost += calculateTotalOrderCost(activeOrders);
        vendorIncome += calculateVendorPayment(activeOrders, false);
        profit += calculateTotalProfit(activeOrders);
      }
      setUserOrders(ordersByUser);
      setTotalOrderCost(totalCost);
      setTotalVendorIncome(vendorIncome);
      setTotalProfit(profit);
    };

    if (users?.length) {
      loadOrdersForAllUsers();
    }
  }, [users, fetchAllVendorOrders]);

  // Filter active orders
  const calculateActiveOrders = (orders) => {
    return orders?.filter((order) => order.status !== "cancelled");
  };

  // Calculate the total order cost excluding canceled orders
  const calculateTotalOrderCost = (orders) => {
    return orders.reduce((total, order) => {
      if (order.status !== "cancelled") {
        return total + Number(order.price || 0);
      }
      return total;
    }, 0);
  };

  // Calculate vendor payment for unpaid orders excluding canceled ones
  const calculateVendorPayment = (orders, forUnpaidOnly = true) => {
    return orders.reduce((profit, order) => {
      if (order.status !== "cancelled") {
        const orderProfit = Number(order.profit || 0);
        if (forUnpaidOnly) {
          if (order.vendorPaid === "unpaid") {
            return profit + orderProfit;
          }
        } else {
          return profit + orderProfit;
        }
      }
      return profit;
    }, 0);
  };

  // Calculate total profit excluding canceled orders
  const calculateTotalProfit = (orders) => {
    return orders.reduce((totalProfit, order) => {
      if (order.status !== "cancelled") {
        const transactionCost = Number(order.transactionCost || 0);
        const vat = Number(order.vat || 0);
        const commission = Number(order.commission || 0);
        const shippingCharge = Number(order.shippingCharge || 0);
        const orderProfit = transactionCost + vat + commission + shippingCharge;
        return totalProfit + orderProfit;
      }
      return totalProfit;
    }, 0);
  };
  const header = [
    "No",
    "User ID",
    "Name",
    "Total Order Cost",
    "Total Profit",
    "Vendor Payment",
    "Total Orders",
    "Action",
  ];
  return (
    <div className="overflow-x-auto w-full">
      <div className="flex justify-center gap-4 mt-4">
        <div className="bg-blue-500 w-52 py-6 text-white text-center shadow-lg rounded-md">
          <h1 className="font-bold">Total Profit :</h1>
          <h2>{totalProfit.toFixed(2)} BDT</h2>
        </div>
        <div className="bg-yellow-500 w-52 py-6 text-white text-center shadow-lg rounded-md">
          <h1 className="font-bold">Total Order Cost :</h1>
          <h2>{totalOrderCost.toFixed(2)} BDT</h2>
        </div>
        <div className="bg-green-500 w-52 py-6 text-white text-center shadow-lg rounded-md">
          <h1 className="font-bold">Total Vendor Income :</h1>
          <h2>{totalVendorIncome.toFixed(2)} BDT</h2>
        </div>
      </div>
      <table className="w-full bg-white border border-gray-200 mt-10">
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
          {users?.length > 0 ? (
            users?.map((user, userIndex) => {
              const orders = userOrders[user._id] || [];
              const activeOrders = calculateActiveOrders(orders);
              const totalOrderCost = calculateTotalOrderCost(activeOrders);
              const vendorPayment = calculateVendorPayment(activeOrders);
              const totalProfit = calculateTotalProfit(activeOrders);

              return (
                <tr
                  key={user._id}
                  className="border-r border-l border-gray-300 border-b"
                >
                  <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                    {userIndex + 1}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300 capitalize">
                    {user._id}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300 capitalize">
                    {user.name}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                    {totalOrderCost.toFixed(2)} BDT
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                    {totalProfit.toFixed(2)} BDT
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                    {vendorPayment.toFixed(2)} BDT
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                    {activeOrders.length}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300 ">
                    <Link to={`/admin/payable-payment/${user?._id}`}>
                      <button className="px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-600">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="text-center text-xl py-6 text-primary">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivablePayment;
