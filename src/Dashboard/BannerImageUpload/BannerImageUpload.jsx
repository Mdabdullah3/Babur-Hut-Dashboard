import React from "react";
import { FaTrash } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const BannerImageUpload = () => {
  const header = ["Image", "Action"];
  const bannerImg = [
    {
      _id: 1,
      img: "https://fabrilife.com/image-gallery/663c8117d711e.jpg",
    },
  ];
  return (
    <section>
      <div className="flex h-screen">
        <div className="flex-1 p-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold">Banner Image</h1>
            <Link to="/admin/banner-img-upload">
              <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/80">
                <FiPlus className="mr-2" /> Upload Image
              </button>
            </Link>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {header.map((head, index) => (
                  <th
                    key={index}
                    className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bannerImg?.map((img) => (
                <tr key={img?._id} className="border-b border-gray-200">
                  <td className="py-4 px-6">
                    <img src={img?.img} alt="" />
                  </td>
                  <td className="py-4 px-6 flex space-x-2">
                    <div className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                      <FaTrash className="mr-1" /> Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BannerImageUpload;
