import type { Metadata } from 'next';
import { TermsOfService } from '../../views/TermsOfService';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Optimantix Global',
  description:
    'Read Optimantix Global Pvt. Ltd.\'s Terms & Conditions governing the use of our website, products, and digital services.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <TermsOfService />;
}
