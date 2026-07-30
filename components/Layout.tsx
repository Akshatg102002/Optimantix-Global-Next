'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { FloatingContact } from './FloatingContact';
import { Chatbot } from './Chatbot';
import { usePathname } from 'next/navigation';

import { ContactSection } from './ContactSection';
import { LeadModal } from './LeadModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname() || '/';
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-light font-sans">
      <Header />
      <main className="flex-grow pt-20 pb-20 md:pb-0">
        {children}
      </main>
      <ContactSection />
      <Footer />
      <BottomNav />
      <FloatingContact />
      <Chatbot />
      <LeadModal />
    </div>
  );
};
