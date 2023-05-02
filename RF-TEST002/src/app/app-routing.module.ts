import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  
  { path: 'Dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  
  { path: 'Home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  
  { path: 'Teachers', loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule) },
  
  { path: 'Staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) },
  
  { path: 'Students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
  
  { path: 'Careers', loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule) },
  
  { path: 'Courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
