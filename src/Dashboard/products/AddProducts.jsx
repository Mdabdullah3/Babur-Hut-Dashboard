import React from "react";
import FileUpload from "../../components/common/FileUpload";

const AddProducts = () => {
  return (
    <section className="mt-5">
      <h1 className="text-2xl font-bold tracking-wider">Basic Information</h1>
      <div className="mt-10">
        <h1 className="text-xl text-primary">Product Image</h1>
        <p className="text-gray-500">
          Your product image is the first thing customers will see.
        </p>
        <div className="flex flex-wrap gap-4 mt-3">
          <FileUpload label="Top Image" name="ProductImage" />
          <FileUpload label="Product Image 1" name="ProductImage" />
          <FileUpload label="Product Image 2" name="ProductImage" />
        </div>
      </div>
    </section>
  );
};

export default AddProducts;
