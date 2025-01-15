import React, { useState } from "react";
import { Book } from "../../js/bookListData";

interface BookListTableProps {
    filteredBooks: Book[];
}

const BookListTable: React.FC<BookListTableProps> = ({ filteredBooks }) => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleDetailClick = (book: Book) => {
        setSelectedBook(book);
    };

    const closeDetailModal = () => {
        setSelectedBook(null);
    };

    return (
        <div className="mt-2">
            <table className="line-clamp-2 overflow-hidden text-ellipsis max-w-[100vw] border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-pink-100">
                        <th className="border border-gray-300 px-4 py-2">日期</th>
                        <th className="border border-gray-300 px-4 py-2">書名</th>
                        <th className="border border-gray-300 px-4 py-2">作者</th>
                        <th className="border border-gray-300 px-4 py-2 hidden sm:table-cell">類型</th>
                        <th className="border border-gray-300 px-4 py-2 hidden sm:table-cell">出版社</th>
                        <th className="border border-gray-300 px-4 py-2 hidden sm:table-cell">狀態</th>
                        <th className="border border-gray-300 px-4 py-2">詳細資訊</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {book.date}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {book.title}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {book.author}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                                    {book.type}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                                    {book.publisher}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                                    {book.status}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleDetailClick(book)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        詳細資訊
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="border border-gray-300 px-4 py-2 text-center"
                                colSpan={7}
                            >
                                找不到符合條件的書籍
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal to show detailed information */}
            {selectedBook && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
                    onClick={closeDetailModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-[80%] max-w-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-4">書籍詳細資訊</h3>
                        <p><strong>書名:</strong> {selectedBook.title}</p>
                        <p><strong>日期:</strong> {selectedBook.date}</p>
                        <p><strong>作者:</strong> {selectedBook.author}</p>
                        <p><strong>類型:</strong> {selectedBook.type}</p>
                        <p><strong>出版社:</strong> {selectedBook.publisher}</p>
                        <p><strong>狀態:</strong> {selectedBook.status}</p>
                        <button
                            onClick={closeDetailModal}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            關閉
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookListTable;
