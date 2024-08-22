import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const useShippingStore = create((set, get) => ({
    shippingCharges: {}, // Store shipping charges
    loading: false,
    error: null,

    // Function to fetch current shipping charges
    fetchShippingCharges: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/delivery-fees?_limit=64`, {
                withCredentials: true,
            });
            // Initialize shippingCharges with fetched data
            const charges = response.data?.data.reduce((acc, item) => {
                acc[item.district] = item.deliveryFee;
                return acc;
            }, {});
            set({ shippingCharges: charges, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch shipping charges', loading: false });
        }
    },

    // Function to update multiple shipping charges
    updateMultipleShippingCharges: async (updates) => {
        set({ loading: true, error: null });
        try {
            const updatePromises = updates.map(({ district, deliveryFee }) =>
                axios.patch(`${API_URL}/delivery-fees`,
                    { district, deliveryFee },
                    { withCredentials: true }
                ));

            await Promise.all(updatePromises);
            toast.success("Shipping charges updated successfully!");

            // Optionally refetch the shipping charges to refresh the state
            get().fetchShippingCharges();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update shipping charges");
            set({ loading: false });
        }
    },
}));

export default useShippingStore;
