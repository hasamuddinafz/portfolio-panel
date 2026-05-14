// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/auth/LoginPage'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import ProjectPage from './pages/projects/ProjectPage'
import ProjectEditPage from './pages/projects/ProjectEditPage'
import BlogPage from './pages/blog/BlogPage'
import BlogEditPage from './pages/blog/BlogEditPage'
import SettingsPage from './pages/settings/SettingsPage'
import UsersPage from './pages/users/UserPage'
import UserEditPage from './pages/users/UserEditPage'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />

      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Panel — protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/projects/new" element={<ProjectEditPage />} />
            <Route path="/projects/:id/edit" element={<ProjectEditPage />} />

            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/new" element={<BlogEditPage />} />
            <Route path="/blog/:id/edit" element={<BlogEditPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/new" element={<UserEditPage />} />
            <Route path="/users/:id/edit" element={<UserEditPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}