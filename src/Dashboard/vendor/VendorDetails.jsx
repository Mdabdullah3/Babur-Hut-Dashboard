import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import useUserStore from "../../store/AuthStore";
import { SERVER } from "../../config";

const VendorDetails = () => {
  const { id } = useParams();
  const { user, fetchSingleUser } = useUserStore();
  useEffect(() => {
    fetchSingleUser(id);
  }, [fetchSingleUser, id]);
  return (
    <section className="w-11/12 mx-auto my-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl text-gray-700 font-bold">Vendor</h1>
      </div>
      {user ? (
        <>
          <div className="flex items-center justify-between bg-white shadow-md p-6 rounded-lg">
            <div className="flex items-center gap-4 ">
              <img
                src={`${SERVER}${user?.avatar?.secure_url}`}
                alt="vendor"
                className="w-40 h-40 object-cover rounded-full border-4 border-gray-200"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <div className="mt-2">
                  {user?.status === "approved" ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold">
                      Verified
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-semibold">
                      Not Verified
                    </span>
                  )}
                </div>
                {/* <PrimaryButton value="Deactivate" className="mt-4" /> */}
              </div>
            </div>
           
          </div>
          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-lg font-semibold">Personal Info</h1>
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold">City:</span>{" "}
                  {user?.location?.city}
                </p>
                <p>
                  <span className="font-semibold">State:</span>{" "}
                  {user?.location?.state}
                </p>
                <p>
                  <span className="font-semibold">Country:</span>{" "}
                  {user?.location?.country}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {user?.location?.address1}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {user?.phone}
                </p>
                <p>
                  <span className="font-semibold">ID Card Number:</span>{" "}
                  {user?.idCardNumber}
                </p>

                <div className="flex gap-4">
                  <img
                    src={`${SERVER}${user?.idCardFrontPageImage?.secure_url}`}
                    alt="ID Card Front"
                    className="w-32 h-20 object-cover border border-gray-300 rounded"
                  />
                  <img
                    src={`${SERVER}${user?.idCardBackPageImage?.secure_url}`}
                    alt="ID Card Back"
                    className="w-32 h-20 object-cover border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Bank Info</h1>
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold">Bank Name:</span>{" "}
                  {user?.bankName}
                </p>
                <p>
                  <span className="font-semibold">Account Holder Name:</span>{" "}
                  {user?.accountHolderName}
                </p>
                <p>
                  <span className="font-semibold">Account Number:</span>{" "}
                  {user?.accountNumber}
                </p>
                <p>
                  <span className="font-semibold">Routing Number:</span>{" "}
                  {user?.routingNumber}
                </p>
                <p>
                  <span className="font-semibold">Bank Branch:</span>{" "}
                  {user?.bankBranch}
                </p>
                <img
                  src={`${SERVER}${user?.bankStatementImage?.secure_url}`}
                  alt="Bank Statement"
                  className="w-32 h-20 object-cover border border-gray-300 rounded"
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <h1 className="text-center">No Data Found</h1>
      )}
    </section>
  );
};

export default VendorDetails;
