import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = // sets up routes constant where you define your routes
[
  {
    path: 'first-component', component: FirstComponent
  },
  {
    path: 'second-component', component: SecondComponent
  },
  {
    path: '**', component: PageNotFoundComponent //Wildcard route for a 404 page
  }
  
]; bootstrapApplication(AppComponent),
{
  providers:
[
  provideRouter(routes, WithComponentInputBinding())
]
}



//Configures NGModules and imports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
function WithComponentInputBinding(): import("@angular/router").RouterFeatures {
  throw new Error('Function not implemented.');
}

