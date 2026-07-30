import type { Metadata } from 'next';
import { SubServiceTemplate } from '../../../../views/SubServiceTemplate';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../../lib/seoMetadata';
import { INITIAL_SERVICES } from '../../../../constants';
import { JsonLd } from '../../../JsonLd';

interface PageProps {
  params: { slug: string; subSlug: string };
}

export function generateStaticParams() {
  return INITIAL_SERVICES.flatMap((service) =>
    (service.subServices ?? [])
      .filter((sub) => sub.slug)
      .map((sub) => ({ slug: service.slug, subSlug: sub.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildRouteMetadata(`/services/${params.slug}/${params.subSlug}`);
}

export default async function Page({ params }: PageProps) {
  const pathname = `/services/${params.slug}/${params.subSlug}`;
  const { title, description } = await resolveRouteSeo(pathname);
  const schema = buildRouteSchema(pathname, title, description);

  return (
    <>
      <JsonLd schema={schema} />
      <SubServiceTemplate />
    </>
  );
}
