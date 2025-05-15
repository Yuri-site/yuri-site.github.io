import axios from "axios";
import { Book } from "../types";
import { useAuthStore } from "../store/authStore";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/books`;

// 設定全域 token
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

// ✅ 權限檢查器
const checkPermission = () => {
    const user = useAuthStore.getState().user;
    if (!user || (!user.isAdmin && !user.canManageBooks)) {
        throw new Error("你沒有書籍管理權限");
    }
};

// ✅ 取得所有書籍（不需權限）
export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get<Book[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

// ✅ 依 tab 查詢書籍（不需權限）
export const fetchBooksByTab = async (tab: string): Promise<Book[]> => {
    try {
        const response = await axios.get<Book[]>(`${API_URL}/tab/${tab}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books for tab "${tab}":`, error);
        throw error;
    }
};

// ✅ 建立書籍（需權限）
export const createBook = async (bookData: Book): Promise<Book> => {
    try {
        checkPermission(); // ⬅ 檢查權限
        const response = await axios.post<Book>(API_URL, bookData);
        return response.data;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
};

// ✅ 更新書籍（需權限）
export const updateBook = async (id: string, bookData: Book): Promise<Book> => {
    try {
        checkPermission(); // ⬅ 檢查權限
        const response = await axios.put<Book>(`${API_URL}/${id}`, bookData);
        return response.data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};

// ✅ 刪除書籍（需權限）
export const deleteBook = async (id: string): Promise<void> => {
    try {
        checkPermission(); // ⬅ 檢查權限
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};
