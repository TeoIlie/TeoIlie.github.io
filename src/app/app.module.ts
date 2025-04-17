import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { LegoTechnicComponent } from './lego-technic/lego-technic.component';
import { SocialsComponent } from './socials/socials.component';

import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from 'shared/materials.module';
import { SafePipe } from './pipes/safe.pipe';
import { ScrollAnimationDirective } from './shared/directives/scroll-animation.directive';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ProjectsComponent,
    SocialsComponent,
    LegoTechnicComponent,
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule, FormsModule, MaterialModule, SafePipe, ScrollAnimationDirective],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    // Registering only 4 used icons - if more icons are required in future, add them here
    const icons = {
      menu: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`,
      arrow_back: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
      chevron_left: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`,
      chevron_right: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`,
    };

    // Register icons for use
    Object.entries(icons).forEach(([name, data]) => {
      this.iconRegistry.addSvgIconLiteral(name, this.sanitizer.bypassSecurityTrustHtml(data));
    });
  }
}
