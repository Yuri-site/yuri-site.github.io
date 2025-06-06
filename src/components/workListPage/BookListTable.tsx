import { useState, useEffect, useMemo } from "react";
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
    const [selectedCols, setSelectedCols] = useState<string[]>([]);
    const [sortKey, setSortKey] = useState<keyof Book | null>("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>("desc");

    useEffect(() => {
        if (colTabs.length > 0) {
            const isMobile = window.innerWidth < 768;
            const initialCount = isMobile ? 3 : 5;
            const initialCols = colTabs.slice(0, initialCount).map(tab => tab.key as string);
            setSelectedCols(initialCols);
        }
    }, [colTabs]);

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

    const allAttributes = colTabs.map(tab => tab.key as string);

    const handleSort = (key: keyof Book) => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const sortedBooks = useMemo(() => {
        if (!sortKey || !sortOrder) return filteredBooks;

        return [...filteredBooks].sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];

            if (sortKey === "date") {
                const dateA = new Date(valA as string);
                const dateB = new Date(valB as string);

                if (isNaN(dateA.getTime())) return 1;
                if (isNaN(dateB.getTime())) return -1;

                return sortOrder === "asc"
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();
            }

            if (typeof valA === "string" && typeof valB === "string") {
                return sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            return 0;
        });
    }, [filteredBooks, sortKey, sortOrder]);




    const selectedColTabs = colTabs.filter(col => selectedCols.includes(col.key as string));

    const renderColumn = (columnKey: keyof Book, book: Book) => {
        switch (columnKey) {
            case "date":
                return new Date(book.date).toLocaleDateString("zh-TW");
            case "title":
                return truncateText(book.title, 20);
            case "author":
                return truncateText(book.author, 8);
            case "type":
                return book.type;
            case "publisher":
                return truncateText(book.publisher, 5);
            case "status":
                return book.status;
            case "comment":
                return book.comment;
            default:
                return "-";
        }
    };

    const getSortIndicator = (key: keyof Book) => {
        if (sortKey !== key) return "";
        if (sortOrder === "asc") return " ▲";
        if (sortOrder === "desc") return " ▼";
        return "";
    };

    return (
        <div className="mt-2">
            <ColumnSelector
                selectedCols={selectedCols}
                allAttributes={allAttributes}
                attrDisplayNames={attrDisplayNames}
                handleColSelect={handleColSelect}
            />
            <div className="overflow-x-auto rounded-t-lg mb-12 shadow-md">
                <table className="w-full border-collapse border border-gray-300 ">
                    <thead>
                        <tr className="bg-pink-400 text-xs text-white sm:text-sm md:text-base lg:text-md">
                            {selectedColTabs.map((col, index) => (
                                <th
                                    key={index}
                                    onClick={() => handleSort(col.key)}
                                    className="border border-gray-1s00 md:px-4 md:py-2 px-2 py-1 cursor-pointer hover:text-slate-100 hover:bg-pink-300"
                                >
                                    {col.label}
                                    {getSortIndicator(col.key)}
                                </th>
                            ))}
                            <th className="md:px-4 md:py-2 px-2 py-1">詳細資訊</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBooks.length > 0 ? (
                            sortedBooks.map((book, index) => (
                                <tr key={index} className="text-xs sm:text-sm md:text-base lg:text-md">
                                    {selectedColTabs.map((col, colIndex) => (
                                        <td key={colIndex} className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 break-all whitespace-normal">
                                            {renderColumn(col.key, book)}
                                        </td>
                                    ))}
                                    <td className="border border-gray-300 md:px-4 md:py-2 px-2 py-1">
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
            </div>

            <BookDetailCard selectedBook={selectedBook} closeDetailModal={closeDetailModal} colTabs={colTabs} />
        </div>
    );
};

export default BookListTable;
