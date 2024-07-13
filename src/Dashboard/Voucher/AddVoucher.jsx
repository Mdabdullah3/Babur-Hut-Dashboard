import React, { useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import PrimaryButton from "../../components/common/PrimaryButton";

const AddNewVoucher = () => {
  const [form, setForm] = useState({
    voucherCode: "",
    strdate: "",
    enddate: "",
    discount: "",
    status: "",
  });
  return (
    <section className="mt-5">
      <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            label="Voucher Code"
            value={form.voucherId}
            placeholder="Enter Voucher Code"
            onChange={(e) => setForm({ ...form, voucherId: e.target.value })}
            required
          />
          <InputField
            label="Discount"
            value={form.discount}
            placeholder="Enter Disocunt"
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            required
          />
          <InputField
            label="Start Date"
            type="date"
            value={form.strdate}
            placeholder="Enter Start Date"
            onChange={(e) => setForm({ ...form, strdate: e.target.value })}
            required
          />
          <InputField
            label="End Date"
            type="date"
            value={form.enddate}
            placeholder="Enter End Date"
            onChange={(e) => setForm({ ...form, enddate: e.target.value })}
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
              { value: "Expired", label: "Expired" },
            ]}
            required
          />
        </div>

        <PrimaryButton value="Add New Voucher" />
      </form>
    </section>
  );
};

export default AddNewVoucher;
