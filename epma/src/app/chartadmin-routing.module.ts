import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationAdminView } from './lorappmedicationadminbbui/ca/medicationadmin/medicationadminview';

const routes: Routes = [{ path: '', component: MedicationAdminView }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartadminRoutingModule { }
