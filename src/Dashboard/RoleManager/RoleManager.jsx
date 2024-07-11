import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

const RoleManager = () => {
  const roleManager = [
    {
      id: 1,
      role: "Sub Admin",
      email: "kaT@example.com",
      status: "Active",
    },
    {
      id: 2,
      role: "Manager",
      email: "kaT@example.com",
      status: "Active",
    },
  ];

  const header = ["Role", "Email", "Status", "Action"];
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Role Manager</h1>
          <Link to="/admin/add-role">
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
              <FiPlus className="mr-2" /> Add Role Manager
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
            {roleManager.map((voucher) => (
              <tr key={voucher.id} className="border-b border-gray-200">
                <td className="py-4 px-6">{voucher.role}</td>
                <td className="py-4 px-6">{voucher.email}</td>
                <td className="py-4 px-6">{voucher.status}</td>
                <td className="py-4 px-6 flex space-x-2">
                  <button className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    <FiEdit className="mr-1" /> Edit
                  </button>
                  <button className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    <FiTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManager;
