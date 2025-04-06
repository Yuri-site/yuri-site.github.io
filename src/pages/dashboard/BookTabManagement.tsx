// src/pages/BookTabManagement.tsx
import React, { useEffect, useState } from "react";
import {
    fetchBookTabs,
    createBookTab,
    updateBookTab,
    deleteBookTab,
} from "../../api/bookTab";
import { BookTab } from "../../types";

const bookKeys = [
    "title",
    "author",
    "date",
    "type",
    "publisher",
    "status",
    "comment",
    "imageUrl",
] as const;

const emptyTab: BookTab = {
    title: "",
    col_tabs: [],
};

const BookTabManagement: React.FC = () => {
    const [tabs, setTabs] = useState<BookTab[]>([]);
    const [formData, setFormData] = useState<BookTab>(emptyTab);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTabs = async () => {
            try {
                const res = await fetchBookTabs();
                setTabs(res);
            } catch (err) {
                setError("載入分類失敗");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        loadTabs();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleColTabChange = (
        index: number,
        field: "key" | "label",
        value: string
    ) => {
        setFormData((prev) => {
            const updated = [...prev.col_tabs];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, col_tabs: updated };
        });
    };

    const handleAddColTab = () => {
        setFormData((prev) => ({
            ...prev,
            col_tabs: [...prev.col_tabs, { key: "title", label: "" }],
        }));
    };

    const handleRemoveColTab = (index: number) => {
        setFormData((prev) => {
            const updated = [...prev.col_tabs];
            updated.splice(index, 1);
            return { ...prev, col_tabs: updated };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                const updated = await updateBookTab(editingId, formData);
                setTabs((prev) =>
                    prev.map((t) => (t._id === editingId ? updated : t))
                );
                setEditingId(null);
            } else {
                const created = await createBookTab(formData);
                setTabs((prev) => [...prev, created]);
            }
            setFormData(emptyTab);
        } catch (err) {
            console.error(err);
            setError("提交失敗");
        }
    };

    const handleEdit = (tab: BookTab) => {
        setFormData(tab);
        setEditingId(tab._id || null);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBookTab(id);
            setTabs((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            console.error(err);
            setError("刪除失敗");
        }
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">分類管理</h2>

            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-white p-4 rounded shadow-md"
            >
                <div className="mb-4">
                    <label className="block font-medium">分類標題</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-2">欄位設定</label>
                    {formData.col_tabs.map((col, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 mb-2"
                        >
                            <select
                                value={col.key}
                                onChange={(e) =>
                                    handleColTabChange(
                                        index,
                                        "key",
                                        e.target.value
                                    )
                                }
                                className="border p-1 rounded"
                            >
                                {bookKeys.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="顯示名稱"
                                value={col.label}
                                onChange={(e) =>
                                    handleColTabChange(
                                        index,
                                        "label",
                                        e.target.value
                                    )
                                }
                                className="border p-1 rounded w-40"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveColTab(index)}
                                className="text-red-500 hover:underline"
                            >
                                移除
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddColTab}
                        className="text-blue-600 hover:underline mt-2"
                    >
                        ＋新增欄位
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {editingId ? "更新分類" : "新增分類"}
                </button>
            </form>

            {loading ? (
                <p>載入中...</p>
            ) : (
                <table className="w-full border border-gray-300 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">分類標題</th>
                            <th className="border p-2">欄位顯示設定</th>
                            <th className="border p-2">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabs.map((tab) => (
                            <tr key={tab._id}>
                                <td className="border p-2 text-center">
                                    {tab.title}
                                </td>
                                <td className="border p-2 text-center text-sm">
                                    {tab.col_tabs && tab.col_tabs.length > 0
                                        ? tab.col_tabs
                                              .map(
                                                  (col) =>
                                                      `${col.label} (${col.key})`
                                              )
                                              .join("、")
                                        : "—"}
                                </td>
                                <td className="flex border p-2 text-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(tab)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        編輯
                                    </button>
                                    <button
                                        onClick={() =>
                                            tab._id && handleDelete(tab._id)
                                        }
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default BookTabManagement;
