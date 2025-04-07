import { create } from "zustand";

interface BookTab {
    currentSeason: string;
    setSeason: (season: string) => void;
}

export const useBookTabStore = create<BookTab>((set) => ({
    currentSeason: localStorage.getItem("currentSeason") || "中文正版代理百合漫畫",
    setSeason: (season) => {
        localStorage.setItem("currentSeason", season);
        set({ currentSeason: season });
    },
}));
