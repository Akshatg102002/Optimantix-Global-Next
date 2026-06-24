import type { Metadata } from 'next';
import { ServiceTemplate } from '../../../views/ServiceTemplate';
import { PageTemplate } from '../../../views/PageTemplate';
import { INITIAL_SERVICES } from '../../../constants';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildRouteMetadata(`/services/${params.slug}`);
}

export default async function Page({ params }: PageProps) {
  const pathname = `/services/${params.slug}`;
  const { title, description } = await resolveRouteSeo(pathname);
  const schema = buildRouteSchema(pathname, title, description);
  const isBuiltInService = INITIAL_SERVICES.some((service) => service.slug === params.slug);

  return (
    <>
      <JsonLd schema={schema} />
      {isBuiltInService ? <ServiceTemplate /> : <PageTemplate />}
    </>
  );
}
