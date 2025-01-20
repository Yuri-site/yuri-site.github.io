import { create } from "zustand";

interface BookTab {
    currentSeason: string;
    setSeason: (season: string) => void;
}

export const useBookTabStore = create<BookTab>((set) => ({
    currentSeason: localStorage.getItem("currentSeason") || "本季更新", // 從 localStorage 初始化狀態
    setSeason: (season) => {
        localStorage.setItem("currentSeason", season); // 存到 localStorage
        set({ currentSeason: season });
    },
}));
