import React, { useEffect, useState } from "react";
import { financeData } from "../../../utils/constant";
import useUserStore from "../../../store/AuthStore";
import useOrderStore from "../../../store/OrderStore";

const ReceivalePayment = () => {
  const { users, fetchAllUser } = useUserStore();
  const [userOrders, setUserOrders] = useState({});

  const { fetchCustomerOrders } = useOrderStore();
  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  useEffect(() => {
    const loadOrdersForAllUsers = async () => {
      const ordersByUser = {};
      for (let user of users) {
        const orders = await fetchCustomerOrders(user._id);
        ordersByUser[user._id] = orders;
      }
      setUserOrders(ordersByUser);
    };

    if (users?.length) {
      loadOrdersForAllUsers();
    }
  }, [users, fetchCustomerOrders]);

  const calculateActiveOrders = (orders) => {
    return orders?.filter((order) => order.status !== "cancelled");
  };
  const header = [
    "No",
    "Order Id",
    "Order Cost",
    "Name",
    "Phone",
    "Gmail",
    "Profit",
    "Vendor",
    "Date",
  ];
  return (
    <div className=" overflow-x-auto w-full">
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
          {users?.map((user) => {
            const orders = userOrders[user._id] || [];
            const activeOrders = calculateActiveOrders(orders);
            // const TotalOrderCost = orders.red;

            return (
              <tbody key={user._id}>
                <tr className="border-r border-l border-gray-300 border-b">
                  <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                    {user._id}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300 capitalize">
                    {user.name}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                    {user?.name}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                    {/* {activeOrders} */}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                    {/* {totalOrders} */}
                  </td>
                 
                </tr>
              </tbody>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivalePayment;
