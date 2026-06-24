import type { Metadata } from 'next';
import { ServicesPage } from '../../views/ServicesPage';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../lib/seoMetadata';
import { JsonLd } from '../JsonLd';

const PATH = '/services';

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(PATH);
}

export default async function Page() {
  const { title, description } = await resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <ServicesPage />
    </>
  );
}
