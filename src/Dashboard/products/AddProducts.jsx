import React, { useRef, useState, useEffect } from "react";
import FileUpload from "../../components/common/FileUpload";
import VideoUpload from "../../components/common/VideoUpload";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import { category } from "../../utils/constant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PrimaryButton from "../../components/common/PrimaryButton";
import { toast } from "react-toastify";
import useProductStore from "../../store/ProductStore";

const AddProducts = () => {
  const [activeVideo, setActiveVideo] = useState("file upload");
  const [activeStep, setActiveStep] = useState(0);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { addProduct } = useProductStore();
  const [productType, setProductType] = useState("electronics");
  const [form, setForm] = useState({
    videoUrl: "",
    user: "668bd330bf220f4fa9a60c31",
    img: [image1, image2, image3].filter(Boolean),
    productName: "",
    category: "pant",
    brand: "niki",
    coverPhoto: coverImage,
    description: "",
    price: 0,
    promoPrice: 0,
    quantity: 0,
    sku: "",
    warranty: "",
    packageWeight: "",
    packageDimensionLength: "",
    packageDimensionWidth: "",
    packageDimensionHeight: "",
  });

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      img: [image1, image2, image3].filter(Boolean),
      coverPhoto: coverImage,
    }));
  }, [image1, image2, image3, coverImage]);

  useEffect(() => {
    if (productType === "electronics") {
      setForm((prevForm) => ({
        ...prevForm,
        Processor: "",
        Memory: "",
        Ram: "",
        DisplayType: "",
        Model: "",
        CameraFront: "",
        Battery: "",
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        Size: "",
        Material: "",
        Color: "",
      }));
    }
  }, [productType]);

  const warrantyType = [
    {
      id: 1,
      label: "Seller Warranty",
      value: "Seller Warranty",
      duration: "1 Year",
    },
    {
      id: 2,
      label: "Brand Warranty",
      value: "Brand Warranty",
      duration: "1 Year",
    },
    {
      id: 3,
      label: "No Warranty",
      value: "No Warranty",
    },
  ];

  const formRefs = {
    basicInfo: useRef(null),
    description: useRef(null),
    variants: useRef(null),
    serviceWarranty: useRef(null),
  };

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      vendorId: "12133a5f-0b0d-4d5b-9b5c-0b0d4d5b9b5c",
      user: form.user,
      name: form.productName,
      slug: form.productName.toLowerCase().split(" ").join("-"),
      price: form.price,
      quantity: form.quantity,
      summary: form.description.slice(0, 150),
      description: form.description,
      category: form.category,
      brand: form.brand,
      coverPhoto: form.coverPhoto,
      images: form.img.map((file) => `${file}`),
      video: activeVideo === "file upload" ? form.videoFile : form.videoUrl,
      videoType: activeVideo === "file upload" ? "file" : "url",
      ...(productType === "electronics"
        ? {
            Processor: form.Processor,
            Memory: form.Memory,
            Ram: form.Ram,
            DisplayType: form.DisplayType,
            Model: form.Model,
            CameraFront: form.CameraFront,
            Battery: form.Battery,
          }
        : {
            Size: form.Size,
            Material: form.Material,
            Color: form.Color,
          }),
    };

    try {
      await addProduct(formData);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  console.log(form);

  const renderAdditionalFields = () => {
    if (productType === "electronics") {
      return (
        <>
          <InputField
            label="Processor"
            placeholder="Processor"
            value={form.Processor}
            onChange={(e) => setForm({ ...form, Processor: e.target.value })}
          />
          <InputField
            label="Memory"
            placeholder="Memory"
            value={form.Memory}
            onChange={(e) => setForm({ ...form, Memory: e.target.value })}
          />
          <InputField
            label="RAM"
            placeholder="RAM"
            value={form.Ram}
            onChange={(e) => setForm({ ...form, Ram: e.target.value })}
          />
          <InputField
            label="Display Type"
            placeholder="Display Type"
            value={form.DisplayType}
            onChange={(e) => setForm({ ...form, DisplayType: e.target.value })}
          />
          <InputField
            label="Model"
            placeholder="Model"
            value={form.Model}
            onChange={(e) => setForm({ ...form, Model: e.target.value })}
          />
          <InputField
            label="Camera Front"
            placeholder="Camera Front"
            value={form.CameraFront}
            onChange={(e) => setForm({ ...form, CameraFront: e.target.value })}
          />
          <InputField
            label="Battery"
            placeholder="Battery"
            value={form.Battery}
            onChange={(e) => setForm({ ...form, Battery: e.target.value })}
          />
        </>
      );
    } else {
      return (
        <>
          <InputField
            label="Size"
            placeholder="Size"
            value={form.Size}
            onChange={(e) => setForm({ ...form, Size: e.target.value })}
          />
          <InputField
            label="Material"
            placeholder="Material"
            value={form.Material}
            onChange={(e) => setForm({ ...form, Material: e.target.value })}
          />
          <InputField
            label="Color"
            placeholder="Color"
            value={form.Color}
            onChange={(e) => setForm({ ...form, Color: e.target.value })}
          />
        </>
      );
    }
  };

  return (
    <section className="mt-5 lg:grid grid-cols-5 relative">
      <form className="col-span-4 w-11/12" onSubmit={handleSubmit}>
        <div ref={formRefs.basicInfo}>
          <h1 className="text-2xl font-bold tracking-wider">
            Basic Information
          </h1>
          <div className="mt-5">
            <SelectField
              label="Product Type"
              options={[
                { label: "Electronics", value: "electronics" },
                { label: "Normal", value: "normal" },
              ]}
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
            <h1 className="text-xl text-primary">Product Image</h1>
            <p className="text-gray-500">
              Your product image is the first thing customers will see.
            </p>
            <div className="my-4 flex">
              <FileUpload
                label="cover"
                name="coverPhoto"
                setFile={setCoverImage}
              />
            </div>
            <div className="flex space-x-4">
              <FileUpload label="Image1" name="img1" setFile={setImage1} />
              <FileUpload label="Image2" name="img2" setFile={setImage2} />
              <FileUpload label="Image3" name="img3" setFile={setImage3} />
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
                  onChange={(e) =>
                    setForm({ ...form, videoUrl: e.target.value })
                  }
                  placeholder="Product Video Url"
                />
              )}
            </div>
          </div>
          <section className="mt-10">
            <h1 className="text-2xl font-bold tracking-wide">
              Product Information
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Enter the basic details about your product
            </p>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <InputField
                label="Product Name"
                placeholder="Product Name"
                value={form.productName}
                onChange={(e) =>
                  setForm({ ...form, productName: e.target.value })
                }
              />
              <SelectField
                label="Category"
                options={category}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <InputField
                label="Brand"
                placeholder="Brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
            </div>
          </section>
          <section ref={formRefs.description}>
            <h1 className="text-2xl font-bold tracking-wider mt-10">
              Description
            </h1>
            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
              placeholder="Write something amazing..."
              className="mt-4 mb-8 h-60"
            />
          </section>
          <section ref={formRefs.variants}>
            <h1 className="text-2xl font-bold tracking-wider pt-10">
              Price & Variants
            </h1>

            <div className="grid grid-cols-3 gap-5 mt-5">
              <InputField
                label="Quantity"
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
              <InputField
                label="SKU"
                placeholder="SKU"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
              />
              <InputField
                label="Price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <InputField
                label="Promo Price"
                type="number"
                placeholder="Promo Price"
                value={form.promoPrice}
                onChange={(e) =>
                  setForm({ ...form, promoPrice: e.target.value })
                }
              />
            </div>
            {renderAdditionalFields()}
          </section>
        </div>

        <section ref={formRefs.serviceWarranty}>
          <h1 className="text-2xl font-bold tracking-wider mt-10">
            Service & Warranty
          </h1>
          <SelectField
            label="Warranty Type"
            options={warrantyType}
            value={form.warranty}
            onChange={(e) => setForm({ ...form, warranty: e.target.value })}
          />
          <div className="grid grid-cols-3 gap-5 mt-5">
            <InputField
              label="Package Weight (kg)"
              placeholder="Package Weight"
              value={form.packageWeight}
              onChange={(e) =>
                setForm({ ...form, packageWeight: e.target.value })
              }
            />
            <InputField
              label="Length (cm)"
              placeholder="Length"
              value={form.packageDimensionLength}
              onChange={(e) =>
                setForm({
                  ...form,
                  packageDimensionLength: e.target.value,
                })
              }
            />
            <InputField
              label="Width (cm)"
              placeholder="Width"
              value={form.packageDimensionWidth}
              onChange={(e) =>
                setForm({ ...form, packageDimensionWidth: e.target.value })
              }
            />
            <InputField
              label="Height (cm)"
              placeholder="Height"
              value={form.packageDimensionHeight}
              onChange={(e) =>
                setForm({
                  ...form,
                  packageDimensionHeight: e.target.value,
                })
              }
            />
          </div>
        </section>
        <div className="mt-4">
          <PrimaryButton type="submit" value="Add Product" />
        </div>
      </form>
      <section className="sticky top-24 h-72 cursor-pointer hidden lg:block">
        <ul className="steps steps-vertical">
          <li
            className={"step " + (activeStep === 0 ? "step-primary" : "")}
            onClick={() => {
              setActiveStep(0);
              scrollToSection(formRefs.basicInfo);
            }}
          >
            Basic Information
          </li>
          <li
            className={"step " + (activeStep === 1 ? "step-primary" : "")}
            onClick={() => {
              setActiveStep(1);
              scrollToSection(formRefs.description);
            }}
          >
            Description
          </li>
          <li
            className={"step " + (activeStep === 2 ? "step-primary" : "")}
            onClick={() => {
              setActiveStep(2);
              scrollToSection(formRefs.variants);
            }}
          >
            Variants, Price, Stock
          </li>
          <li
            className={"step " + (activeStep === 3 ? "step-primary" : "")}
            onClick={() => {
              setActiveStep(3);
              scrollToSection(formRefs.serviceWarranty);
            }}
          >
            Service & Warranty
          </li>
        </ul>
      </section>
    </section>
  );
};

export default AddProducts;
