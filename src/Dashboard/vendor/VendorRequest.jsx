import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const VendorRequest = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllVendors = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/users?_filter[role]=vendor`,
        {
          params: {
            _page: 1,
            _limit: 2000,
            _search: "",
            _sort: "createdAt,asc",
          },
          withCredentials: true,
        }
      );
      const pendingVendors = response?.data?.data.filter(
        (vendor) => vendor?.status === "pending"
      );
      setVendors(pendingVendors);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleApprove = async (vendorId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${vendorId}`,
        { status: "approved" },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(`Vendor ${vendorId} approved successfully.`);
      }
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor._id === vendorId ? { ...vendor, status: "approved" } : vendor
        )
      );
    } catch (error) {
      toast.error("Error approving vendor:", error);
      setError("Failed to approve vendor. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllVendors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading vendors: {error}</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold my-6 text-center">
        Pending Vendor Requests
      </h1>
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">Name</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Phone</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Location</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Status</th>
            <th className="py-2 px-4 bg-gray-200 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id} className="border-b">
              <td className="py-2 px-4">{vendor.name}</td>
              <td className="py-2 px-4">{vendor.phone}</td>
              <td className="py-2 px-4">
                {vendor.location.city}, {vendor.location.state},{" "}
                {vendor.location.country}
              </td>
              <td className="py-2 px-4 text-yellow-500">{vendor.status}</td>
              <td className="py-2 px-4 text-center">
                <Link to={`/admin/vendor-details/${vendor?._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-500/70 text-white font-bold py-2 px-4 rounded-lg">
                    Details
                  </button>
                </Link>
                <button
                  onClick={() => handleApprove(vendor._id)}
                  className="bg-green-500 hover:bg-green-500/70 text-white font-bold py-2 px-4 rounded-lg ml-2"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorRequest;
