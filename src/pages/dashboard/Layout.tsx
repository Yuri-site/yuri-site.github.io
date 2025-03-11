import Sidebar from "../../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar 固定 */}
            <div className="h-screen w-56 bg-slate-800">
                <Sidebar />
            </div>

            {/* Outlet 區域可滾動 */}
            <div className="flex-1 overflow-y-auto">
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

