import type { Metadata } from 'next';
import { BlogList } from '../../views/BlogList';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../lib/seoMetadata';
import { JsonLd } from '../JsonLd';

const PATH = '/blog';

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(PATH);
}

export default async function Page() {
  const { title, description } = await resolveRouteSeo(PATH);
  const schema = buildRouteSchema(PATH, title, description);
  return (
    <>
      <JsonLd schema={schema} />
      <BlogList />
    </>
  );
}
