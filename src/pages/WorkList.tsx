import { useState } from "react";
import SeasonTabs from "../components/workListPage/SeasonTabs";
import ViewModeSwitch from "../components/workListPage/ViewModeSwitch";
import BookList from "../components/workListPage/BookList";

const WorkList = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [seasonUpdate, setSeasonUpdate] = useState("本季更新");

    return (
        <div className="flex flex-col items-center w-full p-4">
            {/* 選擇標籤 */}
            <SeasonTabs currentSeason={seasonUpdate} setSeason={setSeasonUpdate} />

            {/* Grid/List 切換 */}
            <ViewModeSwitch currentView={viewMode} setViewMode={setViewMode} />

            {/* 顯示內容 */}
            <BookList viewMode={viewMode} />
        </div>
    );
};

export default WorkList;
