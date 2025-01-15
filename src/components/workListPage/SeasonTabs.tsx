interface SeasonTabsProps {
    currentSeason: string;
    setSeason: (season: string) => void;
}

const SeasonTabs: React.FC<SeasonTabsProps> = ({ currentSeason, setSeason }) => {
    const tabs = ["本季更新", "正版代理小說", "台灣原創"];

    return (
        <div className="flex space-x-4 mb-4">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-4 py-2 rounded-lg ${
                        currentSeason === tab
                            ? "bg-pink-500 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setSeason(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default SeasonTabs;
