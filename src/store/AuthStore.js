import create from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const useUserStore = create((set, get) => ({
    user: null,
    users: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchTerm: '',
    sortField: 'createdAt',
    sortOrder: 'asc',
    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
            set({ user: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    fetchAllUser: async (page = 1, limit = 2000, searchTerm = '', sortField = 'createdAt', sortOrder = 'asc') => {
        set({ loading: true, error: null, searchTerm, sortField, sortOrder });
        try {
            const response = await axios.get(`${API_URL}/users?_filter[role]=vendor`, {
                params: {
                    _page: page,
                    _limit: limit,
                    _search: searchTerm,
                    _sort: `${sortField},${sortOrder}`
                },
                withCredentials: true
            });
            set({
                users: response.data.data,
                loading: false,
                currentPage: page,
                totalPages: response.data.totalPages
            });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    fetchAdminUser: async (page = 1, limit = 2000, searchTerm = '', sortField = 'createdAt', sortOrder = 'asc') => {
        set({ loading: true, error: null, searchTerm, sortField, sortOrder });
        try {
            const response = await axios.get(`${API_URL}/users?_filter[role]=admin`, {
                params: {
                    _page: page,
                    _limit: limit,
                    _search: searchTerm,
                    _sort: `${sortField},${sortOrder}`
                },
                withCredentials: true
            });
            set({
                users: response.data.data,
                loading: false,
                currentPage: page,
                totalPages: response.data.totalPages
            });
        } catch (error) {
            set({ error: error.message, loading: false });

        }
    },
    updateUser: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/users/me`, userData, {
                withCredentials: true,
            });
            set({ user: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
            set({ user: null, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    login: async (email, password, router) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
            if (response?.data?.data?.role === "admin") {
                await get().fetchUser();
                toast.success('Login successful');
                router('/admin');
                console.log(response?.data?.data?.role)
            } else {
                toast.error('Login failed. Please try again.');
                set({ loading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            set({ loading: false });
        }
    },
    register: async (formData) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/auth/register`, formData);
            if (response.status === 201) {
                toast.success('Admin Registration successful!');
            } else {
                toast.error('Registration failed. Please try again.');
            }
            console.log(response);
            set({ isLoading: false });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
            set({ isLoading: false });
        }
    },
    setSearchTerm: (term) => {
        set({ searchTerm: term });
        get().fetchAllUser(1, 10, term, get().sortField, get().sortOrder);
    },

    setPage: (page) => {
        get().fetchAllUser(page, 10, get().searchTerm, get().sortField, get().sortOrder);
    },

    setSortField: (field) => {
        const order = get().sortOrder === 'asc' ? 'desc' : 'asc';
        set({ sortField: field, sortOrder: order });
        get().fetchAllUser(1, 4, get().searchTerm, field, order);
    },
    deleteUser: async (userId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/users/${userId}`, { withCredentials: true });
            toast.success('User deleted successfully!');
            get().fetchAllUser();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete user');
            set({ loading: false });
        }
    },
}));

export default useUserStore;
