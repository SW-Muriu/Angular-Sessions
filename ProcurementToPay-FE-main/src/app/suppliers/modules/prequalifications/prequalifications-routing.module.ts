import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsSentComponent } from './applications-sent/applications-sent.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  { path: "apply", component: JobsComponent },
  { path: "job-details", component: JobDetailsComponent },
  { path: "applications-sent", component: ApplicationsSentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrequalificationsRoutingModule { }
