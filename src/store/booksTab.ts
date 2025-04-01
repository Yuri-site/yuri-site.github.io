import { create } from "zustand";

interface BookTab {
    currentSeason: string;
    setSeason: (season: string) => void;
}

export const useBookTabStore = create<BookTab>((set) => ({
    currentSeason: localStorage.getItem("currentSeason") || "本季更新",
    setSeason: (season) => {
        localStorage.setItem("currentSeason", season);
        set({ currentSeason: season });
    },
}));
