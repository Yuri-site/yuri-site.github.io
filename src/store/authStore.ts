// store/authStore.ts
import {create} from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("authToken") || null, // 預設從 localStorage 讀取 token
  setToken: (token: string) => {
    localStorage.setItem("authToken", token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem("authToken");
    set({ token: null });
  },
}));
