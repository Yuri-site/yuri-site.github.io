import axios from "axios";
import { BookTab } from "../types/index";

const API_URL = `${import.meta.env.VITE_API_URL as string}/bookTab`;

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

// get all book tabs
export const fetchBookTabs = async (): Promise<BookTab[]> => {
  try {
    const response = await axios.get<BookTab[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching book tabs:", error);
    throw error;
  }
};

// get specific book tab by id
export const fetchBookTabById = async (id: string): Promise<BookTab> => {
  try {
    const response = await axios.get<BookTab>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book tab by ID:", error);
    throw error;
  }
};

// create a new book tab
export const createBookTab = async (bookTabData: BookTab): Promise<BookTab> => {
  try {
    const response = await axios.post<BookTab>(API_URL, bookTabData);
    return response.data;
  } catch (error) {
    console.error("Error creating book tab:", error);
    throw error;
  }
};

// update a book tab
export const updateBookTab = async (
  id: string,
  bookTabData: BookTab
): Promise<BookTab> => {
  try {
    const response = await axios.put<BookTab>(`${API_URL}/${id}`, bookTabData);
    return response.data;
  } catch (error) {
    console.error("Error updating book tab:", error);
    throw error;
  }
};

// delete a book tab
export const deleteBookTab = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting book tab:", error);
    throw error;
  }
};
