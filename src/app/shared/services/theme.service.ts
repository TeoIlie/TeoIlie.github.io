import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

export const THEMES = {
  LIGHT: 'light' as const,
  DARK: 'dark' as const,
} as const;

/**
 * Service for managing application theme state.
 * Handles theme persistence, system preference detection, and DOM updates.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'preferred-theme';
  private readonly themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());

  /** Observable stream of current theme */
  public readonly theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.getStoredTheme());
  }

  /** Get current theme value */
  get currentTheme(): Theme {
    return this.themeSubject.value;
  }

  /** Toggle between light and dark themes */
  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.setTheme(newTheme);
  }

  /** Set specific theme */
  setTheme(theme: Theme): void {
    if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) {
      console.warn(`Invalid theme: ${theme}. Falling back to light.`);
      theme = THEMES.LIGHT;
    }

    this.themeSubject.next(theme);
    this.storeTheme(theme);
    this.applyTheme(theme);
  }

  /** Get stored theme preference with fallbacks */
  private getStoredTheme(): Theme {
    // Try localStorage first
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.THEME_KEY) as Theme;
        if (stored === THEMES.LIGHT || stored === THEMES.DARK) {
          return stored;
        }
      } catch (error) {
        console.warn('Failed to access localStorage for theme preference:', error);
      }
    }

    // Fall back to system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? THEMES.DARK
          : THEMES.LIGHT;
      } catch (error) {
        console.warn('Failed to detect system theme preference:', error);
      }
    }

    // Final fallback
    return THEMES.LIGHT;
  }

  /** Store theme preference safely */
  private storeTheme(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.THEME_KEY, theme);
      } catch (error) {
        console.warn('Failed to store theme preference:', error);
      }
    }
  }

  /** Apply theme classes to document body */
  private applyTheme(theme: Theme): void {
    if (typeof document !== 'undefined') {
      try {
        document.body.classList.remove(`${THEMES.LIGHT}-theme`, `${THEMES.DARK}-theme`);
        document.body.classList.add(`${theme}-theme`);
      } catch (error) {
        console.warn('Failed to apply theme classes:', error);
      }
    }
  }
}
