import type { Metadata } from 'next';
import { CaseDetails } from '../../../views/CaseDetails';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  return buildRouteMetadata(`/case/${params.slug}`);
}

export default function Page({ params }: PageProps) {
  const pathname = `/case/${params.slug}`;
  const { title, description } = resolveRouteSeo(pathname);
  const schema = buildRouteSchema(pathname, title, description);

  return (
    <>
      <JsonLd schema={schema} />
      <CaseDetails />
    </>
  );
}
