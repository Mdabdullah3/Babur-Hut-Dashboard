import React, { useEffect, useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import PrimaryButton from "../../components/common/PrimaryButton";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import useUserStore from "../../store/AuthStore";
const UploadImage = () => {
  const [image, setimage] = useState();
  const [MobileImage, setMobileImage] = useState();
  const [LogoImage, setLogoImage] = useState();
  const [popUpImage, setpopUpImage] = useState();
  const [popUpImageMobile, setpopUpImageMobile] = useState();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      user: user?._id,
      banner: "Banner Image",
      image: image || "",
      mobileBanner: MobileImage || "",
      logo: LogoImage || "",
      popupImage: popUpImage || "",
      popupImageMobile: popUpImageMobile || "",
    };

    console.log(requestBody);
    try {
      const response = await axios.post(`${API_URL}/others`, requestBody);
      console.log("Response:", response.data);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Upload An Image</h1>
      <form action="" className=" space-y-4" onSubmit={handleSubmit}>
        <FileUpload
          label="Banner Image Upload"
          name="image"
          setFile={setimage}
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 300px1200px "
        />
        <FileUpload
          label="Banner Image For Mobile"
          name="mobileimage"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 200px400px "
          setFile={setMobileImage}
        />

        <FileUpload
          label="Logo Image Upload"
          name="logoimage"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 40px40px"
          setFile={setLogoImage}
        />
        <FileUpload
          label="Popup Image Upload"
          name="popupimage"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 400px400px"
          setFile={setpopUpImage}
        />
        <FileUpload
          label="Popup Image Upload For Mobile"
          name="popupimagemobile"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 200px200px"
          setFile={setpopUpImageMobile}
        />
        <PrimaryButton value="Upload" />
      </form>
    </div>
  );
};

export default UploadImage;
