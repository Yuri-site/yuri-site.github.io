import React from "react";
import { Book } from "../../data/bookListData";
import { useBookStore } from "../../store/book";
import BookDetailCard from "./BookDetailCard";

interface BookListTableProps {
    filteredBooks: Book[];
}
const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const BookListTable: React.FC<BookListTableProps> = ({ filteredBooks }) => {
    const { selectedBook, setSelectedBook } = useBookStore();

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
                                    {truncateText(book.title, 20)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {truncateText(book.author, 8)}
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
            <BookDetailCard selectedBook={selectedBook} closeDetailModal={closeDetailModal} />
        </div>
    );
};

export default BookListTable;
