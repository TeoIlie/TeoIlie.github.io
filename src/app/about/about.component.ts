import { Component } from '@angular/core';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: false
})

export class AboutComponent {
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
      icon: 'fas fa-graduation-cap',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100004509104826',
      icon: 'fab fa-facebook',
    },
    {
      name: 'Strava',
      url: 'https://www.strava.com/athletes/9039374',
      icon: 'fab fa-strava',
    },
  ];
}
