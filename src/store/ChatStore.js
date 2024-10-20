import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";

const useChatStore = create((set) => ({
    chats: [],

    fetchChats: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/reports?chatsOnly=true`, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    },
    sendMessage: async (message) => {
        try {
            const response = await axios.post(`${API_URL}/api/reports`, message, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
            toast.success('Message sent successfully!');
        } catch (error) {
            toast.error('Failed to send message:', error);
        }
    },
    updateMessage: async (message, id) => {
        try {
            const response = await axios.patch(`${API_URL}/api/reports/${message.id}`, message, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
            toast.success('Message updated successfully!');
        } catch (error) {
            toast.error('Failed to update message:', error);
        }
    },
    deleteMessage: async (message, id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/reports/${message.id}`, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
            toast.success('Message deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete message:', error);
        }
    },
    singleMessage: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/api/reports/${id}`, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
        } catch (error) {
            toast.error('Failed to fetch message:', error);
        }
    },
    loadUserChats: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/api/users/${id}/chats`, {
                withCredentials: true,
            });
            const chatsData = response.data.data.chats;
            set({ chats: chatsData });
        } catch (error) {
            toast.error('Failed to fetch chats:', error);
        }
    },
}));

export default useChatStore;
