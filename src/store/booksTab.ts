import { create }from "zustand";

interface bookTab {
    currentSeason: string;
    setSeason: (season: string) => void;
}

export const useBookTabStore = create<bookTab>((set) => ({
    currentSeason: "本季更新",
    setSeason: (season) => set({ currentSeason: season }),
}));
