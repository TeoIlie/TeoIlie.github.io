import {
  Component,
  Renderer2,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';

interface Demo {
  demoUrl: string;
  demoName: string;
}

interface LegoCreation {
  title: string;
  description: string;
  imageUrl: string; //webp image
  jpgFallbackUrl: string;
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LegoTechnicComponent implements OnInit, OnDestroy {
  legoCreations: LegoCreation[] = [
    {
      title: 'Praga Trial Truck',
      description:
        'A scale model of the 6x6 Praga Trial Truck with a working 2-speed gearbox, all-wheel drive with 2 XL motors, servo steering, and long-travel suspension. Competed in the 2024 Toronto Truck Trial Competition, winning first place, linked below.',
      imageUrl: 'assets/images/webp/praga.webp',
      jpgFallbackUrl: 'assets/images/praga.jpg',
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
      imageUrl: 'assets/images/webp/unimog.webp',
      jpgFallbackUrl: 'assets/images/unimog.jpg',
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
      imageUrl: 'assets/images/webp/baja.webp',
      jpgFallbackUrl: 'assets/images/baja.jpg',
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
      imageUrl: 'assets/images/webp/dakar.webp',
      jpgFallbackUrl: 'assets/images/dakar.jpg',
      videoUrl: 'https://www.youtube.com/embed/tCBB-U5y0eE',
      forumUrl: 'https://www.eurobricks.com/forum/forums/topic/137216-moc-man-tgs-dakar-truck',
      demo: {
        demoUrl: 'https://thelegocarblog.com/2016/07/10/man-with-a-mission/',
        demoName: 'Showcase',
      },
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/DSC02848.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/DSC03526.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/DSC03471.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/DSC03522.jpg/1280x719.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/dakar-truck/Final2.jpg/1280x719.jpg',
      ],
      techniques: ['Dakar', 'MAN', 'Leaf spring suspension', 'Custom parts'],
      buildYear: 2021,
    },
    {
      title: '6x6 Tatra',
      description:
        'This was my first 6x6 trial truck, and the first to feature torsion bars. The unique Tatra half-axles make it incredibly reliable off-road, and it could easily climb a 70˚ incline. Fellow builder Horcik Design liked it so much, he used it in his own model, linked below.',
      imageUrl: 'assets/images/webp/tatra-6x6.webp',
      jpgFallbackUrl: 'assets/images/tatra-6x6.jpg',
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
      imageUrl: 'assets/images/webp/audi.webp',
      jpgFallbackUrl: 'assets/images/audi.jpg',
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
      imageUrl: 'assets/images/webp/g-class.webp',
      jpgFallbackUrl: 'assets/images/g-class.jpg',
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
      imageUrl: 'assets/images/webp/tatra-8x8.webp',
      jpgFallbackUrl: 'assets/images/tatra-8x8.jpg',
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
    {
      title: 'Ural 4320 Trial Truck',
      description:
        'Inspired by the massive Societ-era Russian trucks, this Ural was meant for offroad ability. Live-axles with motors mounted on-axle and return-to-centre servo steering power it, and long-travel live-axle suspension gives it ability. It was simple but effective, with a great bodywork to finish off.',
      imageUrl: 'assets/images/webp/ural.webp',
      jpgFallbackUrl: 'assets/images/ural.jpg',
      videoUrl: 'https://www.youtube.com/embed/n7mZsgIcVk4',
      forumUrl: 'https://www.eurobricks.com/forum/forums/topic/175008-moc-ural-4320-trial-truck/',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/ural-truck/Image%202019-08-27%20at%2011.16%20AM.jpg/800x851.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/ural-truck/DSC06263.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/ural-truck/DSC06256.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/ural-truck/Final2.jpg/1280x719.jpg',
      ],
      techniques: ['Ural', 'Live axles', 'In-axle motor'],
      buildYear: 2020,
    },
    {
      title: 'Mercedes Uniknick',
      description:
        'This fun model was designed to mess around with articulated steering. The advantage of this in LEGO is that there is no need for fragile universal joints if each axle is powered individually. ',
      imageUrl: 'assets/images/webp/uniknick.webp',
      jpgFallbackUrl: 'assets/images/uniknick.jpg',
      videoUrl: 'https://www.youtube.com/embed/tU3wENPv49o',
      forumUrl: 'https://www.eurobricks.com/forum/forums/topic/175008-moc-ural-4320-trial-truck/',
      additionalImages: [
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-uniknick/DSC06302.JPG/1280x719.JPG',
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-uniknick/uniknick.jpeg/800x641.jpeg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-uniknick/Final2.jpg/1280x914.jpg',
        'https://bricksafe.com/files/Teo_LEGO_Technic/mercedes-uniknick/back.jpg/1280x720.jpg',
      ],
      techniques: ['Ural', 'Live axles', 'In-axle motor'],
      buildYear: 2021,
    },
  ];

  selectedCreation: LegoCreation | null = null;

  showImageModal = false;
  currentImageIndex = 0;
  currentImageUrl = '';
  private keydownListener: (() => void) | null = null;
  private originalBodyOverflow: string | null = null;

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.removeKeydownListener();
    this.restoreBodyOverflow();
  }

  selectCreation(creation: LegoCreation): void {
    this.selectedCreation = creation;
    this.cdr.markForCheck();

    // Allow DOM to update before scrolling
    setTimeout(() => {
      // Find the detail element
      const detailElement = document.querySelector('.lego-detail');
      if (detailElement) {
        // Calculate scroll position - top of element minus a bit of padding
        const scrollPosition = detailElement.getBoundingClientRect().top + window.scrollY - 40;

        // Scroll smoothly
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  }

  clearSelection(): void {
    this.selectedCreation = null;
    this.cdr.markForCheck();
  }

  openImageModal(imageUrl: string, index: number): void {
    if (this.selectedCreation && this.selectedCreation.additionalImages) {
      // Run outside Angular zone for performance but reenter for state changes
      this.ngZone.runOutsideAngular(() => {
        // Store original body overflow
        this.originalBodyOverflow = document.body.style.overflow;

        // Move modal to document body instead of keeping it in component
        this.ngZone.run(() => {
          this.currentImageUrl = imageUrl;
          this.currentImageIndex = index;
          this.showImageModal = true;
          this.cdr.markForCheck();

          // Set overflow hidden on body with a slight delay to ensure DOM updated
          setTimeout(() => {
            this.renderer.setStyle(document.body, 'overflow', 'hidden');
          }, 0);
        });

        this.setupKeydownListener();
      });
    }
  }

  closeImageModal(): void {
    this.ngZone.run(() => {
      this.showImageModal = false;
      this.cdr.markForCheck();
    });

    this.removeKeydownListener();
    this.restoreBodyOverflow();
  }

  navigateImage(direction: number): void {
    if (!this.selectedCreation || !this.selectedCreation.additionalImages) {
      return;
    }

    const imagesLength = this.selectedCreation.additionalImages.length;
    this.currentImageIndex = (this.currentImageIndex + direction + imagesLength) % imagesLength;
    this.currentImageUrl = this.selectedCreation.additionalImages[this.currentImageIndex];

    this.cdr.markForCheck();
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

      this.ngZone.run(() => {
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
    });
  }

  private removeKeydownListener(): void {
    if (this.keydownListener) {
      this.keydownListener();
      this.keydownListener = null;
    }
  }

  private restoreBodyOverflow(): void {
    if (this.originalBodyOverflow !== null) {
      this.renderer.setStyle(document.body, 'overflow', this.originalBodyOverflow);
      this.originalBodyOverflow = null;
    } else {
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    }
  }
}
