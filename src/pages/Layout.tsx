import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { headerData } from "../js/headerData";

const Layout = () => {
    return (
        <div>
            {/* Persistent Header */}
            <Header
                logoText={headerData.logoText}
                navItems={headerData.navItems}
                dropdownTitle={headerData.dropdownTitle}
                dropdownItems={headerData.dropdownItems}
            />
            {/* Placeholder for child routes */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
