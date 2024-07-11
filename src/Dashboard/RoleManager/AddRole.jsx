import React, { useState } from "react";
import SelectField from "../../components/common/SelectField";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

const AddRole = () => {
  const [selectedField, setSelectedField] = useState("");
  const menu = [
    {
      name: "Vendor",
      status: false,
    },
    {
      name: "Customer",
      status: false,
    },
    {
      name: "Categories",
      status: false,
    },
    {
      name: "Products",
      status: false,
    },
    {
      name: "Orders & Reviews",
      status: false,
    },
    {
      name: "Vouchers",
      status: false,
    },
    {
      name: "Ad Manager",
      status: false,
    },
    {
      name: "Role Manager",
      status: false,
    },
    {
      name: "Message Center",
      status: false,
    },
    {
      name: "Finance",
      status: false,
    },
    {
      name: "Shipment",
      status: false,
    },
    {
      name: "Support",
      status: false,
    },
    {
      name: "Event Manager",
      status: false,
    },
    {
      name: "Email & Message",
      status: false,
    },
  ];
  const [form, setForm] = useState({
    role: "",
    email: "",
    status: "",
    password: "",
  });
  return (
    <section className="mt-5">
      <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            label="Role Name"
            value={form.role}
            placeholder="Enter Role Name"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          />

          <SelectField
            label="Status"
            id="status"
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: "Active", label: "Active" },
              { value: "Disable", label: "Disable" },
            ]}
            required
          />
          <InputField
            label="Email"
            value={form.email}
            placeholder="Enter Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <InputField
            label="Password"
            value={form.password}
            placeholder="Enter Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <div className="my-4">
          <h1>Allow Permission</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {menu.map((item) => (
              <div key={item.name} className="flex items-center">
                <input
                  type="checkbox"
                  id={item.name}
                  name={item.name}
                  value={item.name}
                  onChange={(e) => {
                    const newMenu = [...menu];
                    newMenu.map((menu) => {
                      if (menu.name === e.target.name) {
                        menu.status = e.target.checked;
                      }
                      return menu;
                    });
                    setForm({ ...form, menu: newMenu });
                  }}
                />
                <label htmlFor={item.name} className="ml-2">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <PrimaryButton value="Add Role Manager" />
      </form>
    </section>
  );
};

export default AddRole;
