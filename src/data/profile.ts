// Personal details shared by the About and Contact sections and the SEO metadata
import type { Link } from '../lib/content';

export const profile = {
  name: 'Teodor Ilie',
  email: 'teo.altum.quinque@gmail.com',
  phone: { display: '+1 (416) 668-6650', href: 'tel:+14166686650' },
  discord: 'teoilie',
  /** Supporting line under the hero statement: what I do now (the story is in About) */
  headline:
    'On the Autonomy Team at MacLean Engineering, building self-driving underground mining vehicles.',
  resume: '/assets/Teodor_Ilie_Resume_CV.pdf',
  /** The contact form posts here */
  formAction: 'https://formspree.io/f/moveyaaw',
};

export const youtube = {
  name: 'YouTube',
  url: 'https://www.youtube.com/@TeoTechnicTaken',
  icon: 'brands/youtube',
};

/** All are listed in Contact; `hero` ones also appear as icons in the hero */
export const socials: (Required<Link> & { hero?: boolean })[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/teodorilie/',
    icon: 'brands/linkedin',
    hero: true,
  },
  { name: 'GitHub', url: 'https://github.com/TeoIlie', icon: 'brands/github', hero: true },
  youtube,
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.ca/citations?user=YaQWjp8AAAAJ&hl=en',
    icon: 'solid/graduation-cap',
    hero: true,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100004509104826',
    icon: 'brands/facebook',
  },
  { name: 'Strava', url: 'https://www.strava.com/athletes/9039374', icon: 'brands/strava' },
];

// Key/value readouts in the hero strip: top work and where I'm based. Awards live in Education
export const readouts = [
  { key: 'Built', value: 'Gym-Khana deep RL simulator' },
  { key: 'Founder', value: 'Ingenuity Labs Racing' },
  { key: 'Based', value: 'Ontario, Canada' },
];

export const interests = [
  'Reinforcement Learning',
  'GenAI',
  'Autonomous Control',
  'Event Camera',
  'Computer Vision',
  'Deep Learning',
  'Automated Planning',
  'Explainable AI',
  'Cybersecurity',
  'FinTech',
];

// Newest first; the first entry is also used in the JSON-LD (alumniOf)
export const education = [
  {
    degree: 'M.Sc., Computer Science (AI Spec.)',
    institution: "Queen's University",
    url: 'https://www.queensu.ca/',
    years: '2024 – 2026',
    awards: [
      { name: 'Vector for AI', url: 'https://vectorinstitute.ai/programs/scholarship/' },
      {
        name: 'NSERC CGS',
        url: 'https://www.nserc-crsng.gc.ca/students-etudiants/pg-cs/cgsm-bescm_eng.asp',
      },
      {
        name: 'OGS',
        url: 'https://www.queensu.ca/grad-postdoc/grad-studies/funding/ontario-graduate-scholarship',
      },
    ],
  },
  {
    degree: 'B.Sc. (Hons), Computer Science',
    institution: "Queen's University",
    url: 'https://www.queensu.ca/',
    years: '2018 – 2022',
    awards: [],
  },
];

// Newest first; mirrors the Work Experience section of the resume. The first entry is the current
// job, used in the JSON-LD (jobTitle, worksFor). Leave out `end` for a current role; `project` is
// a projects collection id, linked from the entry
export const experience = [
  {
    role: 'Designer Level II, Autonomy Team',
    org: 'MacLean Engineering',
    url: 'https://macleanengineering.com/',
    start: 'Oct 2026',
    summary: 'Building autonomous systems for underground mining vehicles.',
  },
  {
    role: 'Founder & Team Lead',
    org: 'Ingenuity Labs Racing',
    url: 'https://github.com/Ingenuity-Labs-Racing',
    start: 'Jul 2025',
    end: '2026',
    summary:
      "Founded and led Queen's F1TENTH / RoboRacer autonomous racing team of PhD, post-doc and MSc students, building ROS2 SLAM, planning and control stacks. Hosted Canada's first RoboRacer event.",
    project: 'f1tenth-racing',
  },
  {
    role: 'Graduate Research Engineer',
    org: "Ingenuity Labs, Queen's University",
    url: 'https://ingenuitylabs.queensu.ca/',
    start: 'Sep 2024',
    end: '2026',
    summary:
      'Developed deep RL controllers for autonomous vehicle drifting and loss-of-traction recovery, trained in a custom parallelized Gym simulator and deployed on a physical 1/10-scale car.',
    project: 'gym-khana',
  },
  {
    role: 'Full-Stack Software Developer',
    org: 'BMO Financial Group',
    url: 'https://www.bmo.com/',
    start: 'Sep 2022',
    end: '2026',
    summary:
      'Built SKOPE, an internal safekeeping app with Spring REST APIs and an Angular front end, in an Agile team practising TDD.',
  },
  {
    role: 'Business Analyst (Summer Internships)',
    org: 'BMO Financial Group',
    url: 'https://www.bmo.com/',
    start: 'May 2020',
    end: 'Aug 2021',
    summary:
      'Designed an automated Power BI reporting tool later adopted bank-wide, and coordinated month-end systems monitoring across teams.',
  },
];
