import axios from "axios";
import { User } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

// 取得所有使用者
export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(`${API_URL}/api/v1/users`);
  return res.data;
};

// 建立新使用者
export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  canManageBooks: boolean;
  canManageArticles: boolean;
  canManageSlides: boolean;
}): Promise<User> => {
  const res = await axios.post<{ message: string; user: User }>(
    `${API_URL}/api/v1/users`,
    userData
  );
  return res.data.user;
};

// 更新使用者權限
export const updateUserPermissions = async (
  userId: string,
  updates: Partial<User>
): Promise<User> => {
  const res = await axios.put<{ user: User }>(
    `${API_URL}/api/v1/users/${userId}/permissions`,
    updates
  );
  return res.data.user;
};

// 編輯使用者帳號/信箱
export const updateUserInfo = async (
  userId: string,
  updates: { username: string; email: string }
): Promise<User> => {
  const res = await axios.put<{ user: User }>(
    `${API_URL}/api/v1/users/${userId}`,
    updates
  );
  return res.data.user;
};

// 刪除使用者
export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`${API_URL}/api/v1/users/${userId}`);
};
