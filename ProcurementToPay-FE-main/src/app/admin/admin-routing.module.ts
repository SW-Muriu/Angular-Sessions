import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  // {
  //   path: "parameters",
  //   loadChildren: () =>
  //     import("./modules/parameters/parameters.module").then(
  //       (m) => m.ParametersModule
  //     ),
  // },
  {
    path: "departments",
    loadChildren: () =>
      import("./modules/departments/departments.module").then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: "committee-management",
    loadChildren: () =>
      import("./modules/committee-management/committee-management.module").then(
        (m) => m.CommitteeManagementModule
      ),
  },
  {
    path: "contract-management",
    loadChildren: () =>
      import("./modules/contract-management/contract-management.module").then(
        (m) => m.ContractManagementModule
      ),
  },
  {
    path: "need-requisition-management",
    loadChildren: () =>
      import("./modules/need-requisition-management/need-requisition-management.module").then(
        (m) => m.NeedRequisitionManagementModule
      ),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./modules/reporting/reporting.module").then(
        (m) => m.ReportingModule
      ),
  },
  {
    path: "request-for-proposal-or-quatation-management",
    loadChildren: () =>
      import("./modules/request-for-proposal-or-quatation-management/request-for-proposal-or-quatation-management.module").then(
        (m) => m.RequestForProposalOrQuatationManagementModule
      ),
  },
  {
    path: "tender-evaluation",
    loadChildren: () =>
      import("./modules/tender-evaluation/tender-evaluation.module").then(
        (m) => m.TenderEvaluationModule
      ),
  },

  {
    path: "user-accounts",
    loadChildren: () =>
      import("./modules/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "roles",
    loadChildren: () =>
      import("./modules/roles/roles.module").then((m) => m.RolesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
