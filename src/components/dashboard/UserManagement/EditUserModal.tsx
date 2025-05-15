// EditUserModal.tsx
import React from "react";
import { User } from "../../../types/index";

interface Props {
    user: User | null;
    onClose: () => void;
    onSave: (userId: string, updates: { username: string; email: string }) => Promise<void>;
}

const EditUserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
    const [form, setForm] = React.useState({ username: "", email: "" });

    React.useEffect(() => {
        if (user) setForm({ username: user.username, email: user.email });
    }, [user]);

    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-white p-6 rounded w-[400px]">
            <h3 className="text-lg font-semibold mb-2">編輯使用者</h3>
            <input
            className="w-full mb-2 border p-2"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
            className="w-full mb-2 border p-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">取消</button>
            <button
                onClick={() => {
                    onSave(user._id, form);
                    onClose();
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded"
            >
                儲存
            </button>
            </div>
        </div>
        </div>
    );
};

export default EditUserModal;
