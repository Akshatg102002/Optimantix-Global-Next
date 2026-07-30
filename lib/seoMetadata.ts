// Server-side Metadata API helpers — Phase 3/4 of the Next.js migration.
// Wraps the existing pure Tier 2/3 SEO resolvers (utils/buildPageSeo.ts,
// utils/buildPageSchema.ts, utils/seo.ts, data/seoData.ts) plus the Tier 1
// Firebase Admin `seo_pages` override (lib/seoOverrides.ts) so every
// app/**/page.tsx builds its `generateMetadata` and server-rendered JSON-LD
// from the same priority order RouteSEO.tsx used client-side: explicit
// per-page override > Firestore seo_pages override > service/sub-service
// fields > static data/seoData.ts fallback.
import type { Metadata } from 'next';
import { buildPageSeo } from '../utils/buildPageSeo';
import { buildPageSchema, type CustomPageSchemaInput } from '../utils/buildPageSchema';
import { canonicalFromPath } from '../utils/seo';
import { fetchSeoOverride } from './seoOverrides';

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png';

export interface SeoOverride {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
}

async function resolveSeo(pathname: string, override?: SeoOverride): Promise<Required<Pick<SeoOverride, 'title' | 'description' | 'canonicalUrl' | 'image'>>> {
  const fallback = buildPageSeo(pathname);
  const tier1 = override ? undefined : await fetchSeoOverride(pathname);

  return {
    title: override?.title || tier1?.metaTitle || fallback.title,
    description: override?.description || tier1?.metaDescription || fallback.description,
    canonicalUrl: override?.canonicalUrl || tier1?.canonicalUrl || canonicalFromPath(pathname),
    image: override?.image || tier1?.ogImage || DEFAULT_IMAGE,
  };
}

export async function buildRouteMetadata(pathname: string, override?: SeoOverride): Promise<Metadata> {
  const { title, description, canonicalUrl, image } = await resolveSeo(pathname, override);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
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

export async function resolveRouteSeo(pathname: string, override?: SeoOverride): Promise<{ title: string; description: string }> {
  const { title, description } = await resolveSeo(pathname, override);
  return { title, description };
}
