import { useState } from "react";

const ArticleManagementPage = () => {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    return (
        <main className="flex-1 p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-bold text-slate-800 font-serif">
                        文章管理
                    </h2>
                    <p className="text-slate-600 mt-1">
                        查看、編輯、管理文章。
                    </p>
                </div>
                <button
                    className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
                    type="button"
                >
                    <span className="material-icons mr-2 text-base">
                        add_circle_outline
                    </span>
                    新增文章
                </button>
            </header>

            <div className="bg-white shadow-xl rounded-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative">
                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                search
                            </span>
                            <input
                                className="form-input pl-10 pr-4 py-2.5 rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-slate-400 text-sm w-72"
                                placeholder="搜尋文章..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <select
                                className="form-select rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 text-sm"
                                value={categoryFilter}
                                onChange={(e) =>
                                    setCategoryFilter(e.target.value)
                                }
                            >
                                <option value="">分類</option>
                                <option>小說</option>
                                <option>漫畫</option>
                            </select>
                            <select
                                className="form-select rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 text-sm"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <option value="">狀態</option>
                                <option>公開</option>
                                <option>草稿</option>
                                <option>封存</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">
                                        標題
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        分類
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        作者
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        狀態
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        公開日期
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-center">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example row */}
                                <tr className="bg-white border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        百合小說推薦
                                    </td>
                                    <td className="px-6 py-4">小說</td>
                                    <td className="px-6 py-4">HeHe</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                            公開
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">2025-06-01</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-1.5 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors">
                                            <span className="material-icons text-xl">
                                                edit
                                            </span>
                                        </button>
                                        <button className="p-1.5 text-slate-500 hover:text-red-600 rounded-md hover:bg-slate-100 transition-colors">
                                            <span className="material-icons text-xl">
                                                delete
                                            </span>
                                        </button>
                                        <button className="p-1.5 text-slate-500 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
                                            <span className="material-icons text-xl">
                                                more_horiz
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Add more rows dynamically here */}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center pt-6">
                        <span className="text-sm text-slate-600">
                            共 1 筆文章，顯示第 1 筆
                        </span>
                        <nav className="flex items-center space-x-1">
                            <button
                                className="p-2 rounded-md hover:bg-slate-100 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled
                            >
                                <span className="material-icons text-xl">
                                    chevron_left
                                </span>
                            </button>
                            <button className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white font-medium">
                                1
                            </button>
                            <button className="p-2 rounded-md hover:bg-slate-100 text-slate-500">
                                <span className="material-icons text-xl">
                                    chevron_right
                                </span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ArticleManagementPage;
