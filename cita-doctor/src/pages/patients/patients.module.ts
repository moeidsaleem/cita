import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientsPage } from './patients';

@NgModule({
  declarations: [
    PatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientsPage),
  ],
})
export class PatientsPageModule {}
