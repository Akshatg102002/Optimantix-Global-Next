'use client';

import React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { DataProvider } from '../context/DataContext';
import { ScrollToTop } from '../components/ScrollToTop';
import { Layout } from '../components/Layout';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <DataProvider>
        <ScrollToTop />
        <Layout>{children}</Layout>
      </DataProvider>
    </ErrorBoundary>
  );
}
