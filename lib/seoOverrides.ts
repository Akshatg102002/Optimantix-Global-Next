// Server-side Firestore reads for Tier 1 SEO data — admin-managed page
// overrides plus the dynamic content (blog posts, case studies) whose own
// metaTitle/metaDescription previously only reached the DOM client-side via
// react-helmet-async. Every export here is defensive: if the Admin SDK isn't
// configured or the read fails, callers fall back to Tier 2/3 static data.
import fs from 'fs';
import path from 'path';
import { getAdminDb } from './firebase-admin';
import { findSeoOverride } from '../utils/buildPageSeo';
import { AUTHENTIC_CASE_STUDIES } from '../data/caseStudies';
import { INITIAL_BLOGS } from '../constants';
import type { PageSEO, BlogPost, CaseStudy } from '../types';

export async function fetchSeoOverride(pathname: string): Promise<PageSEO | undefined> {
  const db = getAdminDb();
  if (!db) return undefined;

  try {
    const snapshot = await db.collection('seo_pages').get();
    const pages = snapshot.docs.map((doc) => doc.data() as PageSEO);
    return findSeoOverride(pages, pathname);
  } catch (error) {
    console.warn('[seoOverrides] Failed to fetch seo_pages:', error);
    return undefined;
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const db = getAdminDb();
  if (db) {
    try {
      const snapshot = await db.collection('blogs').where('slug', '==', slug).limit(1).get();
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as BlogPost;
      }
    } catch (error) {
      console.warn('[seoOverrides] Failed to fetch blog post:', error);
    }
  }

  // Fall back to the bundled blog posts so builds without Firestore
  // access still bake real per-post metadata instead of the site default.
  return INITIAL_BLOGS.find((blog) => blog.slug === slug);
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const db = getAdminDb();
  if (db) {
    try {
      const snapshot = await db.collection('case_studies').where('slug', '==', slug).limit(1).get();
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as CaseStudy;
      }
    } catch (error) {
      console.warn('[seoOverrides] Failed to fetch case study:', error);
    }
  }

  // Fall back to the bundled case studies so admin-managed slugs that
  // happen to collide with a seeded one (or builds without Firestore
  // access) still resolve to real content instead of a blank page.
  return AUTHENTIC_CASE_STUDIES.find((study) => study.slug === slug);
}

/**
 * Fetch every blog slug for static export.
 *
 * Same approach as fetchAllCaseStudySlugs below: read the freshly generated
 * public/sitemap.xml first (written immediately before `next build` runs in
 * the same `npm run build` command), falling back to a direct Firestore read
 * if the sitemap is missing or empty.
 */
export async function fetchAllBlogSlugs(): Promise<string[]> {
  // 1. Try reading from the just-generated sitemap.xml
  try {
    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    const xml = fs.readFileSync(sitemapPath, 'utf-8');
    const matches = [...xml.matchAll(/\/blog\/([^<]+)<\/loc>/g)];
    const slugs = matches.map((m) => m[1].trim()).filter(Boolean);
    if (slugs.length > 0) return slugs;
  } catch (error) {
    console.warn('[seoOverrides] Could not read sitemap.xml for blog slugs:', (error as Error)?.message);
  }

  // 2. Fall back to a direct Firestore read
  const db = getAdminDb();
  if (!db) return [];

  try {
    const snapshot = await db.collection('blogs').get();
    return snapshot.docs
      .map((doc) => doc.data() as BlogPost)
      .filter((blog) => blog.slug && (blog as any).isPublished !== false)
      .map((blog) => blog.slug as string);
  } catch (error) {
    console.warn('[seoOverrides] Failed to fetch blog slugs:', error);
    return [];
  }
}

/**
 * Fetch every case-study slug for static export.
 *
 * Primary source: public/sitemap.xml, which generate-sitemap.ts writes
 * immediately before `next build` runs in the same `npm run build` command.
 * Reading it back here guarantees generateStaticParams() produces exactly
 * the same set of /case-studies/* pages that the sitemap promises — no
 * second Firestore round-trip, and no risk of sitemap/page mismatch.
 *
 * Fallback: if sitemap.xml is missing or unreadable (e.g. a fresh checkout
 * that hasn't run the sitemap step), fall back to a direct Firestore read
 * via the Admin SDK so the route is never left with zero static pages.
 */
export async function fetchAllCaseStudySlugs(): Promise<string[]> {
  // 1. Try reading from the just-generated sitemap.xml
  try {
    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    const xml = fs.readFileSync(sitemapPath, 'utf-8');
    const matches = [...xml.matchAll(/\/case-studies\/([^<]+)<\/loc>/g)];
    const slugs = matches.map((m) => m[1].trim()).filter(Boolean);
    if (slugs.length > 0) return slugs;
  } catch (error) {
    console.warn('[seoOverrides] Could not read sitemap.xml for case study slugs:', (error as Error)?.message);
  }

  // 2. Fall back to a direct Firestore read
  const db = getAdminDb();
  const fallbackSlugs = AUTHENTIC_CASE_STUDIES.filter((study) => study.slug).map((study) => study.slug);
  if (!db) return fallbackSlugs;

  try {
    const snapshot = await db.collection('case_studies').get();
    const slugs = snapshot.docs
      .map((doc) => doc.data() as CaseStudy)
      .filter((study) => study.slug && (study as any).isPublished !== false)
      .map((study) => study.slug as string);
    // 3. Always guarantee at least the bundled slugs, so "output: export"
    // never has zero params to generate for this route.
    return slugs.length > 0 ? slugs : fallbackSlugs;
  } catch (error) {
    console.warn('[seoOverrides] Failed to fetch case study slugs:', error);
    return fallbackSlugs;
  }
}

/**
 * Fetch every admin-managed page slug that resolves under /services/{slug}.
 *
 * Same sitemap-first, Firestore-fallback approach as the slug fetchers
 * above. Built-in service slugs (from INITIAL_SERVICES) also live at
 * /services/{slug}, so the sitemap regex naturally picks both up — the
 * caller in app/services/[slug]/page.tsx merges this with INITIAL_SERVICES
 * directly so built-in slugs are never missed even if the sitemap/Firestore
 * read fails.
 */
export async function fetchAllServicePageSlugs(): Promise<string[]> {
  // 1. Try reading from the just-generated sitemap.xml
  try {
    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    const xml = fs.readFileSync(sitemapPath, 'utf-8');
    const matches = [...xml.matchAll(/\/services\/([^/<]+)<\/loc>/g)];
    const slugs = [...new Set(matches.map((m) => m[1].trim()).filter(Boolean))];
    if (slugs.length > 0) return slugs;
  } catch (error) {
    console.warn('[seoOverrides] Could not read sitemap.xml for service page slugs:', (error as Error)?.message);
  }

  // 2. Fall back to a direct Firestore read of the admin-managed pages collection
  const db = getAdminDb();
  if (!db) return [];

  try {
    const snapshot = await db.collection('pages').get();
    return snapshot.docs
      .map((doc) => doc.data() as { slug?: string; isPublished?: boolean })
      .filter((page) => page.slug && page.isPublished !== false)
      .map((page) => page.slug as string);
  } catch (error) {
    console.warn('[seoOverrides] Failed to fetch service page slugs:', error);
    return [];
  }
}