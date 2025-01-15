import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import WorkList from "./pages/WorkList";
import NotFound from "./pages/NotFound";
import Forum from "./pages/Forum";
import Layout from "./pages/Layout";

// 有空再實作 Skeleton
// import { Suspense } from "react";
// import HomeSkeleton from "./components/HomeSkeleton";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Use Layout to persist common components like Header
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/worklist",
                element: <WorkList />,
            },
            {
                path: "/forum",
                element: <Forum />,
            },
        ],
        errorElement: <NotFound />, // Handle errors for the Layout route
    },
    {
        path: "*",
        element: <NotFound />, // Fallback for undefined routes
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
