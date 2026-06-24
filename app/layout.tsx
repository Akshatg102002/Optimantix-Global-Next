import type { Metadata } from 'next';
import Script from 'next/script';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../utils/buildPageSeo';
import { SITE_URL } from '../data/seoData';
import { Providers } from './providers';

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

        {/* Tailwind is loaded via CDN in the original app (no build-time
            postcss/tailwind config exists in this repo) — kept identical
            here so styling is pixel-for-pixel the same. */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              darkMode: 'class',
              theme: {
                container: {
                  center: true,
                  padding: '1rem',
                  screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1200px' },
                },
                extend: {
                  colors: {
                    primary: '#0056b3',
                    secondary: '#004494',
                    dark: '#121212',
                    light: '#f8fafc',
                    'dark-card': '#111111',
                    'dark-lighter': '#1a1a1a',
                  },
                  fontFamily: { sans: ['Inter', 'sans-serif'] },
                },
              },
            }
          `}
        </Script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
          .dark body { background-color: #121212; color: #f8fafc; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

          .rich-content { color: #2d2d2d; }
          .dark .rich-content { color: #cbd5e1; }
          .rich-content h2 { font-size: 1.875rem; font-weight: 700; color: #1a1a1a; margin-top: 2.5rem; margin-bottom: 1rem; border-left: 4px solid #0056b3; padding-left: 14px; line-height: 1.25; }
          .rich-content h3 { font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-top: 2rem; margin-bottom: 0.75rem; border-left: 4px solid #0056b3; padding-left: 14px; }
          .rich-content h4 { font-size: 1.25rem; font-weight: 700; color: #1a1a1a; margin-top: 1.5rem; margin-bottom: 0.5rem; }
          .rich-content h5, .rich-content h6 { font-weight: 700; color: #1a1a1a; margin-top: 1.25rem; margin-bottom: 0.5rem; }
          .dark .rich-content h2, .dark .rich-content h3, .dark .rich-content h4,
          .dark .rich-content h5, .dark .rich-content h6 { color: #f8fafc; }
          .rich-content p { font-size: 16.5px; line-height: 1.85; margin-bottom: 1.2rem; }
          .rich-content strong { color: #0056b3; font-weight: 700; letter-spacing: 0.2px; }
          .dark .rich-content strong { color: #4d97ff; }
          .rich-content ul { list-style: none; padding: 0; margin: 0 0 1.5rem; }
          .rich-content ul li { background: #f4f7ff; border-left: 3px solid #0056b3; padding: 10px 16px; border-radius: 6px; margin-bottom: 8px; line-height: 1.6; }
          .dark .rich-content ul li { background: #181b20; }
          .rich-content ol { padding-left: 1.25rem; margin-bottom: 1.5rem; }
          .rich-content ol li { margin-bottom: 0.5rem; line-height: 1.7; }
          .rich-content blockquote { position: relative; background: #f9fbff; padding: 24px 32px 24px 48px; border-radius: 8px; border-left: 4px solid #0056b3; font-style: italic; margin: 1.5rem 0; color: #333; }
          .rich-content blockquote::before { content: '\\201C'; font-size: 3rem; line-height: 1; color: #0056b3; position: absolute; left: 12px; top: 10px; opacity: 0.3; }
          .dark .rich-content blockquote { background: #14181f; color: #cbd5e1; }
          .rich-content img { border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin: 2rem auto; max-width: 100%; height: auto; }
          .rich-content .stat-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; margin: 1.5rem 0 2rem; }
          @media (max-width: 1024px) { .rich-content .stat-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
          @media (max-width: 640px) { .rich-content .stat-grid { grid-template-columns: 1fr; } }
          .rich-content .stat-card { background: #fff; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); border-top: 3px solid #0056b3; padding: 18px 20px; display: flex; flex-direction: column; gap: 6px; }
          .dark .rich-content .stat-card { background: #161616; box-shadow: 0 2px 12px rgba(0,0,0,0.4); }
          .rich-content .stat-label { text-transform: uppercase; font-size: 11px; letter-spacing: 1px; color: #888; font-weight: 600; }
          .rich-content .stat-value { font-size: 28px; font-weight: 800; color: #1a1a1a; line-height: 1.15; }
          .dark .rich-content .stat-value { color: #f8fafc; }
          .rich-content .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 1.5rem 0 2rem; }
          @media (max-width: 640px) { .rich-content .ba-grid { grid-template-columns: 1fr; } }
          .rich-content .ba-col { border-radius: 10px; padding: 18px 20px; }
          .rich-content .ba-before { background: #f3f4f6; color: #6b7280; }
          .rich-content .ba-after { background: rgba(0,86,179,0.08); border: 1px solid rgba(0,86,179,0.25); }
          .dark .rich-content .ba-before { background: #1c1c1c; color: #9ca3af; }
          .dark .rich-content .ba-after { background: rgba(77,151,255,0.12); }
          .rich-content .ba-heading { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 10px; }
          .rich-content .ba-after .ba-heading { color: #0056b3; }
          .dark .rich-content .ba-after .ba-heading { color: #6ea8ff; }
          .rich-content .ba-row { display: flex; justify-content: space-between; gap: 8px; padding: 6px 0; font-size: 14px; }
          .rich-content .ba-after .ba-row { font-weight: 700; color: #15803d; }
          .blog-content a, .case-study-content a, .page-content a {
            color: #1a56db; font-weight: 500; text-decoration: underline; text-underline-offset: 3px;
            transition: color .15s ease, background .15s ease;
          }
          .blog-content a:hover, .case-study-content a:hover, .page-content a:hover {
            color: #1040b0; text-decoration: none; background: #eef3ff; border-radius: 3px; padding: 0 2px;
          }
          .dark .blog-content a, .dark .case-study-content a, .dark .page-content a { color: #6ea8ff; }
          .dark .blog-content a:hover, .dark .case-study-content a:hover, .dark .page-content a:hover { color: #9cc2ff; background: rgba(110,168,255,0.12); }
          .external-link-icon { display: inline-block; vertical-align: middle; margin-left: 3px; opacity: 0.8; }
        `}</style>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
