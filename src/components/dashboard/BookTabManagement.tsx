// src/pages/BookTabManagement.tsx
import React, { useEffect, useState } from "react";
import {
    fetchBookTabs,
    createBookTab,
    updateBookTab,
    deleteBookTab,
} from "../../api/bookTab";
import { BookTab } from "../../types";
import BookTabForm from "./BookTabManagement/BookTabForm";
import BookTabList from "./BookTabManagement/BookTabList";

const emptyTab: BookTab = {
    order: 0,
    title: "",
    col_tabs: [],
};

const BookTabManagement: React.FC = () => {
    const [tabs, setTabs] = useState<BookTab[]>([]);
    const [formData, setFormData] = useState<BookTab>(emptyTab);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const loadTabs = async () => {
        setLoading(true);
        try {
            const res = await fetchBookTabs();
            setTabs(res);
            setError(null);
        } catch (err) {
            setError("載入分類失敗");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTabs();
    }, []);

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
            const updatedFormData = { ...formData};
            if(updatedFormData.order === 0){
                updatedFormData.order += 1;
            }

            if (editingId) {
                const updated = await updateBookTab(editingId, updatedFormData);
                setTabs((prev) =>
                    prev.map((t) => (t._id === editingId ? updated : t))
                );
                setEditingId(null);
            } else {
                const created = await createBookTab(updatedFormData);
                setTabs((prev) => [...prev, created]);
            }
            setFormData(emptyTab); // Reset form data
        } catch (err) {
            console.log(err);
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
            setError("刪除失敗");
            console.log(err);
        }
    };

    // Handle the new sorting logic
    const handleSort = (order: string[]) => {
        // 這裡只保存臨時排序結果，完整數據將在 onTabsUpdated 中更新
        console.log("排序順序已更新:", order);
    };
    
    // 拖放排序後重新載入數據
    const handleTabsUpdated = () => {
        console.log("標籤更新，重新載入數據");
        loadTabs();
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">分類管理</h2>

            <BookTabForm
                formData={formData}
                editingId={editingId}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                handleColTabChange={handleColTabChange}
                handleAddColTab={handleAddColTab}
                handleRemoveColTab={handleRemoveColTab}
            />

            <BookTabList
                tabs={tabs}
                loading={loading}
                error={error}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleSort={handleSort}
                onTabsUpdated={handleTabsUpdated}
            />
        </div>
    );
};

export default BookTabManagement;