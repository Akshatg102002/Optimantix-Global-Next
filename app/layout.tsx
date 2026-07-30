import type { Metadata } from 'next';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../utils/buildPageSeo';
import { SITE_URL } from '../data/seoData';
import { Providers } from './providers';
import './globals.css';

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png';

// Mirrors the static fallback tags previously in index.html — these are the
// defaults every route's generateMetadata overrides via title.absolute / etc.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s',
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: 'Optimantix Global – Digital Marketing Agency',
    description: 'Expert digital marketing services including SEO, PPC, Meta Ads, and marketplace management.',
    url: SITE_URL,
    type: 'website',
    images: [DEFAULT_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optimantix Global – Digital Marketing Agency',
    description: 'Expert SEO, PPC, Meta Ads & marketplace management. 10+ years of results.',
    images: [DEFAULT_IMAGE],
  },
  verification: {
    google: 'Fv4YicX392wMw9Ke1O15AjauwpZMedHoqQHQDsFonRc',
  },
  alternates: {
    types: {
      'application/xml': '/sitemap.xml',
    },
  },
  icons: {
    icon: [
      { url: 'https://res.cloudinary.com/dusvykklu/image/upload/v1780136082/favicon_guwuu5.svg', type: 'image/svg+xml' },
      { url: 'https://res.cloudinary.com/dusvykklu/image/upload/v1780136083/favicon-96x96_wyozi2.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: 'https://res.cloudinary.com/dusvykklu/image/upload/v1780136083/favicon_j42zup.ico',
    apple: 'https://res.cloudinary.com/dusvykklu/image/upload/v1780136083/apple-touch-icon_frt4sc.png',
  },
};

const HOME_FALLBACK_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Optimantix Global',
    description:
      'Optimantix Global is a premier digital marketing, web development, and performance scaling agency. Transform your digital presence with expert SEO, Google Ads, Meta Ads, E-commerce, and Web Development services. Trusted by 100s of brands with 10+ years of proven results.',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE, width: 200, height: 200, name: 'Optimantix Global Logo' },
    image: DEFAULT_IMAGE,
    email: 'contact@optimantix.com',
    telephone: '+91-9910343016',
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'Customer Service', telephone: '+91-9910343016', email: 'contact@optimantix.com', areaServed: ['IN', 'Global'], availableLanguage: ['en', 'hi'] },
      { '@type': 'ContactPoint', contactType: 'Sales', telephone: '+91-9910343016', email: 'sales@optimantix.com', areaServed: ['IN'], availableLanguage: ['en', 'hi'] },
      { '@type': 'ContactPoint', contactType: 'Support', telephone: '+91-9910343016', email: 'support@optimantix.com', areaServed: ['IN'], availableLanguage: ['en', 'hi'] },
    ],
    address: { '@type': 'PostalAddress', streetAddress: 'Noida, Uttar Pradesh', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', postalCode: '201301', addressCountry: 'IN' },
    sameAs: [
      'https://www.facebook.com/optimantix',
      'https://www.instagram.com/optimantix',
      'https://in.linkedin.com/company/optimantix',
      'https://in.pinterest.com/OptimantiXglobal1',
    ],
    foundingDate: '2010-01-01',
    areaServed: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Dubai', 'Global'],
    knowsAbout: [
      'Search Engine Optimization', 'Google Ads Management', 'Meta Ads Management', 'E-commerce Management',
      'Web Development', 'Web Design', 'Performance Scaling', 'Marketplace Management',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Optimantix Global',
    url: SITE_URL,
    description: 'Digital marketing, web development & performance scaling agency',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Root-level Organization/WebSite JSON-LD — server-rendered, present
            before any JS runs. Route-specific schema is added per-page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FALLBACK_SCHEMA) }}
        />

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
