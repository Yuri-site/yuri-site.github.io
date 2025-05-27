import React from "react";
import { User } from "../../../types";

interface Props {
    users: User[];
    onPermissionChange: (userId: string, updates: Partial<User>) => void;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const UserTable: React.FC<Props> = ({
    users,
    onPermissionChange,
    onEdit,
    onDelete,
}) => {
    type PermissionKey = keyof User["permissions"];
    const permissionKeys: PermissionKey[] = ["book", "bookTab", "article", "carousel"];
    const permissionLabels: Record<PermissionKey, string> = {
        book: "書籍",
        bookTab: "分類",
        article: "文章",
        carousel: "輪播",
    };

    return (
        <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-sm border border-gray-300 bg-white">
            <thead>
            <tr className="bg-gray-200 text-gray-800 text-base text-center">
                <th className="border p-3">帳號</th>
                <th className="border p-3">最高權限</th>
                {permissionKeys.map((key) => (
                <th key={key} className="border p-3">{permissionLabels[key]}</th>
                ))}
                <th className="border p-3">操作</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, idx) => (
                <tr
                key={user._id}
                className={`text-center ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
                >
                <td className="border p-3 font-medium">{user.username}</td>
                <td className="border p-3">
                    <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={user.isAdmin}
                    onChange={() =>
                        onPermissionChange(user._id, {
                        isAdmin: !user.isAdmin,
                        })
                    }
                    />
                </td>
                {permissionKeys.map((key) => (
                    <td key={key} className="border p-3">
                    <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={user.permissions[key]}
                        onChange={() =>
                        onPermissionChange(user._id!, {
                            permissions: {
                            ...user.permissions,
                            [key]: !user.permissions[key],
                            },
                        })
                        }
                    />
                    </td>
                ))}
                <td className="border p-3 space-x-2">
                    <button
                    onClick={() => onEdit(user)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                    編輯
                    </button>
                    <button
                    onClick={() => onDelete(user._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    刪除
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default UserTable;
