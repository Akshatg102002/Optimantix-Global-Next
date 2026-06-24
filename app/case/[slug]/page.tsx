import type { Metadata } from 'next';
import { CaseDetails } from '../../../views/CaseDetails';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';
import { AUTHENTIC_CASE_STUDIES } from '../../../data/caseStudies';
import { truncateDescription } from '../../../data/seoData';

interface PageProps {
  params: { slug: string };
}

function findStudy(slug: string) {
  return AUTHENTIC_CASE_STUDIES.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pathname = `/case/${params.slug}`;
  const study = findStudy(params.slug);
  if (!study) return buildRouteMetadata(pathname);

  return buildRouteMetadata(pathname, {
    title: study.metaTitle || `${study.title} | Optimantix Global`,
    description: truncateDescription(study.metaDescription || study.excerpt, 155),
    image: study.imageUrl,
  });
}

export default async function Page({ params }: PageProps) {
  const pathname = `/case/${params.slug}`;
  const study = findStudy(params.slug);
  const { title, description } = study
    ? { title: study.metaTitle || `${study.title} | Optimantix Global`, description: truncateDescription(study.metaDescription || study.excerpt, 155) }
    : await resolveRouteSeo(pathname);
  const schema = buildRouteSchema(pathname, title, description);

  return (
    <>
      <JsonLd schema={schema} />
      <CaseDetails />
    </>
  );
}
