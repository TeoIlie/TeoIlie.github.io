import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
    selector: 'app-socials',
    templateUrl: './socials.component.html',
    styleUrls: ['./socials.component.scss'],
    standalone: false
})
export class SocialsComponent {
  formData = {
    name: '',
    email: '',
    message: '',
  };

  messageSent = false;
  messageError = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const endpoint = 'https://formspree.io/f/moveyaaw';

    const headers = new HttpHeaders({ Accept: 'application/json' });

    this.isSending = true;

    this.http.post(endpoint, this.formData, { headers: headers }).subscribe({
      next: (response) => {
        console.log('Form submitted successfully!', response);
        this.messageSent = true;
        this.messageError = false;
        this.isSending = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Form submission error:', error);
        this.messageError = true;
        this.isSending = false;
      },
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      message: '',
    };

    setTimeout(() => {
      this.messageSent = false;
    }, 5000);
  }

  isSending = false;

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
