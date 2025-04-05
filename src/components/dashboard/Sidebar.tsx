import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from '../../api/auth';

interface NavItem {
    title: string;
    link: string;
}

const navItem: NavItem[] = [
    {
        title: "主頁管理",
        link: "/dashboard/home"
    },
    {
        title: "文章管理",
        link: "/dashboard/article"
    },
    {
        title: "書籍管理",
        link: "/dashboard/book"
    },
    {
        title: "分類管理",
        link: "/dashboard/bookTab"
    },
];

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState<string | null>(null);

    useEffect(() => {
        setActiveNav(location.pathname);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();  // Remove token
        navigate('/login');  // Redirect to login page
    };

    return (
        <div className="h-[100vh] flex flex-col justify-between text-white">
            <div>
                <h1 className="justify-center items-center flex pt-12 text-2xl font-bold">
                    Dashboard
                </h1>
                <nav className="mt-8">
                    <ul>
                        {navItem.map((item) => (
                            <li key={item.link} className="mb-2">
                                <Link
                                    to={item.link}
                                    className={`block px-6 py-3 transition-colors duration-300 ${
                                        activeNav === item.link
                                            ? "bg-slate-600 text-white"
                                            : "hover:bg-slate-700"
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <button
                onClick={handleLogout}
                className="w-full py-3 mt-auto bg-slate-100 text-black font-semibold hover:bg-red-200 transition"
            >
                登出
            </button>
        </div>
    );
};

export default Sidebar;
