import { useEffect, useState } from "react";
import { useBookTabStore } from "../../store/booksTab";
import { fetchBookTabs } from "../../api/bookTab";  // 假設這是向後端請求資料的函數

const BooksTabs: React.FC = () => {
    const currentSeason = useBookTabStore((state) => state.currentSeason);
    const setSeason = useBookTabStore((state) => state.setSeason);

    const [tabData, setTabData] = useState<string[]>([]); // 用來存放後端返回的 tab 資料
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTabs = async () => {
            try {
                const tabs = await fetchBookTabs(); // 向後端請求 bookTabs
                setTabData(tabs.map((tab: { title: string }) => tab.title)); // 假設後端返回的每個 tab 有 `title` 屬性
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
                        key={tab}
                        className={`sm:h-12 h-20 line-clamp-2 overflow-hidden text-ellipsis w-full sm:w-48 h-12 px-4 py-2 rounded-lg ${
                            currentSeason === tab
                                ? "bg-pink-500 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => setSeason(tab)}
                    >
                        {tab}
                    </button>
                ))
            )}
        </div>
    );
};

export default BooksTabs;
