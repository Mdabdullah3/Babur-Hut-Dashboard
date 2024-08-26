import React, { useState } from "react";
import { toast } from "react-toastify";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PrimaryButton from "../../common/PrimaryButton";
import useVoucherStore from "../../../store/useVoucherStore";

const VendorVoucherCreate = ({ id }) => {
  console.log(id);
  const [form, setForm] = useState({
    user: id,
    redeemCode: "",
    startDate: "",
    endDate: "",
    discount: "",
    status: "",
  });

  const addVoucher = useVoucherStore((state) => state.addVoucher);
  const loading = useVoucherStore((state) => state.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addVoucher(form);
    toast.success("Voucher created successfully!");
    setForm({
      redeemCode: "",
      startDate: "",
      endDate: "",
      discount: "",
      status: "",
    });
  };

  return (
    <section className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            label="Redeem Code"
            value={form.redeemCode}
            placeholder="Enter Redeem Code"
            onChange={(e) => setForm({ ...form, redeemCode: e.target.value })}
            required
          />
          <InputField
            label="Discount"
            value={form.discount}
            placeholder="Enter Discount"
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            required
          />
          <InputField
            label="Start Date"
            type="date"
            value={form.startDate}
            placeholder="Enter Start Date"
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
          <InputField
            label="End Date"
            type="date"
            value={form.endDate}
            placeholder="Enter End Date"
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            required
          />
          <SelectField
            label="Status"
            id="status"
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: "active", label: "Active" },
              { value: "expired", label: "Expired" },
            ]}
            required
          />
        </div>

        <PrimaryButton
          value={loading ? "Loading..." : "Add New Voucher"}
          disabled={loading}
        />
      </form>
    </section>
  );
};

export default VendorVoucherCreate;
