/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Book, BookTab } from "../../../types";
import { getTabColorClass } from "./TabUtils";

interface BookTableProps {
  books: Book[];
  tabs: BookTab[];
  selectedCols: string[];
  attrDisplayNames: Record<string, string>;
  handleEdit: (book: Book) => void;
  handleDelete: (id: string) => void;
  allAttributes?: string[]; // 添加 allAttributes 以便按照原始順序排序
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  tabs,
  selectedCols,
  attrDisplayNames,
  handleEdit,
  handleDelete,
  allAttributes = ["date", "title", "author", "type", "publisher", "status", "imageUrl", "tabs"],
}) => {
  // 使用排序後的選定欄位
  const sortedSelectedCols = [...selectedCols].sort(
    (a, b) => allAttributes.indexOf(a) - allAttributes.indexOf(b)
  );

  // 狀態用於排序
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // 當書籍數據或排序條件改變時更新
  useEffect(() => {
    const sorted = [...books].sort((a, b) => {
      // 特殊處理日期欄位
      if (sortField === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      
      // 特殊處理標籤欄位
      if (sortField === "tabs") {
        const tabsA = a.tabs?.length || 0;
        const tabsB = b.tabs?.length || 0;
        return sortDirection === "asc" ? tabsA - tabsB : tabsB - tabsA;
      }
      
      // 處理其他欄位
      const valueA = (a as any)[sortField] || "";
      const valueB = (b as any)[sortField] || "";
      
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      return 0;
    });
    
    setSortedBooks(sorted);
  }, [books, sortField, sortDirection]);

  // 處理欄位標題點擊排序
  const handleSort = (field: string) => {
    if (field === sortField) {
      // 切換排序方向
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // 設置新的排序欄位，默認升序
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <table className="w-full border border-gray-300 bg-white">
      <thead className="bg-gray-200">
        <tr>
          {sortedSelectedCols.map((attr) => (
            <th 
              key={attr} 
              className="border p-2 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort(attr)}
            >
              <div className="flex items-center justify-center">
                {attrDisplayNames[attr]}
                {sortField === attr && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </div>
            </th>
          ))}
          <th className="border p-2">操作</th>
        </tr>
      </thead>
      <tbody>
        {sortedBooks.map((book) => (
          <tr key={book._id} className="hover:bg-gray-50">
            {sortedSelectedCols.map((attr) => (
              <td key={attr} className="border p-2 text-center">
                {attr === "date" ? (
                  new Date(book.date).toLocaleDateString("zh-TW")
                ) : attr === "tabs" ? (
                  <div className="flex flex-wrap gap-1 justify-center">
                    {book.tabs?.map((tabId) => {
                      const tab = tabs.find((t) => t._id === tabId);
                      return tab ? (
                        <span 
                          key={tabId} 
                          className={`px-2 py-0.5 rounded-lg text-xs font-medium ${getTabColorClass(tab, tabs)}`}
                        >
                          {tab.title}
                        </span>
                      ) : null;
                    })}
                  </div>
                ) : attr === "imageUrl" && book.imageUrl ? (
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="w-12 h-12 object-cover mx-auto rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/48?text=N/A";
                    }}
                  />
                ) : (
                  (book as any)[attr]
                )}
              </td>
            ))}
            <td className="border p-2 text-center align-middle">
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => handleEdit(book)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                    >
                        編輯
                    </button>
                    <button
                        onClick={() => book._id && handleDelete(book._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                        刪除
                    </button>
                </div>
            </td>

          </tr>
        ))}
        {sortedBooks.length === 0 && (
          <tr>
            <td colSpan={sortedSelectedCols.length + 1} className="text-center py-4 text-gray-500">
              無資料
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookTable;