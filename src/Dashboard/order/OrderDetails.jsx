import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useOrderStore from "../../store/OrderStore";

const OrderDetails = () => {
  const { id } = useParams();
  const { fetchOrderById, singleOrder } = useOrderStore();
  useEffect(() => {
    fetchOrderById(id);
  }, [id, fetchOrderById]);
  console.log(singleOrder);
  return (
    <div>
      <h1>Order Details</h1>
    </div>
  );
};

export default OrderDetails;
