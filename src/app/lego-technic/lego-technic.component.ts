import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';

interface Demo {
  demoUrl?: string;
  demoName?: string;
}

interface LegoCreation {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  forumUrl?: string;
  demo?: Demo;
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
export class LegoTechnicComponent implements OnInit, OnDestroy {
  legoCreations: LegoCreation[] = [
    {
      title: 'Praga Trial Truck',
      description:
        'A scale model of the 6x6 Praga Trial Truck with a working 2-speed gearbox, all-wheel drive with 2 XL motors, servo steering, and long-travel suspension. Competed in the 2024 Toronto Truck Trial Competition, winning first place, linked below.',
      imageUrl:
        'https://bricksafe.com/files/Teo_LEGO_Technic/praga-6x6-trial-truck/Final1.jpg/800x450.jpg',
      videoUrl: 'https://www.youtube.com/embed/Gx4-P59XuH4',
      forumUrl: 'https://www.eurobricks.com/forum/forums/topic/194556-wip-praga-trial-truck-6x6/',
      demo: { demoUrl: 'https://www.youtube.com/embed/V5R8TNchCIk', demoName: 'Competition' },
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/praga-6x6-trial-truck/DSC08768.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/praga-6x6-trial-truck/DSC07998.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/praga-6x6-trial-truck/DSC07873.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/praga-6x6-trial-truck/DSC08755.JPG/1280x719.JPG',
      ],
      techniques: ['Heavy-duty gearbox', '6x6', 'BuWizz', 'Trial Truck'],
      buildYear: 2024,
    },
    {
      title: 'Unimog U5000',
      description:
        'A model of the famous Unimog U5000. This thing was a beast, featuring a 2-speed gearbox, steering, portal axles, pneumatic-actuated front and rear differential locks, and a low center of gravity. \n\nI had always wanted to create a truck that was both agile and effective off-road. With this truck, high gear and open diffs is fast on flat terrain, and locked diffs in low gear is really effective off-road. I was especially proud of the compact front axle design, which is linked below. Easily one of my favourite builds to date 🔥',
      imageUrl:
        'https://bricksafe.com/files/Teo_LEGO_Technic/unimog-trial-truck/Final1.jpg/800x449.jpg',
      videoUrl: 'https://www.youtube.com/embed/ErPDtLbhNts',
      forumUrl:
        'https://www.eurobricks.com/forum/forums/topic/194337-moc-unimog-u5000-trial-truck/',
      demo: { demoUrl: 'https://www.youtube.com/embed/GKQyn0FCkbc', demoName: 'Front Axle Design' },
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/unimog-trial-truck/DSC07840.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/unimog-trial-truck/IMG_2463.jpg/1280x960.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/unimog-trial-truck/DSC07087.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/unimog-trial-truck/DSC07392.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/unimog-trial-truck/DSC07861.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/unimog-trial-truck/DSC07836.JPG/1280x719.JPG',
      ],
      techniques: [
        'Pneumatics',
        '4x4',
        'Linear Actuated Steering',
        '2-Speed Gearbox',
        'Live-axle Suspension',
      ],
      buildYear: 2023,
    },
    {
      title: 'Baja Truck',
      description:
        'A model of a Baja racing truck, featuring long travel lixe axle rear suspension, independent front suspension, positive caster on the front, and servo steering. This project was sponsored by BuWizz, a 3rd party controller manufacturer compatible with LEGO. The goal was a minimalist lightweight design to keep it fast and nimble 🛻',
      imageUrl: 'https://bricksafe.com/files/Teo_LEGO_Technic/baja-truck/Final1.jpg/800x450.jpg',
      videoUrl: 'https://www.youtube.com/embed/ECJ1eubnlMo',
      demo: {
        demoName: 'Sponsor',
        demoUrl: 'https://buwizz.com/',
      },
      forumUrl: 'https://www.eurobricks.com/forum/forums/topic/188560-moc-buwizz-baja-truck/',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/baja-truck/DSC06336.jpg/1280x720.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/baja-truck/DSC06329.jpg/1280x720.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/baja-truck/DSC06325.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/baja-truck/DSC06337.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/baja-truck/DSC06310.jpg/1280x720.jpg',
      ],
      techniques: ['BuWizz', 'Baja truck', 'Live-axle Suspension', 'Caster-angled steering'],
      buildYear: 2021,
    },
    {
      title: 'MAN TGS Dakar Truck',
      description:
        'This was one of my most complex models early on - a fully RC model of the MAN TGS Dakar rally truck, with working live axle suspension, 4x4 transmission, servo steering, working doors, and a lot of detail. It was featured in the LEGO Car Blog, linked below.',
      imageUrl: 'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/Final1.jpg/800x449.jpg',
      videoUrl: 'https://www.youtube.com/embed/tCBB-U5y0eE',
      forumUrl: 'https://www.eurobricks.com/forum/forums/topic/137216-moc-man-tgs-dakar-truck',
      demo: {
        demoUrl:
          'https://thelegocarblog.com/2016/07/10/man-with-a-mission/screen-shot-2016-07-09-at-22-56-12/',
        demoName: 'Showcase',
      },
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/DSC02848.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/DSC03526.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/DSC03471.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/DSC03522.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/Final2.jpg/1280x719.jpg',
      ],
      techniques: ['Dakar', 'MAN', 'Remote Control', 'Custom parts'],
      buildYear: 2021,
    },
    {
      title: '6x6 Tatra',
      description:
        'This was my first 6x6 trial truck, and the first to feature torsion bars. The unique Tatra half-axles make it incredibly reliable off-road, and it could easily climb a 70˚ incline. Fellow builder Horcik Design liked it so much, he used it in his own model, linked below.',
      imageUrl: 'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-6x6/Final1.jpg/800x533.jpg',
      videoUrl: 'https://www.youtube.com/embed/ALFLZvTO4jI',
      forumUrl: 'https://www.eurobricks.com/forum/forums/topic/160083-wip-tatra-6x6-midscale',
      demo: {
        demoUrl: 'https://www.youtube.com/embed/ABd_NVpsHMw',
        demoName: "Horcik's Version",
      },
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-6x6/DSC05675.jpg/1280x852.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-6x6/DSC05693.jpg/1280x852.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-6x6/DSC05686.jpg/1280x852.jpg',
      ],
      techniques: ['Half-axle', 'Torsion bar', 'Tatra', '6x6'],
      buildYear: 2018,
    },
    {
      title: 'Audio Quattro Group B Rally Car',
      description:
        'This model of a group B Audo Quattro rally car was my first to feature a gearbox and was inspired by early 2000s LEGO Technic minimalist styling. I also placed extra emphasis on video styling, learning how to craft a beautiful edit with Final Cut Pro.',
      imageUrl: 'https://bricksafe.com/files/Teo_LEGO_Technic/audi-quattro/Final1.jpg/800x450.jpg',
      videoUrl: 'https://www.youtube.com/embed/AfcC9TIX9NU',
      forumUrl:
        'https://www.eurobricks.com/forum/forums/topic/173109-moc-audi-quattro-group-b-rally-car/',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/audi-quattro/DSC06198.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/audi-quattro/DSC06216.jpg/1280x852.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/audi-quattro/Final2.jpg/1280x720.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/audi-quattro/DSC06202.jpg/1280x719.jpg',
      ],
      techniques: ['Rally', 'Audi', 'Group B'],
      buildYear: 2019,
    },
    {
      title: 'Mercedes G-Class',
      description:
        'This was my first serious offroader, a model of the stunning Mercedes G-Class, which remains one of my all-time favourite trucks. It features pendular suspension to simplify the drive train and withstand high torque. I was really pleased with the look I achieved on the front grill.',
      imageUrl:
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-g-class-/Final1.jpg/800x449.jpg',
      videoUrl: 'https://www.youtube.com/embed/l0Y01Bq4Wus',
      forumUrl: 'https://www.eurobricks.com/forum/forums/topic/107838-moc-mercedes-g-class-swb',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-g-class-/DSC01060.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-g-class-/DSC01058.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-g-class-/DSC01053.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-g-class-/DSC01082.JPG/1280x719.JPG',
      ],
      techniques: ['Mercedes', 'Pendular Suspension', 'Offroader'],
      buildYear: 2015,
    },
    {
      title: 'Tatra T815',
      description:
        'A small-scale model of the 8x8 Tatra T815, which has been built by most serious Technic builders. At this scale I was able to get away with skid-steering, vastly simplifying the build. I was particularly excited when Zerobricks, a LEGO Technic legend, built his own version inspired by mine, linked below.',
      imageUrl: 'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-t815/Final1.jpg/800x449.jpg',
      videoUrl: 'https://www.youtube.com/embed/24NRLyLW_7M',
      forumUrl:
        'https://www.eurobricks.com/forum/forums/topic/106387-tatra-t815-8x8-in-lego-technic/',
      demo: {
        demoUrl: 'https://www.youtube.com/watch?v=j3He4Ela4pQ&t=29s&ab_channel=Zerobricks',
        demoName: "Zerobrick's Version",
      },
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-t815/DSC01104.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-t815/DSC01107.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-t815/DSC01101.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/tatra-t815/DSC01099.JPG/1280x719.JPG',
      ],
      techniques: ['Tatra', 'Skid-steering', 'Half-axles'],
      buildYear: 2015,
    },
  ];

  selectedCreation: LegoCreation | null = null;

  showImageModal = false;
  currentImageIndex = 0;
  currentImageUrl = '';
  private keydownListener: Function | null = null;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.removeKeydownListener();
  }

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

      document.body.style.overflow = 'hidden';

      this.setupKeydownListener();
    }
  }

  closeImageModal(): void {
    this.showImageModal = false;

    this.removeKeydownListener();

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

  private setupKeydownListener(): void {
    this.removeKeydownListener();

    this.keydownListener = this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
      if (!this.showImageModal) return;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          this.closeImageModal();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.navigateImage(-1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.navigateImage(1);
          break;
      }
    });
  }

  private removeKeydownListener(): void {
    if (this.keydownListener) {
      this.keydownListener();
      this.keydownListener = null;
    }
  }
}
