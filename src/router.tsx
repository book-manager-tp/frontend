import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { BookDetail, BookForm, Books, Home, Login, Register } from '@/screens';
import { CategoryBooks } from '@/screens/CategoryBooks';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: '/books',
    element: (
      <Layout>
        <Books />
      </Layout>
    ),
  },
  {
    path: '/category/:categoryId',
    element: (
      <Layout>
        <CategoryBooks />
      </Layout>
    ),
  },
  {
    path: '/books/:id',
    element: (
      <Layout>
        <BookDetail />
      </Layout>
    ),
  },
  {
    path: '/books/new',
    element: (
      <Layout>
        <ProtectedRoute>
          <BookForm />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/books/:id/edit',
    element: (
      <Layout>
        <ProtectedRoute>
          <BookForm />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/my-books',
    element: (
      <Layout>
        <ProtectedRoute>
          <Books />
        </ProtectedRoute>
      </Layout>
    ),
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
