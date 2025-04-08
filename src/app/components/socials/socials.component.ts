import { Component } from '@angular/core';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
})
export class SocialsComponent {
  socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/teodorilie/',
      icon: 'fab fa-linkedin',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/TeoIlie',
      icon: 'fab fa-github',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@TeoTechnicTaken',
      icon: 'fab fa-youtube',
    },
    {
      name: 'Scholar',
      url: 'https://scholar.google.ca/citations?user=YaQWjp8AAAAJ&hl=en',
      icon: 'fab fa-google',
    },
    {
      name: 'Strava',
      url: 'https://www.strava.com/athletes/9039374',
      icon: 'fab fa-strava',
    },
    {
      name: 'Email',
      url: 'mailto:teo.altum.quinque@gmail.com',
      icon: 'fas fa-envelope',
    },
  ];
}
