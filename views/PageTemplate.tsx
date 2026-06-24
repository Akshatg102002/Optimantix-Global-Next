'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useData } from '../context/DataContext';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ParallaxHero } from '../components/ParallaxHero';
import { ShareButtons } from '../components/ShareButtons';
import { RichContent } from '../components/RichContent';
import { SITE_URL } from '../data/seoData';

// SEO (title/meta/canonical/JSON-LD) for this route is owned by RouteSEO,
// which resolves custom admin pages via the three-tier system (Firebase
// override > this page's own metaTitle/schemaType > fallback). See
// components/RouteSEO.tsx and utils/buildPageSchema.ts.
export const PageTemplate: React.FC = () => {
  const params = useParams() ?? {};
  const slug = params.slug as string;
  const router = useRouter();
  const { pages, pagesLoaded } = useData();
  const page = pages.find(p => p.slug === slug && p.isPublished);

  useEffect(() => {
    if (pagesLoaded && !page) {
      router.replace('/404');
    }
  }, [pagesLoaded, page, router]);

  if (!pagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) {
    return null;
  }

  const currentUrl = `${SITE_URL}/services/${page.slug}`;

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <ParallaxHero
        title={page.title}
        imageUrl={page.imageUrl}
        imageAltText={page.imageAltText}
        height="50vh"
        overlayOpacity={0.7}
      />

      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-gray-500 font-medium mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 dark:text-white line-clamp-1 truncate">{page.title}</span>
        </nav>

        <article className="flex-1 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 max-w-4xl mx-auto">
          <RichContent content={page.content} variant="page" imageAlt={page.imageAltText || page.title} />
          <ShareButtons title={page.title} url={currentUrl} />

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
            <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition font-medium">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>
            <span className="text-xs">Published {new Date(page.createdAt).toLocaleDateString()}</span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PageTemplate;
