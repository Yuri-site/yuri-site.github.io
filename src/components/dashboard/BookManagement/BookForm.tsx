import React from "react";
import { Book, BookTab } from "../../../types";
import { getTabColorClass } from "./TabUtils";

interface BookFormProps {
  formData: Book;
  tabs: BookTab[];
  editingId: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleTabChange: (tabId: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const BookForm: React.FC<BookFormProps> = ({
  formData,
  tabs,
  editingId,
  handleChange,
  handleTabChange,
  handleSubmit,
}) => {
    const formatDateForInput = (dateStr: string): string => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return ""; // 無效日期，回傳空字串避免錯誤
        return date.toISOString().split("T")[0]; // 回傳 YYYY-MM-DD
    };
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-gray-100 p-4 rounded-md"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="標題"
          required
          className="border p-2 rounded-md"
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="作者"
          required
          className="border p-2 rounded-md"
        />
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="類型"
          className="border p-2 rounded-md"
        />
        <input
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="出版社"
          className="border p-2 rounded-md"
        />
        <input
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="狀態"
          className="border p-2 rounded-md"
        />
        <input
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="備註"
          className="border p-2 rounded-md"
        />
        <input
          type="date"
          name="date"
          value={formatDateForInput(formData.date)}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="圖片 URL"
          className="border p-2 rounded-md"
        />
      </div>

      {/* 選擇書籍所屬 tab */}
      <div className="mt-4">
        <label className="font-semibold mb-1 block">所屬分類：</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {tabs.map((tab) => {
            if (!tab._id) return null;
            const isSelected = formData.tabs?.includes(tab._id) || false;
            const colorClass = getTabColorClass(tab, tabs);
            
            return (
              <label 
                key={tab._id} 
                className={`
                  flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all
                  ${isSelected ? colorClass : 'bg-white hover:bg-gray-50 border border-gray-300'}
                `}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleTabChange(tab._id!)}
                  className="mr-2"
                />
                {tab.title}
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        {editingId ? "更新書籍" : "新增書籍"}
      </button>
    </form>
  );
};

export default BookForm;