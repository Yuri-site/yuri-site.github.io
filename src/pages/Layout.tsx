import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { headerData } from "../data/headerData";
import ScrollToTop from "../components/utils/ScrollToTop";

const Layout = () => {
    return (
        <div>
            <ScrollToTop />

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
            <Footer></Footer>
        </div>
    );
};

export default Layout;
