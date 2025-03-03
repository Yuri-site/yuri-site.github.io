// src/api/bookApi.ts
import axios from "axios";

// 假设书籍的数据结构
 interface Book {
    date: string;
    title: string;
    author: string;
    type: string;
    publisher: string;
    status: string;
    imageUrl: string;
}

const API_URL = "http://localhost:5000/api/v1/books"; // 根据你的后端路由进行调整

// 获取所有书籍
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(API_URL); // 在这里声明响应类型为 Book[]
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// 创建书籍
export const createBook = async (bookData: Book): Promise<Book> => {
  try {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

// 更新书籍
export const updateBook = async (
  id: string,
  bookData: Book
): Promise<Book> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// 删除书籍
export const deleteBook = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
