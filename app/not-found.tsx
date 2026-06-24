import type { Metadata } from 'next';
import { NotFound } from '../views/NotFound';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../lib/seoMetadata';
import { JsonLd } from './JsonLd';

const PATH = '/404';

export const metadata: Metadata = buildRouteMetadata(PATH);

export default function NotFoundPage() {
  const { title, description } = resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <NotFound />
    </>
  );
}
