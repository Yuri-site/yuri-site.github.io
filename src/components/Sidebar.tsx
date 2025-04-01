import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";



interface NavItem {
    text: string;
    link: string;
}

interface SidebarProps {
    isOpen: boolean;
    navItems: NavItem[];
    dropdownTitle: string;
    dropdownItems: string[];
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, navItems, dropdownTitle, dropdownItems, onClose }) => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [activeNav, setActiveNav] = useState<string | null>(null);
    
    // Update active navigation state based on pathname
    useEffect(() => {
        setActiveNav(location.pathname);
    }, [location.pathname]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`font-notoTC fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-pink-300 text-white shadow-lg transform transition-transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } z-50`}
            >
                {/* Close Button */}
                <button
                    className="text-xl p-4 focus:outline-none"
                    onClick={onClose}
                >
                    <i className="fas fa-times"></i>
                </button>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4 mt-4 px-6">
                    {navItems.map((item) => (
                       <Link
                                key={item.text}
                                to={item.link}
                                className={`text-xl font-bold px-4 py-2 rounded-full transition-colors ${
                                    activeNav === item.link
                                        ? "bg-white text-pink-500"
                                        : "hover:bg-white hover:text-pink-500"
                                }`}
                            >
                                {item.text}
                        </Link>
                    ))}

                    {/* Dropdown Menu */}
                    <div>
                        <button
                            className="text-xl font-bold mb-2 flex items-center px-4"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {dropdownTitle} &nbsp;
                            <span>{isDropdownOpen ? " ▲" : " ▼"}</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="space-y-2 bg-pink-400 rounded-md p-2">
                                {dropdownItems.map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className={`block px-4 py-2 rounded-full transition-colors ${
                                            activeNav === item
                                                ? "bg-white text-pink-500"
                                                : "hover:bg-gray-100"
                                        }`}
                                        onMouseEnter={() => setActiveNav(item)}
                                        onMouseLeave={() => setActiveNav(null)}
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    dropdownTitle: PropTypes.string.isRequired,
    dropdownItems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Sidebar;
