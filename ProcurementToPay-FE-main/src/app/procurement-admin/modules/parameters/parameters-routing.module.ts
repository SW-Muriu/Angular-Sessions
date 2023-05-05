import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaxComponent } from "./tax/tax.component";

const routes: Routes = [
  
  { path: "tax", component: TaxComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
