// App.js
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import WorkList from './pages/WorkList';
import NotFound from './pages/NotFound';
import Forum from './pages/Forum';
import Layout from './pages/Layout';
import { Suspense } from 'react';
import Editor from './pages/Editor';

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
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
                path: "/editor",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Editor />
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

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;
