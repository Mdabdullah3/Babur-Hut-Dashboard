import React, { useState } from "react";
import SelectField from "../../components/common/SelectField";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

const AddRole = () => {
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

        <PrimaryButton value="Add New Voucher" />
      </form>
    </section>
  );
};

export default AddRole;
