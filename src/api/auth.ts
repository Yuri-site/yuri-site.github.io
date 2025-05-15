import axios from 'axios';
import { LoginResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL as string;

// 檢查是否已登入
export const isAuthenticated = (): boolean => {
    return localStorage.getItem("authToken") !== null;
};

// 取得目前登入的使用者資訊（從 localStorage）
export const getCurrentUser = () => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
};

// 登入功能
export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/api/v1/users/login`, {
        username,
        password,
    });

    const { token, user } = response.data;

    // 儲存 token 和使用者資訊
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));

    return response.data;
};

// 登出功能
export const logout = (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
};
