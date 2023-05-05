import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTenderEvaluationCriteriaMatrixComponent } from './pages/create-tender-evaluation-criteria-matrix/create-tender-evaluation-criteria-matrix.component';

const routes: Routes = [
  {path: "create-tender-evaluation-criteria-matrix", component: CreateTenderEvaluationCriteriaMatrixComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderEvaluationRoutingModule { }
