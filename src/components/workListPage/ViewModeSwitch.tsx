import { FaThLarge, FaList } from "react-icons/fa";
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
        <div className="flex ml-8 max-w-4xl mt-8 mr-4">
            <div className="flex items-center space-x-2">
                <button
                    className={getButtonClasses("grid")}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid View"
                >
                    <FaThLarge className="w-6 h-6" />
                </button>
                <button
                    className={getButtonClasses("list")}
                    onClick={() => setViewMode("list")}
                    aria-label="List View"
                >
                    <FaList className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default ViewModeSwitch;
