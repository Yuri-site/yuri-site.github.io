import axios from "axios";
import { Book } from "../types";
import { checkPermission } from "../utils/checkPermission";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/books`;

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const fetchBooks = async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
};

export const fetchBooksByTab = async (tab: string): Promise<Book[]> => {
    const response = await axios.get<Book[]>(`${API_URL}/tab/${tab}`);
    return response.data;
};

export const createBook = async (bookData: Book): Promise<Book> => {
    checkPermission("book");
    const response = await axios.post<Book>(API_URL, bookData);
    return response.data;
};

export const updateBook = async (id: string, bookData: Book): Promise<Book> => {
    checkPermission("book");
    const response = await axios.put<Book>(`${API_URL}/${id}`, bookData);
    return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
    checkPermission("book");
    await axios.delete(`${API_URL}/${id}`);
};
