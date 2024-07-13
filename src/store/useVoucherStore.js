import create from "zustand";
import axios from "axios";
import { API_URL } from "../config";

const useVoucherStore = create((set) => ({
    vouchers: [],
    loading: false,
    error: null,

    fetchVouchers: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_URL}/vouchers`, { withCredentials: true });
            set({ vouchers: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },

    addVoucher: async (voucher) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${API_URL}/vouchers`, voucher, { withCredentials: true });
            set((state) => ({
                vouchers: [...state.vouchers, response.data.data],
                loading: false,
            }));
            console.log(response);
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },

    deleteVoucher: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${API_URL}/vouchers/${id}`, { withCredentials: true });
            set((state) => ({
                vouchers: state.vouchers.filter((voucher) => voucher.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },
}));

export default useVoucherStore;
