// Server-side Metadata API helpers — Phase 3 of the Next.js migration.
// Wraps the existing pure Tier 2/3 SEO resolvers (utils/buildPageSeo.ts,
// utils/buildPageSchema.ts, utils/seo.ts, data/seoData.ts) so every
// app/**/page.tsx can build its `generateMetadata` and server-rendered
// JSON-LD from the same logic RouteSEO.tsx used client-side. Tier 1
// (Firebase admin `seo_pages` overrides) is layered in by Phase 4 via
// lib/firebase-admin.ts and is not yet wired in here.
import type { Metadata } from 'next';
import { buildPageSeo } from '../utils/buildPageSeo';
import { buildPageSchema, type CustomPageSchemaInput } from '../utils/buildPageSchema';
import { canonicalFromPath } from '../utils/seo';

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png';

export interface SeoOverride {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export function buildRouteMetadata(pathname: string, override?: SeoOverride): Metadata {
  const resolved = buildPageSeo(pathname);
  const title = override?.title || resolved.title;
  const description = override?.description || resolved.description;
  const canonical = override?.canonicalUrl || canonicalFromPath(pathname);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: [DEFAULT_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_IMAGE],
    },
  };
}

export function buildRouteSchema(
  pathname: string,
  title: string,
  description: string,
  customPage?: CustomPageSchemaInput
): Record<string, unknown> | Record<string, unknown>[] {
  return buildPageSchema(pathname, title, description, customPage);
}

export function resolveRouteSeo(pathname: string): { title: string; description: string } {
  return buildPageSeo(pathname);
}
