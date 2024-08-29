import React, { useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import PrimaryButton from "../../components/common/PrimaryButton";

const UploadImage = () => {
  const [image, setimage] = useState(null);
  const [MobileImage, setMobileImage] = useState(null);
  const [LogoImage, setLogoImage] = useState(null);
  const [popUpImage, setpopUpImage] = useState(null);
  const [popUpImageMobile, setpopUpImageMobile] = useState(null);

  const [form, setForm] = useState({
    image: image,
    MobileImage: MobileImage,
    LogoImage: LogoImage,
    popUpImage: popUpImage,
    popUpImageMobile: popUpImageMobile,
  });
  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Upload An Image</h1>
      <form action="" className=" space-y-4">
        <FileUpload
          label="Banner Image Upload"
          name="image"
          setFile={setimage}
        />
        <FileUpload
          label="Banner Image For Mobile"
          name="mobileimage"
          setFile={setMobileImage}
        />

        <FileUpload
          label="Logo Image Upload"
          name="logoimage"
          setFile={setLogoImage}
        />
        <FileUpload
          label="Popup Image Upload"
          name="popupimage"
          setFile={setpopUpImage}
        />
        <FileUpload
          label="Popup Image Upload For Mobile"
          name="popupimagemobile"
          setFile={setpopUpImageMobile}
        />
        <PrimaryButton value="Upload" />
      </form>
    </div>
  );
};

export default UploadImage;
