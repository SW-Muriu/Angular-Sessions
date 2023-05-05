import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderEvaluationRoutingModule } from './tender-evaluation-routing.module';
import { CreateTenderEvaluationCriteriaMatrixComponent } from './pages/create-tender-evaluation-criteria-matrix/create-tender-evaluation-criteria-matrix.component';


@NgModule({
  declarations: [
    CreateTenderEvaluationCriteriaMatrixComponent
  ],
  imports: [
    CommonModule,
    TenderEvaluationRoutingModule
  ]
})
export class TenderEvaluationModule { }
