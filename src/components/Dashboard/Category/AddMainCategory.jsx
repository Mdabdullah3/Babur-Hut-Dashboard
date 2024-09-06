import React, { useState, useEffect } from "react";
import InputField from "../../common/InputField";
import PrimaryButton from "../../common/PrimaryButton";
import useCategoryStore from "../../../store/categoryStore";
import FileUpload from "../../common/FileUpload";
import { toast } from "react-toastify";

const AddMainCategory = () => {
  const [image, setImage] = useState(null);
  const { addCategory, loading } = useCategoryStore();
  // const [iconImage, setIconImage] = useState(null);
  // const status = [
  //   { id: 1, label: "Active", value: "active" },
  //   { id: 2, label: "Inactive", value: "inactive" },
  // ];

  const [form, setForm] = useState({
    name: "",
    shippingCharge: "",
    shippingChargeType: "percentage",
    status: "",
    commission: "",
    commissionType: "percentage",
    transactionCost: "",
    transactionCostType: "percentage",
    vat: "",
    vatType: "percentage",
    image: image,
    icon: "",
    // iconImage: iconImage,
    // isHomeShow: false,
  });

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, image }));
  }, [image]);

  const toggleDiscountType = (field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [`${field}Type`]:
        prevForm[`${field}Type`] === "percentage" ? "flat" : "percentage",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCategory(form);
    } catch (error) {
      toast.error("Failed to add category. Please try again.");
    }
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
          label={`Transaction Cost (${
            form.transactionCostType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.transactionCost}
          onChange={(e) =>
            setForm({ ...form, transactionCost: e.target.value })
          }
          placeholder={`Enter ${
            form.transactionCostType === "percentage"
              ? "Percentage"
              : "Flat Amount"
          } Transaction Cost`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("transactionCost")}
        >
          {form.transactionCostType === "percentage" ? "%" : "Flat"}
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
      <FileUpload label="Category Image" setFile={setImage} name="image" />
      {/* <FileUpload label="Icon Image" setFile={setIconImage} name="iconImage" /> */}
      <PrimaryButton
        value={loading ? "Adding..." : "Add Category"}
        disabled={loading}
      />
    </form>
  );
};

export default AddMainCategory;
