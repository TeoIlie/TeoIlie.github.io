import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsComponent implements OnInit {
  contactForm!: FormGroup;
  messageSent = false;
  messageError = false;
  isSending = false;
  discordCopied = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  // copy discord username to clipboard
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.discordCopied = true;
      setTimeout(() => {
        this.discordCopied = false;
        this.cdr.markForCheck();
      }, 2000);
      this.cdr.markForCheck();
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      // Mark all controls as touched to trigger the display of error messages.
      this.contactForm.markAllAsTouched();
      return;
    }

    const endpoint = 'https://formspree.io/f/moveyaaw';
    const headers = new HttpHeaders({ Accept: 'application/json' });

    this.isSending = true;
    this.cdr.markForCheck();

    this.http.post(endpoint, this.contactForm.value, { headers }).subscribe({
      next: (response) => {
        console.log('Form submitted successfully!', response);
        this.messageSent = true;
        this.messageError = false;
        this.isSending = false;
        this.resetForm();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Form submission error:', error);
        this.messageError = true;
        this.isSending = false;
        this.cdr.markForCheck();
      },
    });
  }

  resetForm(): void {
    this.contactForm.reset();
    setTimeout(() => {
      this.messageSent = false;
      this.cdr.markForCheck();
    }, 5000);
  }
}
