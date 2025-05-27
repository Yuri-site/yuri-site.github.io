import React from "react";
import { User } from "../../../types";

interface Props {
    user: User | null;
    onClose: () => void;
    onSave: (userId: string, updates: {
        username: string;
        email: string;
        password?: string; // ✅ 新增：密碼欄位為可選
        permissions: User["permissions"];
    }) => Promise<void>;
}

const permissionLabels: { [key in keyof User["permissions"]]: string } = {
    book: "書籍",
    bookTab: "書籍分類",
    article: "文章",
    carousel: "輪播圖",
};

const EditUserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
    const [form, setForm] = React.useState({
        username: "",
        email: "",
        password: "", // ✅ 密碼欄位
        permissions: {
            book: false,
            bookTab: false,
            article: false,
            carousel: false,
            admin: false,
        },
    });

    React.useEffect(() => {
        if (user) {
            setForm({
                username: user.username,
                email: user.email,
                password: "",
                permissions: {
                    ...form.permissions,
                    ...user.permissions,
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (!user) return null;

    const handlePermissionToggle = (key: keyof User["permissions"]) => {
        setForm((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [key]: !prev.permissions[key],
            },
        }));
    };

    const handleSave = async () => {
        const payload: {
            username: string;
            email: string;
            password?: string;
            permissions: User["permissions"];
        } = {
            username: form.username,
            email: form.email,
            permissions: form.permissions,
        };

        if (form.password.trim() !== "") {
            payload.password = form.password;
        }

        await onSave(user._id, payload);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-[400px] shadow-lg">
                <h3 className="text-lg font-semibold mb-4">編輯使用者</h3>

                <input
                    className="w-full mb-2 border p-2 rounded"
                    placeholder="使用者名稱"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    className="w-full mb-2 border p-2 rounded"
                    placeholder="電子郵件"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="w-full mb-4 border p-2 rounded"
                    type="password"
                    placeholder="若需更改密碼，請輸入新密碼"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <div className="mb-4 text-sm">
                    <div className="font-semibold mb-1">權限設定：</div>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(permissionLabels).map(([key, label]) => (
                            <div
                                key={key}
                                className={`cursor-pointer px-3 py-1 rounded border text-center min-w-[80px] ${
                                    form.permissions[key as keyof User["permissions"]]
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-gray-100 text-gray-800 border-gray-300"
                                }`}
                                onClick={() => handlePermissionToggle(key as keyof User["permissions"])}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-1 bg-gray-300 rounded">取消</button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-1 bg-blue-600 text-white rounded"
                    >
                        儲存
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
