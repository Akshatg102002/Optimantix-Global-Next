import type { Metadata } from 'next';
import { CaseStudyTemplate } from '../../../views/CaseStudyTemplate';
import { buildRouteMetadata, buildRouteSchema, resolveRouteSeo, type SeoOverride } from '../../../lib/seoMetadata';
import { JsonLd } from '../../JsonLd';
import { fetchCaseStudyBySlug, fetchAllCaseStudySlugs } from '../../../lib/seoOverrides';
import { truncateDescription } from '../../../data/seoData';
 
interface PageProps {
  params: { slug: string };
}
 
export async function generateStaticParams() {
  const slugs = await fetchAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}
 
async function resolveOverride(slug: string): Promise<SeoOverride | undefined> {
  const study = await fetchCaseStudyBySlug(slug);
  if (!study) return undefined;
  return {
    title: study.metaTitle || `${study.title} | Optimantix Global`,
    description: truncateDescription(study.metaDescription || study.excerpt, 155),
    image: study.imageUrl,
  };
}
 
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pathname = `/case-studies/${params.slug}`;
  return buildRouteMetadata(pathname, await resolveOverride(params.slug));
}
 
export default async function Page({ params }: PageProps) {
  const pathname = `/case-studies/${params.slug}`;
  const { title, description } = await resolveRouteSeo(pathname, await resolveOverride(params.slug));
  const schema = buildRouteSchema(pathname, title, description);
 
  return (
    <>
      <JsonLd schema={schema} />
      <CaseStudyTemplate />
    </>
  );
}