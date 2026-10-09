// Personal details shared by the About and Contact sections and the SEO metadata

export const profile = {
  name: 'Teodor Ilie',
  email: 'teo.altum.quinque@gmail.com',
  phone: { display: '+1 (416) 668-6650', href: 'tel:+14166686650' },
  discord: 'teoilie',
  tagline: "MSc Student at Queen's University | Full-Stack Developer at BMO",
  resume: '/assets/Teodor_Ilie_Resume_CV.pdf',
};

export const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/teodorilie/', icon: 'brands/linkedin' },
  { name: 'GitHub', url: 'https://github.com/TeoIlie', icon: 'brands/github' },
  { name: 'YouTube', url: 'https://www.youtube.com/@TeoTechnicTaken', icon: 'brands/youtube' },
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.ca/citations?user=YaQWjp8AAAAJ&hl=en',
    icon: 'solid/graduation-cap',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100004509104826',
    icon: 'brands/facebook',
  },
  { name: 'Strava', url: 'https://www.strava.com/athletes/9039374', icon: 'brands/strava' },
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

export const education = [
  {
    degree: 'M.Sc., Computer Science (AI Spec.)',
    institution: "Queen's University, recipient of:",
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
  { degree: 'B.Sc. (Hons), Computer Science', institution: "Queen's University", awards: [] },
];
