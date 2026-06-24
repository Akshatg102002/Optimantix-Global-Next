
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DataProvider } from './context/DataContext';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
import RouteSEO from './components/RouteSEO';
import { INITIAL_SERVICES } from './constants';

// Lazy load pages to enable loading animation and code splitting
const Home = lazy(() => import('./views/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./views/About').then(module => ({ default: module.About })));
const ServicesPage = lazy(() => import('./views/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ServiceTemplate = lazy(() => import('./views/ServiceTemplate').then(module => ({ default: module.ServiceTemplate })));
const SubServiceTemplate = lazy(() => import('./views/SubServiceTemplate').then(module => ({ default: module.SubServiceTemplate })));
const BlogList = lazy(() => import('./views/BlogList').then(module => ({ default: module.BlogList })));
const BlogPost = lazy(() => import('./views/BlogPost').then(module => ({ default: module.BlogPost })));
const CaseStudyList = lazy(() => import('./views/CaseStudyList').then(module => ({ default: module.CaseStudyList })));
const CaseStudyTemplate = lazy(() => import('./views/CaseStudyTemplate').then(module => ({ default: module.CaseStudyTemplate })));
const GoogleWorkspace = lazy(() => import('./views/GoogleWorkspace').then(module => ({ default: module.GoogleWorkspace })));
const HostingSolutions = lazy(() => import('./views/HostingSolutions').then(module => ({ default: module.HostingSolutions })));
const Contact = lazy(() => import('./views/Contact').then(module => ({ default: module.Contact })));
const CaseStudies = lazy(() => import('./views/CaseStudies').then(module => ({ default: module.CaseStudies })));
const CaseDetails = lazy(() => import('./views/CaseDetails').then(module => ({ default: module.CaseDetails })));
const SeoPage = lazy(() => import('./views/SeoPage').then(module => ({ default: module.SeoPage })));
const SeoAudit = lazy(() => import('./views/SeoAudit').then(module => ({ default: module.SeoAudit })));
const PageTemplate = lazy(() => import('./views/PageTemplate').then(module => ({ default: module.PageTemplate })));
const AdminDashboard = lazy(() => import('./views/Admin/Dashboard').then(module => ({ default: module.AdminDashboard })));
const AdminLogin = lazy(() => import('./views/Admin/Login').then(module => ({ default: module.AdminLogin })));
const FreeToolsHub = lazy(() => import('./views/FreeToolsHub').then(module => ({ default: module.FreeToolsHub })));
const ToolPage = lazy(() => import('./views/ToolPage').then(module => ({ default: module.ToolPage })));
const NotFound = lazy(() => import('./views/NotFound').then(module => ({ default: module.NotFound })));

import { ErrorBoundary } from './components/ErrorBoundary';

// /services/:slug is shared by two kinds of pages: built-in services defined
// in INITIAL_SERVICES (ServiceTemplate) and custom admin-authored pages
// stored in Firestore (PageTemplate, formerly at /pages/:slug). Dispatch on
// the slug to render the right one.
const ServiceSlugRouter: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const isBuiltInService = INITIAL_SERVICES.some((service) => service.slug === slug);
  return isBuiltInService ? <ServiceTemplate /> : <PageTemplate />;
};

// Old custom-page URLs used the /pages/:slug prefix; redirect them to the
// new /services/:slug location so previously published/indexed links keep working.
const LegacyPageRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/services/${slug}`} replace />;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <DataProvider>
        <Router>
          <RouteSEO />
          <ScrollToTop />
          <Layout>
            <Suspense fallback={null}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/digital-marketing/seo" element={<SeoPage />} />
              <Route path="/services/:slug" element={<ServiceSlugRouter />} />
              <Route path="/services/:slug/:subSlug" element={<SubServiceTemplate />} />
              <Route path="/free-seo-audit" element={<SeoAudit />} />
              <Route path="/free-tools" element={<FreeToolsHub />} />
              <Route path="/free-tools/:slug" element={<ToolPage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/pages/:slug" element={<LegacyPageRedirect />} />
              <Route path="/case-studies" element={<CaseStudyList />} />
              <Route path="/case-studies/:slug" element={<CaseStudyTemplate />} />
              <Route path="/case" element={<CaseStudies />} />
              <Route path="/case/:slug" element={<CaseDetails />} />
              <Route path="/google-workspace" element={<GoogleWorkspace />} />
              <Route path="/hosting" element={<HostingSolutions />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </DataProvider>
    </ErrorBoundary>
  );
};

export default App;
