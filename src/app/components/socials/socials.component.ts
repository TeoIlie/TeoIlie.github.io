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
      url: 'https://www.linkedin.com/in/yourusername/',
      icon: 'fab fa-linkedin',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'fab fa-github',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/yourchannelid',
      icon: 'fab fa-youtube',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: 'fab fa-twitter',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/yourusername/',
      icon: 'fab fa-instagram',
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: 'fas fa-envelope',
    },
  ];
}
