// src/App.tsx
import React, { Suspense } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import WorkList from './pages/WorkList';
import NotFound from './pages/NotFound';
import Forum from './pages/Forum';
import Layout from './pages/Layout';
import Editor from './pages/Editor';
import DashboardLayout from './pages/dashboard/Layout';
import BookManagementPage from './pages/dashboard/BookManagement';
import BookTabManagementPage from './pages/dashboard/BookTabManagement';
import CarouselManagementPage from './pages/dashboard/CarouselManagement';
import ProtectedRoute from './pages/ProtectedRoute'; // Import ProtectedRoute
import Login from './pages/Login';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/worklist',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WorkList />
          </Suspense>
        ),
      },
      {
        path: '/forum',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Forum />
          </Suspense>
        ),
      },
      {
        path: '/editor',
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
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'book',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BookManagementPage />
          </Suspense>
        ),
      },
      {
        path: 'home',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CarouselManagementPage />
          </Suspense>
        ),
      },
      {
        path: 'article',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CarouselManagementPage />
          </Suspense>
        ),
      },
      {
        path: 'bookTab',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BookTabManagementPage />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
