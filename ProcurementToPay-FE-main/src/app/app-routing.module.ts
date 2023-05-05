import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      {
        path: "admin",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
      {
        path: "user",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: "account",
        loadChildren: () => import("./account/account.module").then(m => m.AccountModule)
      },
      {
        path: "departmental-users",
        loadChildren: () => import("./departmental-users/departmental-users.module").then(m => m.DepartmentalUsersModule)
      },
      {
        path: "other-users",
        loadChildren: () => import("./other-users/other-users.module").then(m => m.OtherUsersModule)
      },
      {
        path: "technical-evaluator",
        loadChildren: () => import("./technical-evaluator/technical-evaluator.module").then(m => m.TechnicalEvaluatorModule)
      },
      {
        path: "financial-evaluator",
        loadChildren: () => import("./financial-evaluators/financial-evaluators.module").then(m => m.FinancialEvaluatorsModule)
      },
      {
        path: "desk-evaluator",
        loadChildren: () => import("./desk-evaluator/desk-evaluator.module").then(m => m.DeskEvaluatorModule)
      },
      {
        path: "commons",
        loadChildren: () =>
          import("./commons/commons.module").then((m) => m.CommonsModule),
      },
      {
        path: "suppliers",
        loadChildren: () =>
          import("./suppliers/suppliers.module").then((m) => m.SuppliersModule),
      },
      {
        path: "procurement-admin",
        loadChildren: () =>
          import("./procurement-admin/procurement-admin.module").then((m) => m.ProcurementAdminModule),
      },
    ],
  },
  
  {
    path: "supplier-authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./supplier-authentication/supplier-authentication.module").then(
        (m) => m.SupplierAuthenticationModule
      ),
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
