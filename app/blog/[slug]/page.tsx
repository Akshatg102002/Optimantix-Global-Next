import type { Metadata } from 'next';
import { BlogPost } from '../../../views/BlogPost';
import { buildRouteMetadata, resolveRouteSeo, type SeoOverride } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';
import { fetchBlogBySlug, fetchAllBlogSlugs } from '../../../lib/seoOverrides';
import { SITE_URL, truncateDescription } from '../../../data/seoData';
import type { BlogPost as BlogPostType } from '../../../types';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await fetchAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function resolveOverride(slug: string): Promise<SeoOverride | undefined> {
  const blog = await fetchBlogBySlug(slug);
  if (!blog) return undefined;
  return {
    title: blog.metaTitle || blog.title,
    description: truncateDescription(blog.metaDescription || blog.excerpt, 155),
    image: blog.imageUrl,
  };
}

// Mirrors the breadcrumb/Article/Person JSON-LD previously emitted client-side
// by views/BlogPost.tsx via react-helmet-async, now rendered server-side so it
// is present in the raw HTML before any JS runs.
function buildBlogPostSchema(blog: BlogPostType, seoDescription: string) {
  const currentUrl = `${SITE_URL}/blog/${blog.slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: blog.title, item: currentUrl },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: seoDescription,
    image: blog.imageUrl,
    author: { '@type': 'Organization', name: 'Optimantix Global' },
    datePublished: blog.date,
    dateModified: blog.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': currentUrl },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: blog.author,
    url: `${SITE_URL}/about`,
    jobTitle: 'Digital Marketing & Technology Expert',
    worksFor: { '@type': 'Organization', name: 'Optimantix Global' },
  };

  return [breadcrumbSchema, articleSchema, personSchema];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pathname = `/blog/${params.slug}`;
  return buildRouteMetadata(pathname, await resolveOverride(params.slug));
}

export default async function Page({ params }: PageProps) {
  const pathname = `/blog/${params.slug}`;
  const blog = await fetchBlogBySlug(params.slug);
  const override = blog
    ? {
        title: blog.metaTitle || blog.title,
        description: truncateDescription(blog.metaDescription || blog.excerpt, 155),
        image: blog.imageUrl,
      }
    : undefined;
  const { description } = await resolveRouteSeo(pathname, override);
  const schema = blog ? buildBlogPostSchema(blog, description) : [];

  return (
    <>
      <JsonLd schema={schema} />
      <BlogPost />
    </>
  );
}