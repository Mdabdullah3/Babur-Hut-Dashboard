import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import useUserStore from "../../store/AuthStore";
import { useEffect } from "react";

const RoleManager = () => {
  const { users, fetchAllUser } = useUserStore();

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  const header = ["Role", "Name", "Email", "Action"];
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
            {users.length > 0 ? (
              <>
                {users?.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200">
                    <td className="py-4 px-6">{user.role}</td>
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6 flex space-x-2">
                      {/* <button className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                        <FiEdit className="mr-1" /> Edit
                      </button> */}
                      <button className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <FiTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <h1 className="text-center text-xl mt-10 text-red-500">
                No Users Found{" "}
              </h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManager;
