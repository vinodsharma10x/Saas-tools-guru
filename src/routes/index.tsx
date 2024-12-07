import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { ToolDetailPage } from '../pages/ToolDetailPage';
import { AdminToolPage } from '../pages/AdminToolPage';
import { CategoriesPage } from '../pages/CategoriesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'tools/:toolId',
        element: <ToolDetailPage />,
      },
      {
        path: 'admin/tools/:toolId',
        element: <AdminToolPage />,
      },
    ],
  },
]);