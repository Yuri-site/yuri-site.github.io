import { useEffect, useState } from "react";
import { fetchBooks, createBook, updateBook, deleteBook } from "../../../api/book";

interface Book {
    _id?: string;
    date: string;
    title: string;
    author: string;
    type: string;
    publisher: string;
    status: string;
    imageUrl: string;
}

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // form status
    const [formData, setFormData] = useState<Book>({
        title: "",
        author: "",
        type: "",
        publisher: "",
        status: "",
        date: new Date().toISOString().split("T")[0],
        imageUrl: "",
    });

    // if editing
    const [editingId, setEditingId] = useState<string | null>(null);

    // get book list
    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (err) {
                setError("無法獲取書籍資料，請稍後再試");
                console.log(err);
                
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    // handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // add or update books
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                // update book
                await updateBook(editingId, formData);
                setBooks(books.map(book => (book._id === editingId ? { ...formData, _id: editingId } : book)));
            } else {
                // add new book
                const newBook = await createBook(formData);
                setBooks([...books, newBook]);
            }
            setEditingId(null);
            setFormData({
                title: "",
                author: "",
                type: "",
                publisher: "",
                status: "",
                date: new Date().toISOString().split("T")[0],
                imageUrl: "",
            });
        } catch (err) {
            setError("提交書籍時發生錯誤");
            console.log(err);
            
        }
    };

    // delete book
    const handleDelete = async (id: string) => {
        try {
            await deleteBook(id);
            setBooks(books.filter(book => book._id !== id));
        } catch (err) {
            setError("刪除失敗，請稍後再試");
            console.log(err);
            
        }
    };

    // edit book
    const handleEdit = (book: Book) => {
        setEditingId(book._id || null);
        setFormData(book);
    };

    if (loading) return <p className="text-center text-gray-600">載入中...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="mx-auto w-[60vw]">
            <h2 className="text-2xl font-bold mb-4 text-center">書籍管理</h2>

            {/* form */}
            <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-md shadow-md">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="title" placeholder="標題" value={formData.title} onChange={handleChange} className="border p-2 rounded-md w-full" required />
                    <input type="text" name="author" placeholder="作者" value={formData.author} onChange={handleChange} className="border p-2 rounded-md w-full" required />
                    <input type="text" name="type" placeholder="類型" value={formData.type} onChange={handleChange} className="border p-2 rounded-md w-full" />
                    <input type="text" name="publisher" placeholder="出版社" value={formData.publisher} onChange={handleChange} className="border p-2 rounded-md w-full" />
                    <input type="text" name="status" placeholder="狀態" value={formData.status} onChange={handleChange} className="border p-2 rounded-md w-full" />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-2 rounded-md w-full" />
                    <input type="text" name="imageUrl" placeholder="圖片 URL" value={formData.imageUrl} onChange={handleChange} className="border p-2 rounded-md w-full" />
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
                    {editingId ? "更新書籍" : "新增書籍"}
                </button>
            </form>

            {/* Book list */}
            <table className="w-full border-collapse border border-gray-300 shadow-md bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">日期</th>
                        <th className="border p-2">標題</th>
                        <th className="border p-2">作者</th>
                        <th className="border p-2">類型</th>
                        <th className="border p-2">出版社</th>
                        <th className="border p-2">狀態</th>
                        <th className="border p-2">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id} className="text-center">
                            <td className="border p-2 w-24">
                                {new Date(book.date).toLocaleDateString("zh-TW")}
                            </td>
                            <td className="border p-2 max-w-[450px] truncate text-left" title={book.title}>
                                {book.title}
                            </td>
                            <td className="border p-2">{book.author}</td>
                            <td className="border p-2">{book.type}</td>
                            <td className="border p-2">{book.publisher}</td>
                            <td className="border p-2 w-24 text-red-600">{book.status}</td>
                            <td className="border p-2 space-x-2 w-36">
                                <button onClick={() => handleEdit(book)} className="px-2 py-1 bg-yellow-500 text-white rounded-md">
                                    編輯
                                </button>
                                <button onClick={() => book._id && handleDelete(book._id)} className="px-2 py-1 bg-red-500 text-white rounded-md">
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

export default BookList;
