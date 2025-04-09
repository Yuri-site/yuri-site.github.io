import axios from "axios";
import { Book } from "../types/index";

const API_URL = `${import.meta.env.VITE_API_URL}/books`;

// Set Axios interceptor to add the Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    if (token) {
      config.headers = config.headers || {};  // Ensure headers exist
      config.headers["Authorization"] = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// get all books
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// get books by tab
export const fetchBooksByTab = async (tab: string): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(`${API_URL}/tab/${tab}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books for tab "${tab}":`, error);
    throw error;
  }
};

// create book
export const createBook = async (bookData: Book): Promise<Book> => {
  try {
    const response = await axios.post<Book>(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

// update book
export const updateBook = async (
  id: string,
  bookData: Book
): Promise<Book> => {
  try {
    const response = await axios.put<Book>(`${API_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// delete book
export const deleteBook = async (id: string): Promise<void> => {
  try {
    await axios.delete<Book>(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
