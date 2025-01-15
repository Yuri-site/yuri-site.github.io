import { Book } from "../../js/bookListData";

const MAX_VISIBLE_TAGS = 2; // 設定可顯示的最大標籤數

const BookCard: React.FC<Book> = ({ title, author, type, publisher, status, imageUrl }) => {
    // 將 date、type、publisher 和 status 整合成 tags
    const tags = [type, publisher, status];

    // 計算需要顯示的標籤和隱藏的數量
    const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
    const hiddenTagCount = tags.length - MAX_VISIBLE_TAGS;

    return (
        <div className="font-notoTC border-2 mt-8 max-w-sm w-72 bg-white border border-gray-500 rounded-xl shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
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
                {/* Title */}
                <h3 className="line-clamp-2 overflow-hidden text-ellipsis text-lg font-bold text-gray-800">
                    {title}
                </h3>

                {/* Author */}
                <p className="text-gray-600 text-sm mt-1">{author}</p>

                {/* Tags */}
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
