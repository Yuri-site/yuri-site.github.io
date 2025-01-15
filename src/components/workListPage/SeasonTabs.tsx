import tabData  from "../../data/workListTabData";

interface SeasonTabsProps {
    currentSeason: string;
    setSeason: (season: string) => void;
}

const SeasonTabs: React.FC<SeasonTabsProps> = ({ currentSeason, setSeason }) => {

    return (
        <div className="flex mb-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tabData.map((tab) => (
                <button
                    key={tab}
                    className={` sm:h-12 h-20 line-clamp-2 overflow-hidden text-ellipsis w-full sm:w-48 h-12 px-4 py-2 rounded-lg ${
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
