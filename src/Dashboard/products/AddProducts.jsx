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
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [form, setForm] = useState({
    videoUrl: "",
    img: [],
    productName: "",
    category: "",
    brand: "",
    background: "",
    description: "",
    colors: colors,
    price: 0,
    promoPrice: 0,
    quantity: 0,
    sku: "",
    warranty: "",
    weight: "",
  });

  const addColorField = () => {
    if (newColor.trim()) {
      setColors((prevColors) => {
        const updatedColors = [...prevColors, newColor];
        return updatedColors;
      });
      setNewColor("");
    }
  };

  const removeColorField = (index) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors.splice(index, 1);
      return updatedColors;
    });
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
              checked={activeVideo === "file upload"}
              onChange={() => setActiveVideo("file upload")}
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
              checked={activeVideo === "url"}
              onChange={() => setActiveVideo("url")}
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
        <InputField
          placeholder="Product Name"
          value={form.productName}
          onChange={(e) => setForm({ ...form, productName: e.target.value })}
        />
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
            Buyer Promotion Image{" "}
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
            <h1>Product Colors</h1>
            <div className="flex gap-4">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2 relative">
                  <div
                    className="rounded-full w-4 h-4"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="">{color}</span>
                  <button
                    type="button"
                    onClick={() => removeColorField(index)}
                    className="text-red-500  absolute -top-2 -right-2"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <InputField
                placeholder="New Color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
              <button
                onClick={addColorField}
                className="px-6 py-3 bg-primary rounded-xl text-white"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-5">
            <h1>
              Price & Stock <span className="text-red-500">*</span>
            </h1>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 items-center mt-5">
              <InputField
                placeholder="BDT"
                type="number"
                label={"Price"}
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <InputField
                placeholder="BDT"
                type="number"
                label="Promo Price"
                value={form.promoPrice}
                onChange={(e) =>
                  setForm({ ...form, promoPrice: e.target.value })
                }
              />
              <InputField
                type="number"
                label="Quantity"
                placeholder="Quantity"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
              <InputField
                label="Seller Sku"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                placeholder={"Seller Sku"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProducts;
