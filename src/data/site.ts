import { profile } from './profile';

export const siteName = `${profile.name} Portfolio`;

// Homepage sections in page order: drives the nav, the section ids and the numbered eyebrows
export const sections = [
  { id: 'about', nav: 'About', eyebrow: 'About' },
  { id: 'experience', nav: 'Experience', eyebrow: 'Experience' },
  { id: 'projects', nav: 'Projects', eyebrow: 'Projects' },
  { id: 'lego', nav: 'LEGO', eyebrow: 'Beyond code' },
  { id: 'contact', nav: 'Contact', eyebrow: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

/** "04 · Beyond code" */
export function eyebrow(id: SectionId) {
  const index = sections.findIndex((s) => s.id === id);
  return `${String(index + 1).padStart(2, '0')} · ${sections[index].eyebrow}`;
}
