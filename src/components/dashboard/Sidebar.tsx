import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
    title: string;
    link: string;
}

const navItem: NavItem[] = [
    {
        title: "主頁管理",
        link: "/dashboard"
    },
    {
        title: "文章管理",
        link: "/dashboard/article"
    },
    {
        title: "書籍管理",
        link: "/dashboard/book"
    },
];

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [activeNav, setActiveNav] = useState<string | null>(null);

    useEffect(() => {
        setActiveNav(location.pathname);
    }, [location.pathname]);

    return (
        <div className="text-white">
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
    );
};

export default Sidebar;
