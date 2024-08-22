import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEventStore from "../../store/EventStore";
import useEventProductStore from "../../store/EventProductStore";
import useUserStore from "../../store/AuthStore";
import useProductStore from "../../store/ProductStore";

const JoinEvents = () => {
  const { id } = useParams();
  const { fetchEventById, event } = useEventStore();
  const { user, fetchUser } = useUserStore();
  const { product, fetchProductByIdForUser } = useProductStore();
  const {
    fetchEventProducts,
    createEventProduct,
    deleteEventProduct,
    eventProducts,
  } = useEventProductStore();

  useEffect(() => {
    fetchEventById(id);
    fetchEventProducts();
    fetchUser();
    fetchProductByIdForUser(user?._id);
  }, [
    fetchEventById,
    fetchProductByIdForUser,
    fetchUser,
    user?._id,
    fetchEventProducts,
    id,
  ]);

  const handleAddProduct = (productId) => {
    createEventProduct({
      user: "your-user-id",
      product: productId,
      event: id,
      name: event.name,
    });
  };

  const handleRemoveProduct = (productId) => {
    deleteEventProduct(productId);
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Manage Products for{" "}
        <span className="text-yellow-600">{event?.name}</span>
      </h1>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Products</h2>
        <div className="grid grid-cols-3 gap-4">
          {eventProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <button
                onClick={() => handleAddProduct(product.id)}
                className="mt-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add to Event
              </button>
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove from Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinEvents;
