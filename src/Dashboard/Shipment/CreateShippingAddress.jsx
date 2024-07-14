import React, { useState } from "react";
import { District } from "../../utils/constant";

const CreateShippingAddress = () => {
  const [bdDistricts] = useState(District);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [shippingCharges, setShippingCharges] = useState({});

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDistricts(bdDistricts.map((district) => district.name));
    } else {
      setSelectedDistricts([]);
    }
  };

  const handleSelectDistrict = (e, districtName) => {
    if (e.target.checked) {
      setSelectedDistricts([...selectedDistricts, districtName]);
    } else {
      setSelectedDistricts(
        selectedDistricts.filter((name) => name !== districtName)
      );
    }
  };

  const handleShippingChargeChange = (e, districtName) => {
    const charge = e.target.value;
    if (selectedDistricts.length === bdDistricts.length) {
      const newCharges = {};
      bdDistricts.forEach((district) => {
        newCharges[district.name] = charge;
      });
      setShippingCharges(newCharges);
    } else {
      setShippingCharges({
        ...shippingCharges,
        [districtName]: charge,
      });
    }
  };

  const handleSubmit = () => {
    const selectedWithCharges = selectedDistricts.map((name) => ({
      district: name,
      shippingCharge: shippingCharges[name] || 0,
    }));
    console.log("Selected Districts with Charges:", selectedWithCharges);
  };

  const header = ["No", "District", "Shipping Charge", "Action"];

  return (
    <div className="container mx-auto mt-8">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedDistricts.length === bdDistricts.length}
              />
            </th>
            {header.map((head, index) => (
              <th key={index} className="border px-4 py-2">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bdDistricts.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectDistrict(e, item.name)}
                  checked={selectedDistricts.includes(item.name)}
                />
              </td>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{item.name}</td>
              <td className="border px-4 py-2 text-center">
                <input
                  type="number"
                  value={shippingCharges[item.name] || ""}
                  onChange={(e) => handleShippingChargeChange(e, item.name)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateShippingAddress;
