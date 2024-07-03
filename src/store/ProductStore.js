import create from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
    products: [],
    product: null,
    totalProducts: 0,
    loading: false,
    error: null,

    fetchProducts: async (query) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/api/products`, { params: query });
            set({ products: response.data.data, totalProducts: response.data.total, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchProductByIdOrSlug: async (idOrSlug) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/api/products/${idOrSlug}`);
            set({ product: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addProduct: async (productData) => {
        set({ loading: true });
        try {
            const response = await axios.post(`/api/products`, productData);
            set((state) => ({ products: [...state.products, response.data.data], loading: false }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    updateProduct: async (idOrSlug, productData) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`/api/products/${idOrSlug}`, productData);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === idOrSlug || product.slug === idOrSlug ? response.data.data : product),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    deleteProduct: async (idOrSlug) => {
        set({ loading: true });
        try {
            await axios.delete(`/api/products/${idOrSlug}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== idOrSlug && product.slug !== idOrSlug),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useProductStore;
