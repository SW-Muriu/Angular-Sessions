import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllComponent } from "./pages/all/all.component";

const routes: Routes = [{ path: "all", component: AllComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
