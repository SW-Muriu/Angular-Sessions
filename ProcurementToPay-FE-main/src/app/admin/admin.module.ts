import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";

@NgModule({
  declarations: [],
  
  imports: [CommonModule, AdminRoutingModule, DashboardModule],
})
export class AdminModule {}
