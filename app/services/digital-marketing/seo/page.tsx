import type { Metadata } from 'next';
import { SeoPage } from '../../../../views/SeoPage';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../../lib/seoMetadata';
import { JsonLd } from '../../../JsonLd';

const PATH = '/services/digital-marketing/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(PATH);
}

export default async function Page() {
  const { title, description } = await resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <SeoPage />
    </>
  );
}
