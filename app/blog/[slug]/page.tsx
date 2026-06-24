import type { Metadata } from 'next';
import { BlogPost } from '../../../views/BlogPost';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';

interface PageProps {
  params: { slug: string };
}

// Tier 1 (Firestore blog post data) is not yet wired into generateMetadata —
// added in the Firebase Admin SDK phase. Falls back to Tier 3 defaults for now.
export function generateMetadata({ params }: PageProps): Metadata {
  return buildRouteMetadata(`/blog/${params.slug}`);
}

export default function Page({ params }: PageProps) {
  const pathname = `/blog/${params.slug}`;
  const { title, description } = resolveRouteSeo(pathname);
  const schema = buildRouteSchema(pathname, title, description);

  return (
    <>
      <JsonLd schema={schema} />
      <BlogPost />
    </>
  );
}
