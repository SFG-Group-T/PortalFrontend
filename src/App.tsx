import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

// New page imports (to be created)
import BookingPage from './pages/BookingPage';
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

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

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

        <Route path="/booking" element={
          <ProtectedRoute allowedRoles={['student', 'lecturer', 'admin']}>
            <Layout>
              <BookingPage />
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

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 