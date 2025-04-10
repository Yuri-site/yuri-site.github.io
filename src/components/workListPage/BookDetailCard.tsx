import { Book } from "../../types";

interface BookDetailProps {
    selectedBook: Book | null;
    closeDetailModal: () => void;
    colTabs: { key: keyof Book; label: string }[];
}

const BookDetailCard: React.FC<BookDetailProps> = ({ selectedBook, closeDetailModal, colTabs }) => {
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
                {/* Display by colTabs */}
                {colTabs.map((col, index) => (
                    <p key={index}>
                        <strong>{col.label}:</strong> {selectedBook[col.key] || "-"}
                    </p>
                ))}
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
