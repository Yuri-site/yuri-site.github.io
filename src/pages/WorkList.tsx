import { useState, useEffect } from "react";
import BooksTabs from "../components/workListPage/BooksTabs";
import ViewModeSwitch from "../components/workListPage/ViewModeSwitch";
import BookList from "../components/workListPage/BookList";

const WorkList = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <div className="flex flex-col items-center w-screen p-4 mt-12 min-h-[120vh]">
            {/* select tabs */}
            <BooksTabs />

            {/* Grid/List switch */}
            <div className="flex items-center justify-end w-full max-w-4xl mb-4">
                <input
                    type="text"
                    placeholder="搜尋作品"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="min-w-12 mt-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <ViewModeSwitch currentView={viewMode} setViewMode={setViewMode} />
            </div>

            {/* Book list */}
            <BookList viewMode={viewMode} searchQuery={debouncedSearchQuery} />
        </div>
    );
};

export default WorkList;
