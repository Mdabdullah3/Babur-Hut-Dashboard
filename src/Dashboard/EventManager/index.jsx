import React from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const EventManager = () => {
  const events = [
    {
      id: 1,
      name: "99 Offer",
      banner: "",
      startDate: "23/1/2024",
      endDate: "24/1/2024",
      status: "active",
      products: [
        {
          id: "123412414141411",
        },
        {
          id: "23512351252",
        },
      ],
    },
  ];
  const header = [
    "Event Name",
    "Image",
    "Product Count",
    "Start Date",
    "End Date",
    "Status",
    "Action",
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Event Manager</h1>
          <Link to="/admin/create-event">
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/60">
              <FiPlus className="mr-2" /> Add New Event
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
            {events?.map((event) => (
              <tr key={event.id} className="border-b border-gray-200">
                <td className="py-4 px-6">{event.name}</td>
                <td className="py-4 px-6">{event.banner}</td>
                <td className="py-4 px-6">{event?.products.length}</td>
                <td className="py-4 px-6">{event?.startDate}</td>
                <td className="py-4 px-6">{event?.endDate}</td>
                <td className="py-4 px-6">{event?.status}</td>
                <td className="py-4 px-6 flex space-x-2">
                  <Link
                    to={`/admin/edit-event/${event.id}`}
                    className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManager;
