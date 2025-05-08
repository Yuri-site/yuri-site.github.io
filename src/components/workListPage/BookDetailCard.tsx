import { Book } from "../../types";

interface BookDetailProps {
    selectedBook: Book | null;
    closeDetailModal: () => void;
    colTabs: { key: keyof Book; label: string }[];
}

const BookDetailCard: React.FC<BookDetailProps> = ({ selectedBook, closeDetailModal, colTabs }) => {
    if (!selectedBook) return null;

    const hasImage = Boolean(selectedBook.imageUrl);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeDetailModal}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto p-6 animate-fadeIn w-[90vw] ${!hasImage ? 'md:w-[35vw]' : 'md:w-[50vw]'}`}
            >
                {/* Title + Close */}
                <div className="flex justify-between items-center mb-12">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {selectedBook.title}
                    </h3>
                </div>

                {/* Main layout: image + info */}
                <div className={`flex flex-col md:flex-row gap-6`}>
                    {/* 圖片區（有圖片才顯示） */}
                    {hasImage && (
                        <div className="flex-shrink-0 w-full md:w-[50%] h-[40vh] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                            <img
                                src={selectedBook.imageUrl}
                                alt={selectedBook.title}
                                className="object-cover h-full object-contain"
                            />
                        </div>
                    )}

                    {/* 資訊區，寬度自動撐滿 */}
                    <div className={`flex-1 space-y-3 ${!hasImage ? 'w-full' : ''}`}>
                        {colTabs.map((col, index) => (
                            <div key={index} className="flex justify-between text-gray-700">
                                <span className="font-semibold">{col.label}</span>
                                <span className="text-right break-words max-w-[60%]">
                                    {selectedBook[col.key] || "-"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Button */}
                <div className="mt-6 text-right">
                    <button
                        onClick={closeDetailModal}
                        className="shadow-md bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full transition"
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    );
};



export default BookDetailCard;
