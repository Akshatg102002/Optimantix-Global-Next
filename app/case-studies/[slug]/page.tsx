import type { Metadata } from 'next';
import { CaseStudyTemplate } from '../../../views/CaseStudyTemplate';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  return buildRouteMetadata(`/case-studies/${params.slug}`);
}

export default function Page({ params }: PageProps) {
  const pathname = `/case-studies/${params.slug}`;
  const { title, description } = resolveRouteSeo(pathname);
  const schema = buildRouteSchema(pathname, title, description);

  return (
    <>
      <JsonLd schema={schema} />
      <CaseStudyTemplate />
    </>
  );
}
