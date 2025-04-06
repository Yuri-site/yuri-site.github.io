import React, { useState, useEffect } from "react";
import { Book } from "../../types";
import { useBookStore } from "../../store/book";
import BookDetailCard from "./BookDetailCard";
import ColumnSelector from "../dashboard/BookManagement/ColumnSelector";

interface BookListTableProps {
    filteredBooks: Book[];
    colTabs: { key: keyof Book; label: string }[];
}

const truncateText = (text: string, maxLength: number): string => {
    if (!text || typeof text !== "string") return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const BookListTable: React.FC<BookListTableProps> = ({ filteredBooks, colTabs }) => {
    const { selectedBook, setSelectedBook } = useBookStore();
    // Create state for selected columns
    const [selectedCols, setSelectedCols] = useState<string[]>([]);

    // On initial load, set default columns (up to 6 from colTabs)
    useEffect(() => {
        if (colTabs.length > 0) {
            // Get keys from colTabs, limit to 6
            const initialCols = colTabs.slice(0, 6).map(tab => tab.key as string);
            setSelectedCols(initialCols);
        }
    }, [colTabs]);

    // Create a mapping for column display names
    const attrDisplayNames: Record<string, string> = {};
    colTabs.forEach(tab => {
        attrDisplayNames[tab.key as string] = tab.label;
    });

    const handleColSelect = (cols: string[]) => {
        setSelectedCols(cols);
    };

    const handleDetailClick = (book: Book) => {
        setSelectedBook(book);
    };

    const closeDetailModal = () => {
        setSelectedBook(null);
    };

    // Get all available column keys for the selector
    const allAttributes = colTabs.map(tab => tab.key as string);

    // Dynamic column rendering
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
                return truncateText(book.publisher, 8);
            case "status":
                return book.status;
            case "comment":
                return book.comment;
            default:
                return "-";
        }
    };

    // Filter colTabs based on selectedCols
    const selectedColTabs = colTabs.filter(col => selectedCols.includes(col.key as string));

    return (
        <div className="mt-2">
            {/* Add the Column Selector component */}
            <ColumnSelector
                selectedCols={selectedCols}
                allAttributes={allAttributes}
                attrDisplayNames={attrDisplayNames}
                handleColSelect={handleColSelect}
            />

            <table className="line-clamp-2 overflow-hidden text-ellipsis max-w-[100vw] border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-pink-100">
                        {selectedColTabs.map((col, index) => (
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
                                {selectedColTabs.map((col, colIndex) => (
                                    <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                        {renderColumn(col.key, book)}
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
                                colSpan={selectedColTabs.length + 1}
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