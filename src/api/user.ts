import axios from "axios";
import { User, NewUserInput } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

// Get all users
export const fetchUsers = async (): Promise<User[]> => {
    const res = await axios.get<User[]>(`${API_URL}/api/v1/users`);
    return res.data;
};

// Create new user
export const createUser = async (userData: NewUserInput): Promise<User> => {
    const res = await axios.post<{ message: string; user: User }>(
        `${API_URL}/api/v1/users`,
        userData
    );
    return res.data.user;
};

// Update specific user's permission
export const updateUserPermissions = async (
    userId: string,
    updates: {
        isAdmin?: boolean;
        permissions?: Partial<User["permissions"]>;
    }
    ): Promise<User> => {
    const res = await axios.put<{ user: User }>(
        `${API_URL}/api/v1/users/${userId}/permissions`,
        updates
    );
    return res.data.user;
};

// Update specific user's information
export const updateUserInfo = async (
    userId: string,
    updates: { username: string; email: string; permissions?: User["permissions"] }
    ): Promise<User> => {
    const res = await axios.put<{ user: User }>(
        `${API_URL}/api/v1/users/${userId}`,
        updates
    );
    return res.data.user;
};

// Delete user
export const deleteUser = async (userId: string): Promise<void> => {
    await axios.delete(`${API_URL}/api/v1/users/${userId}`);
};
