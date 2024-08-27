import React, { useEffect, useState } from "react";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PrimaryButton from "../../common/PrimaryButton";
import useCategoryStore from "../../../store/categoryStore";
import FileUpload from "../../common/FileUpload";
import { toast } from "react-toastify";

const AddSubCategory = () => {
  const [image, setImage] = useState(null);

  const {
    categories,
    subCategories,
    fetchCategories,
    fetchSubCategories,
    addSubCategory,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, [fetchCategories, fetchSubCategories]);

  const status = [
    { id: 1, label: "Active", value: "active" },
    { id: 2, label: "Inactive", value: "inactive" },
  ];

  const [form, setForm] = useState({
    category: "",
    name: "",
    shippingCharge: "",
    shippingChargeType: "percentage", // Default to percentage
    transactionCose: "",
    transactionCoseType: "percentage", // Default to percentage
    status: "",
    commission: "",
    commissionType: "percentage", // Default to percentage
    vat: "",
    vatType: "percentage", // Default to percentage
    image: null,
    icon: "",
  });

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, image }));
  }, [image]);

  const categoriesData = [...categories, ...subCategories];

  const toggleDiscountType = (field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [`${field}Type`]:
        prevForm[`${field}Type`] === "percentage" ? "flat" : "percentage",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("category", form.category);
    formData.append("name", form.name);
    formData.append("shippingCharge", form.shippingCharge);
    formData.append("shippingChargeType", form.shippingChargeType);
    formData.append("transactionCose", form.transactionCose);
    formData.append("transactionCoseType", form.transactionCoseType);
    formData.append("status", form.status);
    formData.append("commission", form.commission);
    formData.append("commissionType", form.commissionType);
    formData.append("vat", form.vat);
    formData.append("vatType", form.vatType);
    formData.append("icon", form.icon);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await addSubCategory(formData); 
    } catch (error) {
      toast.error("Failed to add sub category. Please try again.");
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
      onSubmit={handleSubmit}
    >
      <SelectField
        label="Category"
        options={categoriesData.map((category) => ({
          key: category._id,
          label: category.name,
          value: category._id,
        }))}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        value={form.category}
        required
      />
      <InputField
        label="Sub Category Name"
        placeholder="Sub Category Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <div className="flex items-start">
        <InputField
          label={`Shipping Charge (${
            form.shippingChargeType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.shippingCharge}
          onChange={(e) => setForm({ ...form, shippingCharge: e.target.value })}
          placeholder={`Enter ${
            form.shippingChargeType === "percentage"
              ? "Percentage"
              : "Flat Amount"
          } Shipping Charge`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("shippingCharge")}
        >
          {form.shippingChargeType === "percentage" ? "%" : "Flat"}
        </button>
      </div>
      <div className="flex items-start">
        <InputField
          label={`Transaction Cost (${
            form.transactionCoseType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.transactionCose}
          onChange={(e) =>
            setForm({ ...form, transactionCose: e.target.value })
          }
          placeholder={`Enter ${
            form.transactionCoseType === "percentage"
              ? "Percentage"
              : "Flat Amount"
          } Transaction Cost`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("transactionCose")}
        >
          {form.transactionCoseType === "percentage" ? "%" : "Flat"}
        </button>
      </div>
      <div className="flex items-start">
        <InputField
          label={`Category Commission (${
            form.commissionType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.commission}
          onChange={(e) => setForm({ ...form, commission: e.target.value })}
          placeholder={`Enter ${
            form.commissionType === "percentage" ? "Percentage" : "Flat Amount"
          } Commission`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("commission")}
        >
          {form.commissionType === "percentage" ? "%" : "Flat"}
        </button>
      </div>
      <div className="flex items-start">
        <InputField
          label={`Category VAT (${
            form.vatType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.vat}
          onChange={(e) => setForm({ ...form, vat: e.target.value })}
          placeholder={`Enter ${
            form.vatType === "percentage" ? "Percentage" : "Flat Amount"
          } VAT`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("vat")}
        >
          {form.vatType === "percentage" ? "%" : "Flat"}
        </button>
      </div>
      <InputField
        label="Category Icon"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
        placeholder="Category Icon"
      />
      <FileUpload label="Sub Category Image" setFile={setImage} name="image" />
      <PrimaryButton value={"Add Sub Category"} />
    </form>
  );
};

export default AddSubCategory;
