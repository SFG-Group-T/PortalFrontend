import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

// Components
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

// Page imports
import BookingPage from './pages/BookingPage';
import LecturerBookingPage from './pages/LecturerBookingPage';
import TimetablePage from './pages/TimetablePage';
import MaintenancePage from './pages/MaintenancePage';
import NotificationsPage from './pages/NotificationsPage';
import AdminPage from './pages/AdminPage';

// Role-based protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        
        {/* Protected routes - Student & Lecturer */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['student', 'lecturer', 'admin']}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Student booking route */}
        <Route path="/booking" element={
          <ProtectedRoute allowedRoles={['student', 'admin']}>
            <Layout>
              <BookingPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Lecturer booking management route */}
        <Route path="/lecturer/bookings" element={
          <ProtectedRoute allowedRoles={['lecturer', 'admin']}>
            <Layout>
              <LecturerBookingPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/timetable" element={
          <ProtectedRoute allowedRoles={['student', 'lecturer', 'admin']}>
            <Layout>
              <TimetablePage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/maintenance" element={
          <ProtectedRoute allowedRoles={['student', 'lecturer', 'admin']}>
            <Layout>
              <MaintenancePage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute allowedRoles={['student', 'lecturer', 'admin']}>
            <Layout>
              <NotificationsPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Admin only routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default App; 