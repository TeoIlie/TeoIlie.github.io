import { Component } from '@angular/core';

interface LegoCreation {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  forumUrl?: string;
  additionalImages?: string[];
  techniques: string[];
  buildYear?: number;
}

@Component({
  selector: 'app-lego-technic',
  templateUrl: './lego-technic.component.html',
  styleUrls: ['./lego-technic.component.scss'],
  standalone: false,
})
export class LegoTechnicComponent {
  legoCreations: LegoCreation[] = [
    {
      title: 'Off-Road Buggy',
      description:
        'A fully functional remote-controlled off-road buggy with independent suspension, 4-wheel drive, and detailed engine bay.',
      imageUrl:
        'https://bricksafe.com/files/Teo_LEGO_Technic/audi-quattro/DSC05763.jpg/800x533.jpg',
      videoUrl: 'https://www.youtube.com/embed/Gx4-P59XuH4',
      forumUrl: 'https://thelegocarblog.com/2016/07/10/man-with-a-mission/',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/audi-quattro/DSC05763.jpg/800x533.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/audi-quattro/DSC05763.jpg/800x533.jpg',
      ],
      techniques: ['Suspension', 'Remote Control', 'Gearbox', 'Differential', 'Custom Bodywork'],
      buildYear: 1240,
    },
    {
      title: 'Compact Excavator',
      description:
        'A detailed working model of a compact excavator with functional hydraulics, 360° cabin rotation, and realistic digging mechanism.',
      imageUrl: 'https://bricksafe.com/files/Teo_LEGO_Technic/excavator/main-image.jpg',
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_2',
      forumUrl: 'https://www.eurobricks.com/forum/index.php?/forums/topic/YOUR_TOPIC_ID_2/',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/excavator/detail1.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/excavator/detail2.jpg',
      ],
      techniques: [
        'Pneumatics',
        'Linkage',
        'Linear Actuators',
        'Rotation Mechanism',
        'Cabin Detail',
      ],
      buildYear: 865,
    },
    {
      title: 'Formula 1 Race Car',
      description:
        'A sleek Formula 1 car with working suspension, steering, and detailed aerodynamics based on 2023 regulations.',
      imageUrl: 'https://bricksafe.com/files/Teo_LEGO_Technic/f1/main-image.jpg',
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_3',
      forumUrl: 'https://www.eurobricks.com/forum/index.php?/forums/topic/YOUR_TOPIC_ID_3/',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/f1/detail1.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/f1/detail2.jpg',
      ],
      techniques: [
        'Push-rod Suspension',
        'Aerodynamics',
        'Steering',
        'Engine Detail',
        'Custom Decals',
      ],
      buildYear: 1580,
    },
    {
      title: 'Modular Crane',
      description:
        'A fully motorized tower crane with remote control functions, extending boom, and realistic cable management system.',
      imageUrl: 'https://bricksafe.com/files/Teo_LEGO_Technic/crane/main-image.jpg',
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_4',
      forumUrl: 'https://www.eurobricks.com/forum/index.php?/forums/topic/YOUR_TOPIC_ID_4/',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/crane/detail1.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/crane/detail2.jpg',
      ],
      techniques: [
        'Motorization',
        'Gearing',
        'Structural Integrity',
        'Cable Management',
        'Remote Control',
      ],
      buildYear: 2340,
    },
  ];

  selectedCreation: LegoCreation | null = null;

  showImageModal = false;
  currentImageIndex = 0;
  currentImageUrl = '';

  selectCreation(creation: LegoCreation): void {
    this.selectedCreation = creation;
  }

  clearSelection(): void {
    this.selectedCreation = null;
  }

  openImageModal(imageUrl: string, index: number): void {
    if (this.selectedCreation && this.selectedCreation.additionalImages) {
      this.currentImageUrl = imageUrl;
      this.currentImageIndex = index;
      this.showImageModal = true;

      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
  }

  closeImageModal(): void {
    this.showImageModal = false;

    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  }

  navigateImage(direction: number): void {
    if (!this.selectedCreation || !this.selectedCreation.additionalImages) {
      return;
    }

    const imagesLength = this.selectedCreation.additionalImages.length;
    this.currentImageIndex = (this.currentImageIndex + direction + imagesLength) % imagesLength;
    this.currentImageUrl = this.selectedCreation.additionalImages[this.currentImageIndex];
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('image-modal-overlay')) {
      this.closeImageModal();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.showImageModal) return;

    switch (event.key) {
      case 'Escape':
        this.closeImageModal();
        break;
      case 'ArrowLeft':
        this.navigateImage(-1);
        break;
      case 'ArrowRight':
        this.navigateImage(1);
        break;
    }
  }
}
