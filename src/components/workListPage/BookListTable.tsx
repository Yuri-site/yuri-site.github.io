import React from "react";
import { Book } from "../../js/bookListData"; 

interface BookListTableProps {
    filteredBooks: Book[];
}

const BookListTable: React.FC<BookListTableProps> = ({ filteredBooks }) => {
    return (
        <div className="mt-2">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-pink-100">
                        <th className="border border-gray-300 px-4 py-2">日期</th>
                        <th className="border border-gray-300 px-4 py-2">書名</th>
                        <th className="border border-gray-300 px-4 py-2">作者</th>
                        <th className="border border-gray-300 px-4 py-2">類型</th>
                        <th className="border border-gray-300 px-4 py-2">出版社</th>
                        <th className="border border-gray-300 px-4 py-2">狀態</th>
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
                                <td className="border border-gray-300 px-4 py-2">
                                    {book.type}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {book.publisher}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {book.status}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="border border-gray-300 px-4 py-2 text-center"
                                colSpan={6}
                            >
                                找不到符合條件的書籍
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookListTable;
