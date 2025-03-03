import Sidebar from "../../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { headerData } from "../../data/headerData";

const DashboardLayout = () => {
    return (
        <div className="flex">
            {/* Persistent Header */}
            <div className="h-screen w-56 bg-slate-800">
                <Sidebar />
            </div>
            {/* Placeholder for child routes */}
            <div className="w-full">
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
