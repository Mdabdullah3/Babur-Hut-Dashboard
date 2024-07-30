import React, { useState } from "react";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PrimaryButton from "../../common/PrimaryButton";
import useCategoryStore from "../../../store/categoryStore";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../common/FileUpload";

const AddMainCategory = () => {
  const [image, setImage] = useState(null);
  const { addCategory, loading } = useCategoryStore();
  const status = [
    { id: 1, label: "Active", value: "active" },
    { id: 2, label: "Inactive", value: "inactive" },
  ];

  const [form, setForm] = useState({
    name: "",
    shippingCharge: "",
    status: "",
    commission: "",
    vat: "",
    image: image,
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(form, navigate);
  };
  console.log(form);
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
      onSubmit={handleSubmit}
    >
      <InputField
        label="Category Name"
        placeholder="Category Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <InputField
        label="Shipping Charge"
        placeholder="Shipping Charge"
        required
        value={form.shippingCharge}
        onChange={(e) => setForm({ ...form, shippingCharge: e.target.value })}
      />
      <SelectField
        label="Status"
        options={status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        value={form.status}
      />
      <InputField
        label="Category Commission"
        value={form.commission}
        onChange={(e) => setForm({ ...form, commission: e.target.value })}
        placeholder="Category Commission"
        required
      />
      <InputField
        label="Category VAT"
        value={form.vat}
        onChange={(e) => setForm({ ...form, vat: e.target.value })}
        placeholder="Category VAT"
        required
      />
      <FileUpload label="Category Image" setFile={setImage} name="image" />
      <PrimaryButton value={"Add Category"} />
    </form>
  );
};

export default AddMainCategory;
