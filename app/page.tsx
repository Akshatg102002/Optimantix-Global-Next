import type { Metadata } from 'next';
import { Home } from '../views/Home';
import { buildRouteMetadata } from '../lib/seoMetadata';

const PATH = '/';

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(PATH);
}

export default function Page() {
  return <Home />;
}
