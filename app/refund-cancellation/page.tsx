import type { Metadata } from 'next';
import { RefundCancellation } from '../../views/RefundCancellation';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Optimantix Global',
  description:
    'Read Optimantix Global Pvt. Ltd.\'s Cancellation & Refund Policy — terms governing cancellations, refunds, and service termination.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <RefundCancellation />;
}
