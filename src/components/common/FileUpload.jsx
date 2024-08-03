import React, { useState } from "react";

const FileUpload = ({ label, name, acceptType, setFile, file }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const accept = acceptType === "video" ? "video/*" : "image/*";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFile(null);
  };

  return (
    <div>
      <div>
        <label className="block font-semibold text-secondary mb-1">
          {label}
        </label>
        {selectedFile || file ? (
          <div className="relative">
            {accept === "image/*" ? (
              <img
                src={selectedFile || file}
                alt="Selected"
                className="w-32 h-32 rounded-md"
              />
            ) : accept === "video/*" ? (
              <video
                src={selectedFile || file}
                controls
                className="w-32 h-32 rounded-md"
              />
            ) : null}
            <button
              className="absolute -top-7 left-28 m-2 text-red-600 font-bold rounded-full p-1"
              onClick={handleRemoveFile}
            >
              ×
            </button>
          </div>
        ) : (
          <div className="flex w-full  items-center justify-center ">
            <label className="w-56 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
                id="file-upload"
                name={name}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
