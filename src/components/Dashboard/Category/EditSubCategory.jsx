import React, { useEffect, useState } from "react";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PrimaryButton from "../../common/PrimaryButton";
import useCategoryStore from "../../../store/categoryStore";
import { useParams } from "react-router-dom";
import { SERVER } from "../../../config";
import { toDataURL } from "../../../utils/DataUrl";
import FileUpload from "../../common/FileUpload";
import { toast } from "react-toastify";

const EditSubCategory = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  const {
    updateSubCategory,
    subCategory,
    loading,
    categories,
    subCategories,
    fetchSubCategoryById,
    fetchCategories,
    fetchSubCategories,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchSubCategoryById(id);
  }, [fetchCategories, fetchSubCategories, fetchSubCategoryById, id]);

  useEffect(() => {
    if (subCategory?.image?.secure_url) {
      const avatarUrl = `${SERVER}${subCategory.image.secure_url}`;
      toDataURL(avatarUrl).then((base64) => {
        setImage(base64);
      });
    }
  }, [subCategory?.image?.secure_url]);

  const [form, setForm] = useState({
    category: "",
    name: "",
    shippingCharge: "",
    shippingChargeType: "percentage",
    transactionCost: "",
    transactionCostType: "percentage",
    status: "",
    commission: "",
    commissionType: "percentage",
    vat: "",
    vatType: "percentage",
    image: null,
    icon: "",
  });

  useEffect(() => {
    if (subCategory) {
      setForm({
        category: subCategory.category || "",
        name: subCategory.name || "",
        shippingCharge: subCategory.shippingCharge || "",
        shippingChargeType: subCategory.shippingChargeType || "percentage",
        transactionCost: subCategory.transactionCost || "",
        transactionCostType: subCategory.transactionCostType || "percentage",
        status: subCategory.status || "",
        commission: subCategory.commission || "",
        commissionType: subCategory.commissionType || "percentage",
        vat: subCategory.vat || "",
        vatType: subCategory.vatType || "percentage",
        image: subCategory.image?.secure_url || null,
        icon: subCategory.icon || "",
      });
    }
  }, [subCategory]);

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
    try {
      await updateSubCategory(id, form);
    } catch (error) {
      toast.error("Failed to update sub category. Please try again.");
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
      <FileUpload
        label="Sub Category Image"
        setFile={setImage}
        file={image}
        name="image"
      />
      <PrimaryButton
        value={loading ? "Updating..." : "Update Sub Category"}
        disabled={loading}
      />
    </form>
  );
};

export default EditSubCategory;
