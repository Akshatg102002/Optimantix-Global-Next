import type { Metadata } from 'next';
import { Contact } from '../../views/Contact';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../lib/seoMetadata';
import { JsonLd } from '../JsonLd';

const PATH = '/contact';

export function generateMetadata(): Metadata {
  return buildRouteMetadata(PATH);
}

export default function Page() {
  const { title, description } = resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <Contact />
    </>
  );
}
