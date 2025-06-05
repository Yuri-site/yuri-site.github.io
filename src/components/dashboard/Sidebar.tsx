import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

interface NavItem {
    title: string;
    link: string;
    icon: string;
}

const navItems: NavItem[] = [
    { title: "主頁管理", link: "/dashboard/home", icon: "home" },
    { title: "輪播片管理", link: "/dashboard/carousel", icon: "slideshow" },
    { title: "文章管理", link: "/dashboard/article", icon: "article" },
    { title: "書籍管理", link: "/dashboard/book", icon: "menu_book" },
    { title: "分類管理", link: "/dashboard/bookTab", icon: "category" },
    {
        title: "權限管理",
        link: "/dashboard/user",
        icon: "admin_panel_settings",
    },
    { title: "操作管理", link: "/dashboard/log", icon: "settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-screen z-40 bg-white shadow-lg flex flex-col p-4 space-y-6 transition-all duration-300 ${
                isCollapsed ? "w-20" : "w-64"
            }`}
        >
            <div
                className={`sidebar-header flex ${
                    isCollapsed ? "justify-center" : "justify-between"
                } items-center mb-4`}
            >
                {!isCollapsed && (
                    <h1 className="text-xl font-bold text-slate-800">
                        圖書管理系統
                    </h1>
                )}
                <button
                    className="p-1 rounded-md hover:bg-slate-200"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <span className="material-icons text-slate-600">
                        {isCollapsed ? "menu" : "menu_open"}
                    </span>
                </button>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.link}
                        to={item.link}
                        className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            location.pathname === item.link
                                ? "bg-blue-500 text-white shadow-md"
                                : "text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        <span className="material-icons">{item.icon}</span>
                        {!isCollapsed && (
                            <p className="nav-text text-sm font-medium">
                                {item.title}
                            </p>
                        )}
                    </Link>
                ))}
            </nav>

            <button
                onClick={handleLogout}
                className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-red-200 transition-colors"
            >
                <span className="material-icons">logout</span>
                {!isCollapsed && (
                    <p className="nav-text text-sm font-medium">登出</p>
                )}
            </button>
        </aside>
    );
};

export default Sidebar;
