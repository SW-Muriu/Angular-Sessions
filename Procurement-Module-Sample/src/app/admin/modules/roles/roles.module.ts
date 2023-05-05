import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RolesRoutingModule } from "./roles-routing.module";
import { RolesComponent } from "./pages/roles/roles.component";
import { RoleComponent } from "./pages/role/role.component";
import { AddRoleComponent } from "./pages/add-role/add-role.component";
import { UpdateRoleComponent } from "./pages/update-role/update-role.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatDialogModule } from "@angular/material/dialog";
import { DeleteRoleComponent } from './pages/delete-role/delete-role.component';
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    RolesComponent,
    RoleComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    DeleteRoleComponent,
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTableExporterModule,
    MatIconModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
    CdkAccordionModule,
    DragDropModule,
    MatSelectModule,
    MatDialogModule
  ],
})
export class RolesModule {}
