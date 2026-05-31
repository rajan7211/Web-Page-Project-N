import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerProfile from './pages/customer/Profile';
import CustomerOrders from './pages/customer/Orders';
import CustomerSettings from './pages/customer/Settings';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminCustomers from './pages/admin/Customers';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// Super Admin Pages
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import SuperAdminUsers from './pages/super-admin/Users';
import SuperAdminAdmins from './pages/super-admin/Admins';
import SuperAdminAnalytics from './pages/super-admin/Analytics';
import SuperAdminSettings from './pages/super-admin/Settings';

// Error Pages
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

// Protected Route Component
function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && currentUser && !roles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Public Route Component (redirect authenticated users to dashboard)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, currentUser, getDashboardRoute } = useAuth();

  if (isAuthenticated && currentUser) {
    return <Navigate to={getDashboardRoute(currentUser.role)} replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes (redirect if authenticated) */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Customer Routes */}
              <Route
                path="/customer"
                element={
                  <ProtectedRoute roles={['Customer']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/profile"
                element={
                  <ProtectedRoute roles={['Customer']}>
                    <CustomerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/orders"
                element={
                  <ProtectedRoute roles={['Customer']}>
                    <CustomerOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/settings"
                element={
                  <ProtectedRoute roles={['Customer']}>
                    <CustomerSettings />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/customers"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <AdminCustomers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <AdminReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />

              {/* Super Admin Routes */}
              <Route
                path="/super-admin"
                element={
                  <ProtectedRoute roles={['Super Admin']}>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/super-admin/users"
                element={
                  <ProtectedRoute roles={['Super Admin']}>
                    <SuperAdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/super-admin/admins"
                element={
                  <ProtectedRoute roles={['Super Admin']}>
                    <SuperAdminAdmins />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/super-admin/analytics"
                element={
                  <ProtectedRoute roles={['Super Admin']}>
                    <SuperAdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/super-admin/settings"
                element={
                  <ProtectedRoute roles={['Super Admin']}>
                    <SuperAdminSettings />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="light"
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;



