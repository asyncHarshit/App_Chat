import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = "https://app-chat-backend-lyart.vercel.app"; 

export const useAuthStore = create((set,get) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,
    socket : null,
    onlineUsers: [],


    checkAuth : async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser : res.data});
            get().connectSocket();
            
        } catch (error) {
            console.error("Error checking auth use Store", error);
            set({authUser : null});

            
        }
        finally {
            set({isCheckingAuth : false});
        }
    },

    signUp : async (data) => {
        set({isSigningUp : true});
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser : res.data});
            toast.success("Sign Up Sucessfully !")
            get().connectSocket();
        }
        catch (error) {
            console.error("Error signing up", error);
            toast.error(error.response.data.message || "Error signing up");
        }
        finally {
            set({isSigningUp : false});
        }

    },

    login : async (data) => {
        set({isLoggingIn : true});
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({authUser : res.data});
            toast.success("Login Sucessfully !")
            get().connectSocket();
        } catch (error) {
            console.error("Error logging in", error);
            toast.error(error.response.data.message || "Error logging in");
        }
        finally {
            set({isLoggingIn : false});
        }
    },

    logout : async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser : null});
            toast.success("Logout Sucessfully !")
            get().disconnectSocket();
        } catch (error) {
            console.error("Error logging out", error);
            toast.error(error.response.data.message || "Error logging out");
        }
    },

    updateProfile : async (data) => {
        set({isUpdatingProfile : true});
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({authUser : res.data});
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            toast.error(error.response.data.message || "Error updating profile");
        } finally {
            set({isUpdatingProfile : false});
        }
    },

    connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}))