import axios from "axios";
import { BookTab } from "../types";
import { checkPermission } from "../utils/checkPermission";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/bookTab`;

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

export const fetchBookTabs = async (): Promise<BookTab[]> => {
    const response = await axios.get<BookTab[]>(API_URL);
    return response.data;
};

export const fetchBookTabById = async (id: string): Promise<BookTab> => {
    const response = await axios.get<BookTab>(`${API_URL}/${id}`);
    return response.data;
};

export const createBookTab = async (bookTabData: BookTab): Promise<BookTab> => {
    checkPermission("bookTab");
    const response = await axios.post<BookTab>(API_URL, bookTabData);
    return response.data;
};

export const updateBookTab = async (
    id: string,
    bookTabData: BookTab
    ): Promise<BookTab> => {
    checkPermission("bookTab");
    const response = await axios.put<BookTab>(`${API_URL}/${id}`, bookTabData);
    return response.data;
};

export const deleteBookTab = async (id: string): Promise<void> => {
    checkPermission("bookTab");
    await axios.delete(`${API_URL}/${id}`);
};

export const updateBookTabOrderList = async (
    orderList: { _id: string; order: number }[]
    ): Promise<void> => {
    checkPermission("bookTab");
    await axios.patch(`${API_URL}/orderList`, { orderList });
};
