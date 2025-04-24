import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationPrescriptionCA } from './lorappmanageprescriptionbbui/ca/prescribe/medicationprescriptionview';
import { GpConnectListView } from './lorappmanageprescriptionbbui/view/gpconnectlistview';
import { medprescribedrugs } from './lorappmanageprescriptionbbui/view/medprescribedrugs';
import { Commonviewpage } from './lorappmedicationcommonbb/view/commonviewpage';
const routes: Routes = [
  { path: '', component: medprescribedrugs },
  { path: 'gp', component: GpConnectListView },
   { path: 'lorappmanageprescriptionbbui', component: MedicationPrescriptionCA },
  //{ path: 'lorappmanageprescriptionbbui', component: medprescribedrugs },
  // { path: 'MN_MED_VALIDATE_S_P2', component: MedicationPrescriptionCA },
  // { path: 'MN_RSLV_CONFLICTS', component: MedicationPrescriptionCA },
  // { path: 'MN_SUPINSTR_P2', component: MedicationPrescriptionCA },
  // { path: 'lorappmedicationadminbbui', component: MedicationAdminView },
  { path: 'lorappmedicationcommonbb', component: Commonviewpage },
  {
    path: 'lorappmedicationadminbbui',
    loadChildren: () => import('./chartadmin.module').then(m => m.ChartadminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
