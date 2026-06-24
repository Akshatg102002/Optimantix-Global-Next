import type { Metadata } from 'next';
import { BlogPost } from '../../../views/BlogPost';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo, type SeoOverride } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';
import { fetchBlogBySlug } from '../../../lib/seoOverrides';
import { truncateDescription } from '../../../data/seoData';

interface PageProps {
  params: { slug: string };
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pathname = `/blog/${params.slug}`;
  return buildRouteMetadata(pathname, await resolveOverride(params.slug));
}

export default async function Page({ params }: PageProps) {
  const pathname = `/blog/${params.slug}`;
  const { title, description } = await resolveRouteSeo(pathname, await resolveOverride(params.slug));
  const schema = buildRouteSchema(pathname, title, description);

  return (
    <>
      <JsonLd schema={schema} />
      <BlogPost />
    </>
  );
}
