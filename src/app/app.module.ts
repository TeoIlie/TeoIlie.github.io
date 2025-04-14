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
export class AppModule {}
