import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}
