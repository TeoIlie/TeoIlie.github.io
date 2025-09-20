import { Component, HostListener, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ThemeService, Theme, THEMES } from '../shared/services/theme.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnDestroy {
  isMenuOpen = false;
  theme$: Observable<Theme>;
  currentTheme: Theme = THEMES.LIGHT;

  private readonly destroy$ = new Subject<void>();
  readonly THEMES = THEMES;

  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {
    this.theme$ = this.themeService.theme$;

    // Subscribe to theme changes for better performance
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
        this.cdr.markForCheck();
      });
  }

  @HostListener('window:resize')
  onResize() {
    // Close menu whenever window is resized
    this.isMenuOpen = false;
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
