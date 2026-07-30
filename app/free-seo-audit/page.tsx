import type { Metadata } from 'next';
import { SeoAudit } from '../../views/SeoAudit';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../lib/seoMetadata';
import { JsonLd } from '../JsonLd';

const PATH = '/free-seo-audit';

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(PATH);
}

export default async function Page() {
  const { title, description } = await resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <SeoAudit />
    </>
  );
}
