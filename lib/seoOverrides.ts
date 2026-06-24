// Server-side Firestore reads for Tier 1 SEO data — admin-managed page
// overrides plus the dynamic content (blog posts, case studies) whose own
// metaTitle/metaDescription previously only reached the DOM client-side via
// react-helmet-async. Every export here is defensive: if the Admin SDK isn't
// configured or the read fails, callers fall back to Tier 2/3 static data.
import { getAdminDb } from './firebase-admin';
import { findSeoOverride } from '../utils/buildPageSeo';
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
  if (!db) return undefined;

  try {
    const snapshot = await db.collection('blogs').where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return undefined;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as BlogPost;
  } catch (error) {
    console.warn('[seoOverrides] Failed to fetch blog post:', error);
    return undefined;
  }
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const db = getAdminDb();
  if (!db) return undefined;

  try {
    const snapshot = await db.collection('case_studies').where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return undefined;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as CaseStudy;
  } catch (error) {
    console.warn('[seoOverrides] Failed to fetch case study:', error);
    return undefined;
  }
}
