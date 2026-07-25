import type { Metadata } from 'next';
import { PrivacyPolicy } from '../../views/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy | Optimantix Global',
  description:
    'Read Optimantix Global Pvt. Ltd.\'s Privacy Policy — how we collect, use, store, and protect your personal information.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicy />;
}
