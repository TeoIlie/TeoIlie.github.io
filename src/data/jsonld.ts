// Structured data for search engines, built from the profile so it can't drift out of date
import { profile, socials, education, experience } from './profile';
import { siteName } from './site';

export function personJsonLd(site: URL, photoUrl: string) {
  const [job] = experience;
  const [degree] = education;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
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
          'Full-stack Development',
          'Reinforcement Learning',
          'Autonomous Vehicles',
          'Robotics',
          'ROS2',
        ],
        description:
          "Teodor Ilie, also known as Teo Ilie, is a designer on the Autonomy Team at MacLean Engineering and a Queen's University Master's graduate in Computer Science (AI). He specializes in reinforcement learning, autonomous vehicles, robotics, and full-stack development.",
      },
      {
        '@type': 'WebSite',
        name: siteName,
        url: site.href,
        publisher: { '@type': 'Person', name: profile.name },
      },
    ],
  };
}
