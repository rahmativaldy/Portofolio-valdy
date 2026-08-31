import type { Metadata } from 'next';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';

const BASE_URL = 'https://rahmativaldy.com';

export const metadata: Metadata = {
  title: 'Guestbook | Rahmat Ivaldy',
  description: 'Leave a message and say hello to Rahmat Ivaldy.',
  openGraph: {
    title: 'Guestbook | Rahmat Ivaldy',
    description: 'Leave a message and say hello to Rahmat Ivaldy.',
    url: `${BASE_URL}/guestbook`,
    siteName: 'Rahmat Workspace',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guestbook | Rahmat Ivaldy',
    description: 'Leave a message and say hello to Rahmat Ivaldy.',
  },
};

export default function GuestbookPage() {
  return <WorkspaceShell initialSection="guestbook" />;
}
