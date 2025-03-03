import { create } from "zustand";
import { Book } from "../data/bookListData"; // 確保路徑正確

interface BookState {
  books: Book[]; // 书籍列表
  selectedBook: Book | null; // 当前选择的书籍
  setBooks: (books: Book[]) => void; // 设置书籍列表
  setSelectedBook: (book: Book | null) => void; // 设置选中的书籍
  addBook: (book: Book) => void; // 添加书籍
  updateBook: (updatedBook: Book) => void; // 更新书籍
  deleteBook: (bookId: string) => void; // 删除书籍
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
