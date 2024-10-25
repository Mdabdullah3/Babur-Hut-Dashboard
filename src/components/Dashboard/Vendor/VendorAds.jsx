import React, { useEffect, useState } from "react";
import TableHead from "../../common/TableHead";
import usePackageStore from "../../../store/PackageStore";

const VendorAds = ({ id }) => {
  const [activeMenu, setActiveMenu] = useState(1);
  const { packages, fetchPackages } = usePackageStore();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages, id]);
  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };
  const filteredPackages = packages?.filter((pack) =>
    pack?.packageProducts?.some((packageProduct) => packageProduct?.user === id)
  );
  const header = ["Ads Name", "Payment", "Max Product", "Date", "Status"];
  const menu = [
    {
      id: 1,
      name: "All",
      items: filteredPackages?.length,
    },
  ];

  console.log(filteredPackages);

  // Filtered ads based on the active menu

  return (
    <section className="w-11/12 mx-auto">
      <div className="flex items-center justify-center border-b-2 gap-10 my-10">
        {menu?.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`font-bold pb-2 ${
              activeMenu === item.id
                ? "text-primary border-b-2 border-primary"
                : ""
            }`}
          >
            {item.name} ({item.items})
          </button>
        ))}
      </div>
      {filteredPackages?.length !== 0 ? (
        <div className=" overflow-auto">
          <TableHead header={header} />
          {filteredPackages?.map((item) => (
            <tbody key={item?._id}>
              <tr className="border-r border-l border-gray-300 border-b">
                <td className="text-center text-dark font-medium text-secondary py-5 capitalize text-sm bg-transparent border-b border-l border-r border-gray-300">
                  {item?.name}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                  {item?.price}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                  {item?.maxProduct}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  Joined: {new Date(item?.createdAt).toDateString()} End Date:{" "}
                  {new Date(item?.endDate).toDateString()}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  {item?.status}
                </td>
              </tr>
            </tbody>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl font-bold text-red-500">
          No Ads found
        </div>
      )}
    </section>
  );
};

export default VendorAds;
