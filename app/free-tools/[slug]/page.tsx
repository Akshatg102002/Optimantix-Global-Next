import type { Metadata } from 'next';
import { ToolPage } from '../../../views/ToolPage';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';
import { FREE_TOOLS } from '../../../data/freeTools';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return FREE_TOOLS.filter((tool) => tool.slug).map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildRouteMetadata(`/free-tools/${params.slug}`);
}

export default async function Page({ params }: PageProps) {
  const pathname = `/free-tools/${params.slug}`;
  const { title, description } = await resolveRouteSeo(pathname);
  const schema = buildRouteSchema(pathname, title, description);

  return (
    <>
      <JsonLd schema={schema} />
      <ToolPage />
    </>
  );
}
