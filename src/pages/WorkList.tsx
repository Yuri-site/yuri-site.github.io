import { useState } from "react";
import SeasonTabs from "../components/workListPage/SeasonTabs";
import ViewModeSwitch from "../components/workListPage/ViewModeSwitch";
import BookList from "../components/workListPage/BookList";

const WorkList = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [seasonUpdate, setSeasonUpdate] = useState("本季更新");
    const [searchQuery, setSearchQuery] = useState(""); // 搜尋框狀態

    return (
        <div className="flex flex-col items-center w-full p-4 mt-12">
            {/* 選擇標籤 */}
            <SeasonTabs currentSeason={seasonUpdate} setSeason={setSeasonUpdate} />

            {/* Grid/List 切換與搜尋框 */}
            <div className="flex items-center justify-end w-full max-w-4xl mb-4">
                <input
                    type="text"
                    placeholder="搜尋作品"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className=" mt-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <ViewModeSwitch currentView={viewMode} setViewMode={setViewMode} />
            </div>

            {/* 顯示內容 */}
            <BookList viewMode={viewMode} searchQuery={searchQuery} />
        </div>
    );
};

export default WorkList;
