import { Book } from "../../data/bookListData";

const MAX_VISIBLE_TAGS = 2;

interface BookCardProps extends Book {
    onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ title, date, author, type, publisher, status, imageUrl, onClick }) => {
    const tags = [type, publisher, status];
    const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
    const hiddenTagCount = tags.length - MAX_VISIBLE_TAGS;

    return (
        <div
            className="font-notoTC border-2 mt-8 max-w-sm w-72 bg-white border border-gray-500 rounded-xl shadow-md overflow-hidden"
        >
            {/* Image Section */}
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center cursor-pointer"
                onClick={() => onClick({ title, date,  author, type, publisher, status, imageUrl })}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-64 object-cover"
                    />
                ) : (
                    <span className="text-gray-500">No Image</span>
                )}
            </div>

            {/* Content Section */}
            <div className="border-t-2 border-gray-500 p-4 max-h-40">
                <h3 className="line-clamp-2 overflow-hidden text-ellipsis text-lg font-bold text-gray-800 cursor-pointer"
                    onClick={() => onClick({ title, date,  author, type, publisher, status, imageUrl })}
                >
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{author}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {visibleTags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-sm bg-gray-400 text-gray-100 px-2 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {hiddenTagCount > 0 && (
                        <span className="text-sm bg-gray-400 text-gray-100 px-2 py-1 rounded-full">
                            +{hiddenTagCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
