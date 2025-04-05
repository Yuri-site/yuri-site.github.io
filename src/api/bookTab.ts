import axios from "axios";

export interface Book {
    _id?: string;
    date: string;
    title: string;
    author: string;
    type: string;
    publisher: string;
    status: string;
    imageUrl?: string;
    tabs?: string[];
}

// define BookTab structure
export interface BookTab {
    _id?: string;
    title: string;
    col_tabs: {
        key: keyof Book;
        label: string;
    }[];
}

const API_URL = "http://localhost:3000/api/v1/booktab";

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
export const updateBookTab = async (id: string, bookTabData: BookTab): Promise<BookTab> => {
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
