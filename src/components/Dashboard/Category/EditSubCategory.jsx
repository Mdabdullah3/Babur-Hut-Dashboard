import React, { useEffect, useState } from "react";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PrimaryButton from "../../common/PrimaryButton";
import useCategoryStore from "../../../store/categoryStore";
import { useParams } from "react-router-dom";
import { SERVER } from "../../../config";
import { toDataURL } from "../../../utils/DataUrl";
import FileUpload from "../../common/FileUpload";
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

  const categoriesData = [...categories, ...subCategories];

  useEffect(() => {
    if (subCategory?.image?.secure_url) {
      const avatarUrl = `${SERVER}${subCategory.image.secure_url}`;
      toDataURL(avatarUrl).then((base64) => {
        setImage(base64);
      });
    }
  }, [subCategory?.image?.secure_url]);
  const status = [
    {
      id: 1,
      label: "Active",
      value: "active",
    },
    {
      id: 2,
      label: "Inactive",
      value: "inactive",
    },
  ];
  const [form, setForm] = useState({
    category: subCategory?.category || "",
    name: subCategory?.name || "",
    shippingCharge: subCategory?.shippingCharge || "",
    status: subCategory?.status || "",
    commission: subCategory?.commission || "",
    vat: subCategory?.vat || "",
    icon: subCategory?.icon || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSubCategory(id, form);
  };
  const handleImageChange = (img) => {
    setImage(img);
    setForm({ ...form, image: img });
  };
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
      onSubmit={handleSubmit}
    >
      <SelectField
        label="Category"
        options={categoriesData?.map((category) => ({
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
      <InputField
        label="Shipping Charge"
        placeholder="Shippingharge"
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
        placeholder={"Category Commission"}
      />
      <InputField
        label="Category VAT"
        value={form.vat}
        onChange={(e) => setForm({ ...form, vat: e.target.value })}
        placeholder={"Category VAT"}
      />
      <InputField
        label="Category Icon"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
        placeholder="Category Icon"
      />
      <FileUpload
        label="Sub Category Image"
        setFile={handleImageChange}
        name="image"
        file={image}
      />
      <PrimaryButton value={loading ? "Adding..." : "Add Sub Category"} />
    </form>
  );
};

export default EditSubCategory;
