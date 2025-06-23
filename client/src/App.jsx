import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState, Suspense } from 'react';
import Layout from './components/common/Layout.jsx';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Lazy-loaded components
const Login = React.lazy(() => import('./pages/Login'));
const Home = React.lazy(() => import('./pages/Home.jsx'));
const Register = React.lazy(() => import('./pages/Signup'));
const Team = React.lazy(() => import('./pages/Team/Team.jsx'));
const Task = React.lazy(() => import('./pages/Task/Task.jsx'));
const Logout = React.lazy(() => import('./pages/Logout/Logout.jsx'));
const Report = React.lazy(() => import('./pages/Report/Report.jsx'));
const Project = React.lazy(() => import('./pages/Project/Project.jsx'));
const Service = React.lazy(() => import('./pages/Services/Service.jsx'));
const Feedback = React.lazy(() => import('./pages/Feedback/Feedback.jsx'));
const AddNewTask = React.lazy(() => import('./pages/Task/AddNewTask.jsx'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard.jsx'));
const UserProfile = React.lazy(() => import('./pages/UserProfile/UserProfile.jsx'));
const TermsOfService = React.lazy(() => import('./pages/Terms/TermsofService.jsx'));
const AddNewProject = React.lazy(() => import('./pages/Project/AddNewProject.jsx'));
const Subscribtion = React.lazy(() => import('./pages/Subscription/Subscribtion.jsx'));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy/CookiePolicy.jsx'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy.jsx'));
const PaymentMethods = React.lazy(() => import('./pages/Subscription/PaymentMethods.jsx'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard/AdminDashboard.jsx'));

const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const validateToken = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsValid(false);
          return;
        }

        const decoded = jwtDecode(token);
        setIsValid(decoded.exp * 1000 > Date.now());
      } catch (error) {
        console.error('Token validation error:', error);
        setIsValid(false);
      }
    };

    validateToken();
  }, [location]);

  if (isValid === null) return <div>Loading...</div>;
  return isValid ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

const PublicRoute = () => {
  const token = localStorage.getItem('token');
  return !token ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

const AdminCheck = () => {
  const [authStatus, setAuthStatus] = useState({ isAdmin: false, loading: true });
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setAuthStatus({ isAdmin: false, loading: false });
          return;
        }

        const decoded = jwtDecode(token);
        setAuthStatus({
          isAdmin: decoded?.role === 'admin',
          loading: false
        });
      } catch (error) {
        console.error('Admin check error:', error);
        setAuthStatus({ isAdmin: false, loading: false });
      }
    };

    checkAdmin();
  }, [location]);

  if (authStatus.loading) return <div>Verifying permissions...</div>;
  return authStatus.isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace state={{ from: location }} />;
};

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading application...</div>}>
        <Routes>

          {/* Static Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscribtion />} />
          <Route path="/services" element={<Service />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/logout" element={<Logout />} /> 
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/paymentmethods" element={<PaymentMethods />} />
            
            {/* Admin Routes */}
            <Route element={<AdminCheck />}>
              <Route path="/addtask" element={<AddNewTask />} />
              <Route path="/adminpanel" element={<AdminDashboard />} />
            </Route>

            {/* Layout Wrapped Routes */}
            <Route element={<Layout />}>
              <Route path="/task" element={<Task />} />
              <Route path="/team" element={<Team />} />
              <Route path="/report" element={<Report />} />
              <Route path="/project" element={<Project />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/addproject" element={<AddNewProject />} />
            </Route>
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;