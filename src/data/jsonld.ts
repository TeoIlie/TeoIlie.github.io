// Structured data for search engines, as one linked @graph per page. Job and school come from the
// profile; the Person description is hand-written, so update it with them
import type { CollectionEntry } from 'astro:content';
import { profile, socials, education, experience, interests } from './profile';
import { siteName } from './site';
import { excerpt } from '../lib/content';

type Node = Record<string, unknown>;

/** Stable node ids, so pages can point at the Person and WebSite instead of repeating them */
const ids = (site: URL) => ({
  person: `${site.href}#person`,
  website: `${site.href}#website`,
});

/** Person and WebSite: on every page, so each one is self-contained */
export function siteJsonLd(site: URL, photoUrl: string): Node[] {
  const [job] = experience;
  const [degree] = education;
  const { person, website } = ids(site);

  return [
    {
      '@type': 'Person',
      '@id': person,
      name: profile.name,
      alternateName: 'Teo Ilie',
      url: site.href,
      email: profile.email,
      image: photoUrl,
      sameAs: socials.map((s) => s.url),
      jobTitle: job.role,
      worksFor: { '@type': 'Organization', name: job.org, sameAs: job.url },
      alumniOf: { '@type': 'CollegeOrUniversity', name: degree.institution, sameAs: degree.url },
      knowsAbout: [
        ...new Set([
          'Autonomous Vehicles',
          'Robotics',
          'ROS2',
          'Full-stack Development',
          ...interests,
        ]),
      ],
      description:
        "Teodor Ilie, also known as Teo Ilie, is a designer on the Autonomy Team at MacLean Engineering and a Queen's University Master's graduate in Computer Science (AI). He specializes in reinforcement learning, autonomous vehicles, robotics, and full-stack development.",
    },
    {
      '@type': 'WebSite',
      '@id': website,
      name: siteName,
      url: site.href,
      description: "Teodor Ilie's portfolio: autonomous vehicles, AI research, and LEGO Technic.",
      inLanguage: 'en',
      publisher: { '@id': person },
    },
  ];
}

/** Homepage: a profile page about the Person, listing the projects */
export function homeJsonLd(site: URL, projects: CollectionEntry<'projects'>[]): Node[] {
  const { person, website } = ids(site);
  return [
    {
      '@type': 'ProfilePage',
      '@id': `${site.href}#profilepage`,
      url: site.href,
      isPartOf: { '@id': website },
      mainEntity: { '@id': person },
      dateModified: new Date().toISOString(),
    },
    {
      '@type': 'ItemList',
      name: 'Selected work',
      itemListElement: projects.map(({ data, body }, i) => {
        const code = data.links.find((l) => l.url.includes('github.com'));
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': code ? 'SoftwareSourceCode' : 'CreativeWork',
            name: data.title,
            description: excerpt(body ?? ''),
            url: (code ?? data.links[0])?.url,
            ...(code && { codeRepository: code.url }),
            keywords: data.technologies.join(', '),
            author: { '@id': person },
          },
        };
      }),
    },
  ];
}

/** LEGO page: the creation, its video and a breadcrumb back to the homepage grid */
export function legoJsonLd(
  site: URL,
  pageUrl: string,
  { data, body }: CollectionEntry<'lego'>,
  imageUrl: string
): Node[] {
  const { person } = ids(site);
  const description = excerpt(body ?? '');
  return [
    {
      '@type': 'CreativeWork',
      '@id': `${pageUrl}#creation`,
      name: data.title,
      description,
      url: pageUrl,
      image: imageUrl,
      dateCreated: String(data.buildYear),
      creator: { '@id': person },
      keywords: ['LEGO Technic', ...data.techniques].join(', '),
      video: { '@id': `${pageUrl}#video` },
    },
    {
      '@type': 'VideoObject',
      '@id': `${pageUrl}#video`,
      name: `${data.title} – LEGO Technic`,
      description,
      thumbnailUrl: `https://i.ytimg.com/vi/${data.youtubeId}/maxresdefault.jpg`,
      uploadDate: data.uploadDate.toISOString(),
      contentUrl: `https://www.youtube.com/watch?v=${data.youtubeId}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${data.youtubeId}`,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: profile.name, item: site.href },
        { '@type': 'ListItem', position: 2, name: 'LEGO Technic', item: `${site.href}#lego` },
        { '@type': 'ListItem', position: 3, name: data.title },
      ],
    },
  ];
}
