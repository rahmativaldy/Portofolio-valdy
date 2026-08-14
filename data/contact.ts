import { ContactLink } from '@/types';

export interface StructuredContactLink {
  name: string;
  url: string;
  displayValue?: string;
  category: 'primary' | 'professional' | 'secondary';
}

export const PRIMARY_CONTACT: StructuredContactLink = {
  name: 'Email',
  url: 'mailto:rahmativaldy65@gmail.com',
  displayValue: 'rahmativaldy65@gmail.com',
  category: 'primary',
};

export const PROFESSIONAL_LINKS: StructuredContactLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/rahmativaldy',
    displayValue: 'github.com/rahmativaldy',
    category: 'professional',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rahmat-ivaldy',
    displayValue: 'linkedin.com/in/rahmat-ivaldy',
    category: 'professional',
  },
];

export const SECONDARY_LINKS: StructuredContactLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/i.valdyyy',
    displayValue: '@i.valdyyy',
    category: 'secondary',
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    name: PRIMARY_CONTACT.name,
    icon: '✉',
    url: PRIMARY_CONTACT.url,
  },
  ...PROFESSIONAL_LINKS.map((link) => ({
    name: link.name,
    icon: link.name === 'GitHub' ? '🐱' : '💼',
    url: link.url,
  })),
  ...SECONDARY_LINKS.map((link) => ({
    name: link.name,
    icon: '📸',
    url: link.url,
  })),
];
