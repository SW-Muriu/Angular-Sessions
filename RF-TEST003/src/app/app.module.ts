import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { AboutComponent } from './dashboard/about/about.component';
import { AdmissionsComponent } from './dashboard/admissions/admissions.component';
import { AcademicsComponent } from './dashboard/academics/academics.component';
import { ResearchComponent } from './dashboard/research/research.component';
import { CampusLifeComponent } from './dashboard/campus-life/campus-life.component';
import { AlumniComponent } from './dashboard/alumni/alumni.component';
import { ContactUsComponent } from './dashboard/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    AdmissionsComponent,
    AcademicsComponent,
    ResearchComponent,
    CampusLifeComponent,
    AlumniComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
