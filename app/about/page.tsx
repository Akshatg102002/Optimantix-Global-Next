import type { Metadata } from 'next';
import { About } from '../../views/About';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../lib/seoMetadata';
import { JsonLd } from '../JsonLd';

const PATH = '/about';

export function generateMetadata(): Metadata {
  return buildRouteMetadata(PATH);
}

export default function Page() {
  const { title, description } = resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <About />
    </>
  );
}
