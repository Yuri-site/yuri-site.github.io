import { useEffect, useState } from "react";
import { useBookTabStore } from "../../store/booksTab";
import { fetchBookTabs } from "../../api/bookTab";
import { BookTab } from "../../types";

const BooksTabs: React.FC = () => {
    const currentSeason = useBookTabStore((state) => state.currentSeason);
    const setSeason = useBookTabStore((state) => state.setSeason);

    const [tabData, setTabData] = useState<BookTab[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTabs = async () => {
            try {
                const tabs = await fetchBookTabs();
                const sortedTabs = tabs
                    .sort((a: BookTab, b: BookTab) => a.order - b.order)
                    .map((tab: BookTab) => ({
                        _id: tab._id,
                        title: tab.title,
                        order: tab.order,
                        col_tabs: tab.col_tabs,
                    }));
                setTabData(sortedTabs);
            } catch (err) {
                setError("載入分類失敗");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadTabs();
    }, []);

    return (
        <div className="flex mb-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
                <p>載入中...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                tabData.map((tab) => (
                    <button
                        key={tab._id}
                        className={`font-bold shadow-md sm:h-16 h-20 line-clamp-2 transition-all duration-300 overflow-hidden text-ellipsis w-full sm:w-48 h-12 px-4 py-2 rounded-md ${
                            currentSeason === tab.title
                                ? "bg-pink-400 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-pink-200"
                        }`}
                        onClick={() => setSeason(tab.title)}
                    >
                        {tab.title}
                    </button>
                ))
            )}
        </div>
    );
};

export default BooksTabs;
