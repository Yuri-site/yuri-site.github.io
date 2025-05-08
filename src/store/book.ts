import { create } from "zustand";
import { Book } from "../types";


interface BookState {
    books: Book[];
    selectedBook: Book | null;
    setBooks: (books: Book[]) => void;
    setSelectedBook: (book: Book | null) => void;
    addBook: (book: Book) => void;
    updateBook: (updatedBook: Book) => void;
    deleteBook: (bookId: string) => void;
}

export const useBookStore = create<BookState>((set) => ({
    books: [],
    selectedBook: null,
    setBooks: (books) => set({ books }),
    setSelectedBook: (book) => set({ selectedBook: book }),
    addBook: (book) => set((state) => ({ books: [...state.books, book] })),
    updateBook: (updatedBook) =>
        set((state) => ({
        books: state.books.map((book) =>
            book._id === updatedBook._id ? updatedBook : book
        ),
    })),
    deleteBook: (bookId) =>
        set((state) => ({
        books: state.books.filter((book) => book._id !== bookId),
    })),
}));
