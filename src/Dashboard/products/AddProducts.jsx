import React, { useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import VideoUpload from "../../components/common/VideoUpload";
import InputField from "../../components/common/InputField";
const AddProducts = () => {
  const [activeVideo, setActiveVideo] = useState("file upload");
  const [form, setForm] = useState({
    videoUrl: "",
    img: [],
    productName: "",
  });
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
        <p className="text-sm text-gray-500">
          Having Accurate Product Information Raises Discoverilty
        </p>
        <InputField placeholder="Product Name" value={form.productName} />
      </div>
    </section>
  );
};

export default AddProducts;
