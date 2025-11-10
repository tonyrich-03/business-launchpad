import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CalendarView from './components/CalendarView'; 
import WeeklyPlanner from './components/WeeklyPlanner';
import DailyPlanner from './components/DailyPlanner';
import BusinessLaunch from './components/businesslaunch/BusinessLaunch';
import Resources from './components/Resources';
import MainNavbar from './components/MainNavbar';
import { SidebarProvider } from './context/SidebarContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ExplorePage from './pages/ExplorePage';
import Sidebar from './components/Layout/Sidebar';
import DashboardNavbar from './components/Layout/DashboardNavbar';
import InboxPage from './pages/InboxPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';

import './index.css';
import type { ReactElement } from 'react';

// Define route configuration type for better maintainability
type AppRoute = {
  path: string;
  element: ReactElement;
  name?: string;
  protected?: boolean;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/auth" />;
};

// Layout Component for authenticated pages
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

// Main App Component
const AppContent = (): ReactElement => {
  // Centralized route configuration
  const routes: AppRoute[] = [
    // Public routes - use MainNavbar
    { path: '/', element: <LandingPage /> },
    { path: '/auth', element: <AuthPage /> },
    { path: '/explore', element: <ExplorePage /> },
    
    // Protected routes with layout
   { 
    path: '/inbox', 
    element: (
     <ProtectedRoute>
       <Layout>
         <InboxPage />
        </Layout>
      </ProtectedRoute>
    ), 
    protected: true 
 },

    { 
      path: '/dashboard', 
      element: (
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      ), 
      protected: true 
    },
    { 
      path: '/calendar', 
      element: (
        <ProtectedRoute>
          <Layout>
            <CalendarView />
          </Layout>
        </ProtectedRoute>
      ), 
      protected: true 
    },
    { 
      path: '/weeklyplanner', 
      element: (
        <ProtectedRoute>
          <Layout>
            <WeeklyPlanner />
          </Layout>
        </ProtectedRoute>
      ), 
      protected: true 
    },
    { 
      path: '/dailyplanner', 
      element: (
        <ProtectedRoute>
          <Layout>
            <DailyPlanner />
          </Layout>
        </ProtectedRoute>
      ), 
      protected: true 
    },
    { 
      path: '/businesslaunch', 
      element: (
        <ProtectedRoute>
          <Layout>
            <BusinessLaunch />
          </Layout>
        </ProtectedRoute>
      ), 
      protected: true 
    },
    { 
      path: '/resources', 
      element: (
        <ProtectedRoute>
          <Layout>
            <Resources />
          </Layout>
        </ProtectedRoute>
      ), 
      protected: true 
    },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* MainNavbar for public routes */}
        <Routes>
          <Route path="/" element={<MainNavbar />} />
          <Route path="/auth" element={<MainNavbar />} />
          <Route path="/explore" element={<MainNavbar />} />
          <Route path="*" element={null} /> {/* No navbar for protected routes */}
        </Routes>
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Protected Routes */}
          {routes.filter(route => route.protected).map((route) => (
            <Route 
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Footer - only show on public pages */}
        <Routes>
          <Route path="/" element={
            <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                  Business Launchpad • Built with React & Tailwind CSS
                  &copy; 2025. All rights reserved.
                </p>
              </div>
            </footer>
          } />
          <Route path="/explore" element={
            <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                  Business Launchpad • Built with React & Tailwind CSS
                  &copy; 2025. All rights reserved.
                </p>
              </div>
            </footer>
          } />
        </Routes>
      </div>
    </Router>
  );
};

// Main App wrapper with AuthProvider
const App = (): ReactElement => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </AuthProvider>
  );
};

export default App;