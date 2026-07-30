import type { Metadata } from 'next';
import { NotFound } from '../views/NotFound';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../lib/seoMetadata';
import { JsonLd } from './JsonLd';

const PATH = '/404';

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(PATH);
}

export default async function NotFoundPage() {
  const { title, description } = await resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <NotFound />
    </>
  );
}
