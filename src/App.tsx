import React, { Suspense } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import WorkList from "./pages/WorkList";
import NotFound from "./pages/NotFound";
import Forum from "./pages/Forum";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DashboardLayout from "./pages/dashboard/Layout";
import BookManagementPage from "./pages/dashboard/BookManagement";
import BookTabManagementPage from "./pages/dashboard/BookTabManagement";
import UserManagementPage from "./pages/dashboard/UserManagement";
import CarouselManagementPage from "./pages/dashboard/CarouselManagement";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import LogManagementPage from "./pages/dashboard/LogManagement";
import DashboardHomePage from "./pages/dashboard/Home";
import ArticleManagementPage from "./pages/dashboard/ArticleManagement";

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "/",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <WorkList />
                    </Suspense>
                ),
            },
            {
                path: "/worklist",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <WorkList />
                    </Suspense>
                ),
            },
            {
                path: "/forum",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Forum />
                    </Suspense>
                ),
            },

            {
                path: "/about",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "/privacy",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Privacy />
                    </Suspense>
                ),
            },
            {
                path: "/terms",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Terms />
                    </Suspense>
                ),
            },
        ],
        errorElement: <NotFound />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true, // 這一行是關鍵
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <DashboardHomePage />
                    </Suspense>
                ),
            },
            {
                path: "home",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <DashboardHomePage />
                    </Suspense>
                ),
            },
            {
                path: "book",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <BookManagementPage />
                    </Suspense>
                ),
            },
            {
                path: "carousel",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CarouselManagementPage />
                    </Suspense>
                ),
            },
            {
                path: "article",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <ArticleManagementPage />
                    </Suspense>
                ),
            },
            {
                path: "bookTab",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <BookTabManagementPage />
                    </Suspense>
                ),
            },
            {
                path: "user",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserManagementPage />
                    </Suspense>
                ),
            },
            {
                path: "log",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LogManagementPage />
                    </Suspense>
                ),
            },
        ],
        errorElement: <NotFound />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const App: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default App;
