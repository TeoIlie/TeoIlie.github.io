import { profile } from './profile';

export const siteName = `${profile.name} Portfolio`;

// Homepage sections in page order: drives the nav, the section ids and the numbered eyebrows
export const sections = [
  { id: 'about', nav: 'About' },
  { id: 'experience', nav: 'Experience' },
  { id: 'projects', nav: 'Projects' },
  // eyebrow overrides the nav label in the section's numbered eyebrow
  { id: 'lego', nav: 'LEGO', eyebrow: 'Beyond code' },
  { id: 'contact', nav: 'Contact' },
] as const satisfies readonly { id: string; nav: string; eyebrow?: string }[];

export type SectionId = (typeof sections)[number]['id'];

/** "04 · Beyond code" */
export function eyebrow(id: SectionId) {
  const index = sections.findIndex((s) => s.id === id);
  const section: { nav: string; eyebrow?: string } = sections[index];
  return `${String(index + 1).padStart(2, '0')} · ${section.eyebrow ?? section.nav}`;
}
