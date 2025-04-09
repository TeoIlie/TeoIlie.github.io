import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SocialsComponent } from './components/socials/socials.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        AboutComponent,
        ProjectsComponent,
        SocialsComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule, FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
