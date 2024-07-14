import React, { useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import PrimaryButton from "../../components/common/PrimaryButton";

const CreateAd = () => {
  const [form, setForm] = useState({
    packageName: "",
    duration: "",
    price: "",
    maxProduct: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    console.log(form);
    setForm({
      packageName: "",
      duration: "",
      price: "",
      maxProduct: "",
      status: "",
    });
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="flex h-screen">
      <section className="flex-1 p-10">
        <form onSubmit={handleAddPackage} className="mb-5">
          <InputField
            label="Package Name"
            id="packageName"
            name="packageName"
            value={form.packageName}
            onChange={handleInputChange}
            placeholder="Enter package name"
            required
          />
          <InputField
            label="Duration"
            id="duration"
            name="duration"
            value={form.duration}
            onChange={handleInputChange}
            placeholder="Enter duration"
            required
          />
          <InputField
            label="Price"
            id="price"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            type="number"
            required
          />
          <InputField
            label="Max Product"
            id="maxProduct"
            name="maxProduct"
            value={form.maxProduct}
            onChange={handleInputChange}
            placeholder="Enter max products"
            type="number"
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
          <PrimaryButton type="submit" value={"Add Package"} />
        </form>
      </section>
    </div>
  );
};

export default CreateAd;
