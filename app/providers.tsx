'use client';

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { DataProvider } from '../context/DataContext';
import { ScrollToTop } from '../components/ScrollToTop';
import { Layout } from '../components/Layout';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <DataProvider>
          <ScrollToTop />
          <Layout>{children}</Layout>
        </DataProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
