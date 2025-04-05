import { useEffect, useState } from "react";
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../../api/book";
import BookForm from "./BookForm";
import BookTable from "./BookTable";
import ColumnSelector from "./ColumnSelector";
import { fetchBookTabs } from "../../../api/bookTab";
import { Book, BookTab } from "../../../types";

const allAttributes = [
  "date",
  "title",
  "author",
  "type",
  "publisher",
  "status",
  "comment",
  "imageUrl",
  "tabs",
];

const attrDisplayNames: Record<string, string> = {
  date: "日期",
  title: "標題",
  author: "作者",
  type: "類型",
  publisher: "出版社",
  status: "狀態",
  comment: "備註",
  imageUrl: "圖片",
  tabs: "所屬標籤",
};

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [tabs, setTabs] = useState<BookTab[]>([]);
  const [selectedCols, setSelectedCols] = useState<string[]>([
    "date",
    "title",
    "author",
    "type",
    "publisher",
    "status",
  ]);
  const [formData, setFormData] = useState<Book>({
    title: "",
    author: "",
    type: "",
    publisher: "",
    status: "",
    comment: "",
    date: new Date().toISOString().split("T")[0],
    imageUrl: "",
    tabs: [],
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [booksData, tabData] = await Promise.all([
          fetchBooks(),
          fetchBookTabs(),
        ]);
        setBooks(booksData);
        setTabs(tabData);
      } catch (err) {
        setError("載入失敗");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (tabId: string) => {
    setFormData((prev) => ({
      ...prev,
      tabs: prev.tabs?.includes(tabId)
        ? prev.tabs.filter((t) => t !== tabId)
        : [...(prev.tabs || []), tabId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBook(editingId, formData);
        setBooks((prev) =>
          prev.map((b) =>
            b._id === editingId ? { ...formData, _id: editingId } : b
          )
        );
      } else {
        const newBook = await createBook(formData);
        setBooks((prev) => [...prev, newBook]);
      }
      setFormData({
        title: "",
        author: "",
        type: "",
        publisher: "",
        status: "",
        comment: "",
        date: new Date().toISOString().split("T")[0],
        imageUrl: "",
        tabs: [],
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError("提交失敗");
    }
  };

  const handleEdit = (book: Book) => {
    setEditingId(book._id || null);
    setFormData(book);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      setError("刪除失敗");
    }
  };

  const handleColSelect = (cols: string[]) => {
    setSelectedCols(cols);
  };

  if (loading) return <p>載入中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto w-[80vw]">
      <h2 className="text-2xl font-bold mb-4 text-center">書籍管理</h2>

      {/* 選擇顯示欄位 */}
      <ColumnSelector
        selectedCols={selectedCols}
        allAttributes={allAttributes}
        attrDisplayNames={attrDisplayNames}
        handleColSelect={handleColSelect}
      />

      {/* 表單 */}
      <BookForm
        formData={formData}
        tabs={tabs}
        editingId={editingId}
        handleChange={handleChange}
        handleTabChange={handleTabChange}
        handleSubmit={handleSubmit}
      />

      {/* 書籍表格 - 傳遞 allAttributes 以確保按照原始順序顯示 */}
      <BookTable
        books={books}
        tabs={tabs}
        selectedCols={selectedCols}
        attrDisplayNames={attrDisplayNames}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        allAttributes={allAttributes}
      />
    </div>
  );
};

export default BookList;