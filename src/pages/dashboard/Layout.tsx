import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            {/* Sidebar fixed */}
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* Outlet scrollable */}
            <div
                className={`transition-all duration-300 ${
                    isCollapsed ? "ml-20" : "ml-64"
                } h-screen overflow-y-auto bg-slate-50`}
            >
                <main className="p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;
