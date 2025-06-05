import { Link } from "react-router-dom";

const DashboardHomePage = () => {
    const cards = [
        {
            title: "文章管理",
            description: "管理新聞公告與專欄內容。",
            icon: "article",
            link: "/dashboard/article",
        },
        {
            title: "書籍管理",
            description: "新增、修改或刪除書籍資料。",
            icon: "menu_book",
            link: "/dashboard/book",
        },
        {
            title: "分類管理",
            description: "設定書籍分類與標籤。",
            icon: "category",
            link: "/dashboard/bookTab",
        },
        {
            title: "權限管理",
            description: "設定使用者權限與角色。",
            icon: "admin_panel_settings",
            link: "/dashboard/user",
        },
        {
            title: "操作管理",
            description: "查看與追蹤網站操作記錄。",
            icon: "settings",
            link: "/dashboard/log",
        },
    ];

    return (
        <div className="bg-white shadow-xl rounded-lg p-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">主頁管理</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <Link
                        to={card.link}
                        key={card.title}
                        className="bg-slate-50 hover:bg-slate-100 p-4 rounded-lg shadow-md transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-icons text-slate-700 text-3xl">
                                {card.icon}
                            </span>
                            <h2 className="text-lg font-semibold text-slate-700">
                                {card.title}
                            </h2>
                        </div>
                        <p className="text-slate-600 text-sm">
                            {card.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DashboardHomePage;
