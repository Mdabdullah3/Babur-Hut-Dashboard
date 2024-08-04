import React, { useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import PrimaryButton from "../../components/common/PrimaryButton";

const UploadImage = () => {
  const [image, setimage] = useState(null);
  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Upload An Image</h1>
      <form action="" className=" space-y-4">
        <FileUpload
          label="Banner Image Upload"
          name="image"
          setFile={setimage}
        />
        <PrimaryButton value="Upload" />
      </form>
    </div>
  );
};

export default UploadImage;
