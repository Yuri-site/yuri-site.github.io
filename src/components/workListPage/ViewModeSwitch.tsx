import { FaThLarge, FaList } from "react-icons/fa"; // Import grid and list icons

interface ViewModeSwitchProps {
    currentView: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
}

const ViewModeSwitch: React.FC<ViewModeSwitchProps> = ({ currentView, setViewMode }) => {
    const getButtonClasses = (mode: "grid" | "list") =>
        `p-2 rounded-lg ${
            currentView === mode
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-800"
        }`;

    return (
        <div className="flex justify-between w-full max-w-4xl mb-4">
            <div className="flex items-center space-x-2">
                <span className="text-gray-700">顯示模式：</span>
                <button
                    className={getButtonClasses("grid")}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid View"
                >
                    <FaThLarge className="w-6 h-6" /> {/* Using FaThLarge for a grid */}
                </button>
                <button
                    className={getButtonClasses("list")}
                    onClick={() => setViewMode("list")}
                    aria-label="List View"
                >
                    <FaList className="w-6 h-6" /> {/* Using FaList for list */}
                </button>
            </div>
        </div>
    );
};

export default ViewModeSwitch;
