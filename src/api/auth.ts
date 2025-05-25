import axios from 'axios';
import { LoginResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL as string;

// Check if user is Authenticated
export const isAuthenticated = (): boolean => {
    return localStorage.getItem("authToken") !== null;
};

// Get Current user information
export const getCurrentUser = () => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
};

// Login
export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/api/v1/users/login`, {
        username,
        password,
    });

    const { token, user } = response.data;

    // save token and user information
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));

    return response.data;
};

// Logout
export const logout = (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
};
