import {create} from "zustand";

interface AuthState {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("authToken") || null,
    setToken: (token: string) => {
        localStorage.setItem("authToken", token);
        set({ token });
    },
    clearToken: () => {
        localStorage.removeItem("authToken");
        set({ token: null });
    },
}));
