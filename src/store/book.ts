import { create } from "zustand";
import { Book } from "../data/bookListData";

interface BookState {
    selectedBook: Book | null;
    setSelectedBook: (book: Book | null) => void;
}

export const useBookStore = create<BookState>((set) => ({
    selectedBook: null,
    setSelectedBook: (book) => set({ selectedBook: book }),
}));
