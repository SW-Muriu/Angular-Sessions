import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeroesModule } from './heroes/heroes.module';

// this routing configuration can be placed in the routing module
// especially when the application is complex for eased control
// it however also works here, in the root/feature module
const appRoutes: Routes = [
  {
    path: 'crisis-center', component: CrisisListComponent
  },
  {
    path: 'heroes', component: HeroListComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  },
  {
    path: '', redirectTo: '/heroes', pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent,
    HeroListComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HeroesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
