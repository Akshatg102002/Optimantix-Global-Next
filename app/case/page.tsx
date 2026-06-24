import type { Metadata } from 'next';
import { CaseStudies } from '../../views/CaseStudies';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../lib/seoMetadata';
import { JsonLd } from '../JsonLd';

const PATH = '/case';

export function generateMetadata(): Metadata {
  return buildRouteMetadata(PATH);
}

export default function Page() {
  const { title, description } = resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <CaseStudies />
    </>
  );
}
