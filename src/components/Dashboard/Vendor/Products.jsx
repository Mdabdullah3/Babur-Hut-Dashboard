import React, { useEffect, useState } from "react";
import InputSearch from "../../common/InputSearch";
import TableHead from "../../../components/common/TableHead";
import { SERVER } from "../../../config";

const Products = ({ product }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [activeMenu, setActiveMenu] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(product);

  // const handleMenuClick = (id) => {
  //   setActiveMenu(id);
  // };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const filterProducts = () => {
      let filtered = product;

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return filtered;
    };

    setFilteredProducts(filterProducts());
  }, [searchTerm, product]);

  console.log(filteredProducts);
  const header = ["Image", "Product Name", "Quantity", "Price", "Date"];

  // const menu = [
  //   { id: 1, name: "All", items: vendorProducts.length },
  //   {
  //     id: 2,
  //     name: "Online",
  //     items: vendorProducts.filter((product) => product.status === "approved")
  //       .length,
  //   },
  //   {
  //     id: 3,
  //     name: "Pending",
  //     items: vendorProducts.filter((product) => product.status === "pending")
  //       .length,
  //   },
  //   {
  //     id: 4,
  //     name: "Suspended",
  //     items: vendorProducts.filter((product) => product.status === "suspend")
  //       .length,
  //   },
  //   {
  //     id: 5,
  //     name: "Deleted",
  //     items: vendorProducts.filter((product) => product.status === "delete")
  //       .length,
  //   },
  // ];

  return (
    <section className="py-5">
      <InputSearch
        placeholder="Search For Product.."
        value={searchTerm}
        onChange={(value) => handleSearch(value)}
        onSearch={handleSearch}
      />
      {/* <div className="flex items-center justify-center border-b-2 gap-10 mt-10 flex-wrap">
        {menu.map((item) => (
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
      </div> */}
      <div>
        {filteredProducts?.length === 0 ? (
          <>
            <h1 className="text-center text-red-600 py-4 text-2xl">
              No Products Found
            </h1>
          </>
        ) : (
          <div className="overflow-auto">
            <table className="table-auto w-full  mt-10">
              <TableHead header={header} />
              {filteredProducts?.map((item) => (
                <tbody key={item.id}>
                  <tr className="border-r border-l border-gray-300 border-b">
                    <td>
                      <img
                        className="w-20 h-20 mx-auto"
                        src={`${SERVER}${item?.coverPhoto?.secure_url}`}
                        alt={item.name.slice(0, 5)}
                      />
                    </td>
                    <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                      {item.name.slice(0, 10)}..
                    </td>
                    <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                      {item.quantity}
                    </td>
                    <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                      {item.price}
                    </td>

                    <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                      {item.createdAt}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
