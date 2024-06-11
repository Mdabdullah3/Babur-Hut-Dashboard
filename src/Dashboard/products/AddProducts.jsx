import React, { useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import VideoUpload from "../../components/common/VideoUpload";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import { category } from "../../utils/constant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PrimaryButton from "../../components/common/PrimaryButton";
const AddProducts = () => {
  const [activeVideo, setActiveVideo] = useState("file upload");
  const [form, setForm] = useState({
    videoUrl: "",
    img: [],
    productName: "",
    category: "",
    brand: "",
    background: "",
    description: "",
    colors: [],
    newColor: "",
  });
  const addColorField = () => {
    setForm({ ...form, colors: [...form.colors, form.newColor], newColor: "" });
  };

  const removeColorField = (index) => {
    const updatedColors = [...form.colors];
    updatedColors.splice(index, 1);
    setForm({ ...form, colors: updatedColors });
  };
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
        <h1 className="text-xl text-primary mt-5">Video</h1>
        <div className="flex items-center gap-10 mt-2">
          <div className="flex items-center gap-3">
            <input
              id="video"
              type="radio"
              name="radio-2"
              className="radio radio-primary"
            />
            <label
              htmlFor="video"
              onClick={() => setActiveVideo("file upload")}
            >
              Video Upload
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              id="videoUrl"
              type="radio"
              name="radio-2"
              className="radio radio-primary"
            />
            <label htmlFor="videoUrl" onClick={() => setActiveVideo("url")}>
              Video Url
            </label>
          </div>
        </div>
        <div className="flex mt-5">
          {activeVideo === "file upload" ? (
            <VideoUpload
              label="Upload Your Product Video"
              name="productVideo"
            />
          ) : (
            <InputField
              label="Product Video Url"
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              placeholder="Product Video Url"
            />
          )}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold tracking-wide">
          Product Information
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Having Accurate Product Information Raises Discoverilty
        </p>
        <InputField placeholder="Product Name" value={form.productName} />
        <div className="mt-4">
          <SelectField
            label="Product Category"
            options={category.map((item) => ({
              label: item.name,
              value: item.name,
            }))}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <InputField
            label="Brand Name"
            placeholder="Brand Name"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-wide mt-6">
            Product Highlight
          </h1>
          <p className="text-sm text-gray-500">
            Having Accurate Product Information Raises Discoverilty
          </p>
          <h1 className="flex items-center gap-2 my-4">
            Buyer Promation Image{" "}
            <span className="px-2  border border-sky-500 text-sky-500 text-sm rounded-full">
              !
            </span>
          </h1>
          <h1>White Background Image</h1>
          <p className="text-sm text-gray-500">
            Upload an Image With a White Background
          </p>
          <div className="my-4 flex">
            <FileUpload name="ProductImage" />
          </div>
          <h1>Description</h1>
          <div className="mt-4">
            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
              style={{ height: "400px" }}
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl tracking-wide mt-16 text-primary">
            Variants, Price, Stock
          </h1>
          <div className="mt-3">
            <h1>Product Variants</h1>
            <div className="flex gap-2">
              {form?.colors?.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="rounded-full w-8 h-8"
                    style={{ backgroundColor: color, border: "1px solid #ccc" }}
                  ></div>
                  <span>{color}</span>
                  <button
                    type="button"
                    onClick={() => removeColorField(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <InputField
              placeholder="Color Name"
              value={form.colors}
              onChange={(e) => setForm({ ...form, colors: e.target.value })}
              label="Color Family"
            />
            <PrimaryButton value="Add Color" onClick={addColorField} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProducts;
