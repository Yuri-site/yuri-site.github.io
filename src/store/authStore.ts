import { create } from "zustand";
import { User } from "../types";

interface AuthState {
    token: string | null;
    user: User | null;

    setAuth: (token: string, user: User) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("authToken") || null,
    user: (() => {
        const userJson = localStorage.getItem("authUser");
        return userJson ? JSON.parse(userJson) as User : null;
    })(),

    setAuth: (token, user) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        set({ token, user });
    },

    clearAuth: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        set({ token: null, user: null });
    }
}));
