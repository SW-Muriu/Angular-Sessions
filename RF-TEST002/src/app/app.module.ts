import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './authentication/profiles/profiles.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { Profiles2Component } from './authentication/profiles2/profiles2.component';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  { path: 'profiles', component: ProfilesComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    Profiles2Component,
    LoginComponent
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot (routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
