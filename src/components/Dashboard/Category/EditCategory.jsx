import React, { useEffect, useState } from "react";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PrimaryButton from "../../common/PrimaryButton";
import useCategoryStore from "../../../store/categoryStore";
import { useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const { fetchCategoryById, category, updateCategory, loading } =
    useCategoryStore();
  const status = [
    { id: 1, label: "Active", value: "active" },
    { id: 2, label: "Inactive", value: "inactive" },
  ];
  useEffect(() => {
    fetchCategoryById(id);
  }, [fetchCategoryById]);

  const [form, setForm] = useState({
    name: category?.name || "",
    shippingCharge: category?.shippingCharge || "",
    status: category?.status || "",
    commission: category?.commission || "",
    vat: category?.vat || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(id, form);
  };

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
      <div></div>
      <PrimaryButton value={loading ? "Updating..." : "Update Category"} />
    </form>
  );
};

export default EditCategory;