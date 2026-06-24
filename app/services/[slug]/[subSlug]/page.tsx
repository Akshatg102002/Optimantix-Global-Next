import type { Metadata } from 'next';
import { SubServiceTemplate } from '../../../../views/SubServiceTemplate';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../../lib/seoMetadata';
import { JsonLd } from '../../../JsonLd';

interface PageProps {
  params: { slug: string; subSlug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  return buildRouteMetadata(`/services/${params.slug}/${params.subSlug}`);
}

export default function Page({ params }: PageProps) {
  const pathname = `/services/${params.slug}/${params.subSlug}`;
  const { title, description } = resolveRouteSeo(pathname);
  const schema = buildRouteSchema(pathname, title, description);

  return (
    <>
      <JsonLd schema={schema} />
      <SubServiceTemplate />
    </>
  );
}
