import axios from 'axios';
import { LoginResponse } from '../types';
const API_URL = import.meta.env.VITE_API_URL as string;

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("authToken");
    return token != null;
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
        username,
        password
    });
    return response.data;
};

export const logout = (): void => {
    localStorage.removeItem("authToken");
};


