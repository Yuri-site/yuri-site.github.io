import React from "react";
import { User } from "../../../types/index";

interface Props {
    users: User[];
    onPermissionChange: (userId: string, updates: Partial<User>) => void;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const UserTable: React.FC<Props> = ({ users, onPermissionChange, onEdit, onDelete }) => {
    // 用 keyof User 明確告訴 TS 這些是合法屬性名稱
    const permissionKeys: (keyof Pick<
        User,
        "isAdmin" | "canManageBooks" | "canManageArticles" | "canManageSlides"
    >)[] = ["isAdmin", "canManageBooks", "canManageArticles", "canManageSlides"];

    return (
        <table className="w-full text-sm border border-gray-300">
        <thead>
            <tr className="bg-gray-100">
            <th className="border p-2">帳號</th>
            <th className="border p-2">管理者</th>
            <th className="border p-2">書籍</th>
            <th className="border p-2">文章</th>
            <th className="border p-2">輪播</th>
            <th className="border p-2">操作</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
            <tr key={user._id} className="text-center">
                <td className="border p-2">{user.username}</td>
                {permissionKeys.map((key) => (
                <td key={key} className="border p-2">
                    <input
                    type="checkbox"
                    checked={user[key]}
                    onChange={() =>
                        onPermissionChange(user._id!, {
                        [key]: !user[key],
                        })
                    }
                    />
                </td>
                ))}
                <td className="border p-2">
                <button onClick={() => onEdit(user)} className="text-blue-600 mr-2">✏️</button>
                <button onClick={() => onDelete(user._id!)} className="text-red-500">🗑</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};

export default UserTable;
