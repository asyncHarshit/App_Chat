import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL : "https://app-chat-backend-lyart.vercel.app/api",
    withCredentials: true,
})