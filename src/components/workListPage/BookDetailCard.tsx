import React from "react";
import { Book } from "../../data/bookListData";

interface BookDetailProps {
    selectedBook: Book | null;
    closeDetailModal: () => void;
}

const BookDetailCard: React.FC<BookDetailProps> = ({ selectedBook, closeDetailModal }) => {
    if (!selectedBook) return null;

    return (
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
    );
};

export default BookDetailCard;
