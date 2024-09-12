import React, { useEffect, useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import PrimaryButton from "../../components/common/PrimaryButton";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import useUserStore from "../../store/AuthStore";
const UpdateLogoImage = () => {
  const [LogoImage, setLogoImage] = useState();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      user: user?._id,
      banner: "LogoImage",
      logo: LogoImage || "",
    };

    console.log(requestBody);
    try {
      const response = await axios.post(`${API_URL}/others`, requestBody);
      console.log("Response:", response.data);
      toast.success("Logo Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Upload An Image</h1>
      <form action="" className=" space-y-4" onSubmit={handleSubmit}>
        <FileUpload
          label="Logo Image Upload"
          name="logoimage"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 40px40px"
          setFile={setLogoImage}
        />
        <PrimaryButton value="Upload" />
      </form>
    </div>
  );
};

export default UpdateLogoImage;
