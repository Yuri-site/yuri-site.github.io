import React from "react";
import { Book } from "../../types";
import { useBookStore } from "../../store/book";
import BookDetailCard from "./BookDetailCard";

interface BookListTableProps {
    filteredBooks: Book[];
    colTabs: { key: keyof Book; label: string }[];  // Update this line to use key for filtering
}

const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const BookListTable: React.FC<BookListTableProps> = ({ filteredBooks, colTabs }) => {
    const { selectedBook, setSelectedBook } = useBookStore();

    const handleDetailClick = (book: Book) => {
        setSelectedBook(book);
    };

    const closeDetailModal = () => {
        setSelectedBook(null);
    };

    // 動態渲染表格的頭部和內容
    const renderColumn = (columnKey: keyof Book, book: Book) => {
        switch (columnKey) {
            case "date":
                return book.date;
            case "title":
                return truncateText(book.title, 20);
            case "author":
                return truncateText(book.author, 8);
            case "type":
                return book.type;
            case "publisher":
                return book.publisher;
            case "status":
                return book.status;
            default:
                return "-";
        }
    };

    return (
        <div className="mt-2">
            <table className="line-clamp-2 overflow-hidden text-ellipsis max-w-[100vw] border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-pink-100">
                        {colTabs.map((col, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">
                                {col.label}
                            </th>
                        ))}
                        <th className="border border-gray-300 px-4 py-2">詳細資訊</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <tr key={index}>
                                {colTabs.map((col, colIndex) => (
                                    <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                        {renderColumn(col.key, book)} {/* 使用 col.key 動態渲染每一列 */}
                                    </td>
                                ))}
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
                                colSpan={colTabs.length + 1}
                            >
                                找不到符合條件的書籍
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal to show detailed information */}
            <BookDetailCard selectedBook={selectedBook} closeDetailModal={closeDetailModal} colTabs={colTabs} />
        </div>
    );
};

export default BookListTable;
