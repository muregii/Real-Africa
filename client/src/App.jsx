import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import GetMentoredPage from './pages/get-mentored';
import InterviewPage from './pages/categories/Interviews'
import TravelPage from './pages/travel'
import AboutUsPage from './pages/about-us'
import MainLayout from './components/Layout/MainLayout';
import Categories from './pages/categories/opportunities';
import FeaturedCEOs from './pages/categories/features-ceos';
import InterviewSelect from './pages/interview-detail';
import ArticlesPage from './pages/Articles';
import Technology from './pages/categories/technology';
import { useAuth } from "./lib/authContext";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import LoadingSpinner from "./components/LoadingSpinner";
import Communities from './pages/communities'
import CommunityPage from './pages/CommunityPage';
import AdminLayout from "../Admin/AdminLayout";
import AdminDashboard from "../Admin/AdminDashboard";
import AdminUsers from "../Admin/AdminUsers";
import { CoursesPage, CoursePlayerPage } from "./pages/get-mentored";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";



function App() {
  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
      return <LoadingSpinner message="Checking access..." />;
    }

    if (!user) {
      return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
    }

    return children;
  };

  const AdminRoute = ({ children }) => {
    const { user, profile, loading } = useAuth();
    if (loading && !user) {
      return <LoadingSpinner message="Checking access..." />;
    }

    if (!user) {
      return <Navigate to="/auth" replace />;
    }

    if (!profile || profile.role?.toLowerCase() !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId"
              element={
                <ProtectedRoute>
                  <CoursePlayerPage />
                </ProtectedRoute>
              }
            />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route path="/travel" element={             
              <TravelPage />}/>

          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/get-mentored" element={
            <ProtectedRoute>
            <GetMentoredPage />
            </ProtectedRoute>} />
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/opportunities" element={<Categories />} />
          <Route path="/featured-ceos" element={<FeaturedCEOs />} />
          <Route path="/technology" element={
            <ProtectedRoute>
            <Technology /> 
            </ProtectedRoute> } />
        <Route
          path="/communities/:slug"
          element={<CommunityPage />}
        />        
          <Route path="/interviews/:slug" element={<InterviewSelect />} />
          <Route path="/articles/:slug" element={<InterviewSelect />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
  );
}

export default App;