import React from "react";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

const Supports = () => {
  const supports = [
    {
      id: 1,
      name: "Jon Smith",
      email: "jonsmit@gmail.com",
      title: "Bad Products",
      message: "very bad products",
    },
  ];
  const header = ["Name", "Email", "Report Type", "Message", "Action"];
  return (
    <section>
      <div>
        <table className="min-w-full bg-white border border-gray-200 mt-10">
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
            {supports?.map((support) => (
              <tr key={support?.id} className="border-b border-gray-200">
                <td className="py-4 px-6">{support.name}</td>
                <td className="py-4 px-6">{support.email}</td>
                <td className="py-4 px-6">{support.title}</td>
                <td className="py-4 px-6">{support.message}</td>
                <td className="py-4 px-6 flex space-x-2">
                  <Link
                    to={`/admin/support-details/${support.id}`}
                    className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/admin/edit-package/${support?._id}`}
                    className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <FiTrash className="mr-1" /> Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Supports;
