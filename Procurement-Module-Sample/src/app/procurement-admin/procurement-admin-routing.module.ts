import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "announce",
    loadChildren: () =>
      import("./modules/announce/announce.module").then(
        (m) => m.AnnounceModule
      ),
  },

  {
    path: "prequalifications",
    loadChildren: () =>
      import("./modules/prequalifications/prequalifications.module").then(
        (m) => m.PrequalificationsModule
      ),
  },
  {
    path: "recieved-applications",
    loadChildren: () =>
      import("./modules/recieve-applications/recieve-applications.module").then(
        (m) => m.RecieveApplicationsModule
      ),
  },
  {
    path: "prequalified-suppliers",
    loadChildren: () =>
      import("./modules/prequalified-suppliers/prequalified-suppliers.module").then(
        (m) => m.PrequalifiedSuppliersModule
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
    path: "tender",
    loadChildren: () =>
      import("./modules/tender/tender.module").then((m) => m.TenderModule),
  },
  {
    path: "tender-requirements",
    loadChildren: () =>
      import("./modules/tender-requirements/tender-requirements.module").then((m) => m.TenderRequirementsModule),
  },
  {
    path: "parameters",
    loadChildren: () =>
      import("./modules/parameters/parameters.module").then((m) => m.ParametersModule),
  },
  {
    path: "bidders",
    loadChildren: () =>
      import("./modules/bidders/bidders.module").then((m) => m.BiddersModule),
  },
  {
    path: "needs",
    loadChildren: () =>
      import("./modules/need/need.module").then((m) => m.NeedModule),
  },
  {
    path: "terms-and-conditions",
    loadChildren: () =>
      import("./modules/terms/terms.module").then((m) => m.TermsModule),
  },
  {
    path: "rfqs",
    loadChildren: () =>
      import("./modules/rfqs/rfqs.module").then((m) => m.RfqsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementAdminRoutingModule {}
