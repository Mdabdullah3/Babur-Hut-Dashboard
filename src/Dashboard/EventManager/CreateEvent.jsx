import React, { useEffect, useState } from "react";
import SelectField from "../../components/common/SelectField";
import PrimaryButton from "../../components/common/PrimaryButton";
import InputField from "../../components/common/InputField";
import FileUpload from "../../components/common/FileUpload";
import useProductStore from "../../store/ProductStore";
import useUserStore from "../../store/AuthStore";
import ProductCard from "../../components/common/ProductCard";

const CreateEvent = () => {
  const { user } = useUserStore();
  const { product, fetchProductByIdForUser } = useProductStore();

  useEffect(() => {
    if (user?._id) {
      fetchProductByIdForUser(user._id);
    }
  }, [fetchProductByIdForUser, user._id]);

  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    image: image,
    product: [],
    strDate: "",
    endDate: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const handleProductSelect = (selectedProduct) => {
    setForm((prevForm) => ({
      ...prevForm,
      product: [...prevForm.product, selectedProduct],
    }));
  };

  const handleProductRemove = (productId) => {
    setForm((prevForm) => ({
      ...prevForm,
      product: prevForm.product.filter((prod) => prod._id !== productId),
    }));
  };

  const isProductSelected = (productId) => {
    return form.product.some((prod) => prod._id === productId);
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="flex h-screen">
      <section className="flex-1 p-10 bg-white rounded-lg shadow-md m-5">
        <form onSubmit={handleAddEvent} className="space-y-5">
          <InputField
            label="Event Name"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Enter event name"
            required
          />
          <FileUpload name="image" label="Event Image" setFile={setImage} />

          <div className="mt-5">
            <h3 className="text-lg font-medium">Select Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
              {product.map((prod) => (
                <ProductCard
                  key={prod._id}
                  product={prod}
                  onSelect={handleProductSelect}
                  onRemove={handleProductRemove}
                  isSelected={isProductSelected(prod._id)}
                />
              ))}
            </div>
          </div>
          <InputField
            label="Starting Date"
            type="date"
            name="strDate"
            value={form.strDate}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="End Date"
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleInputChange}
            required
          />
          <SelectField
            label="Status"
            id="status"
            name="status"
            value={form.status}
            onChange={handleInputChange}
            options={statusOptions}
            placeholder="Select status"
            required
          />

          <PrimaryButton type="submit" value="Create Event" />
        </form>
      </section>
      <aside className="w-1/3 p-10 bg-gray-50 rounded-lg shadow-md m-5">
        <h3 className="text-lg font-medium">Selected Products</h3>
        <ul className="mt-3 space-y-2">
          {form.product.map((prod) => (
            <li
              key={prod._id}
              className="flex justify-between items-center bg-white p-3 rounded shadow capitalize"
            >
              <span>{prod.name}</span>
              <button
                type="button"
                className="text-red-500"
                onClick={() => handleProductRemove(prod._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default CreateEvent;
