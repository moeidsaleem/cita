import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DpatientsPage } from './dpatients';

@NgModule({
  declarations: [
    DpatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(DpatientsPage),
  ],
})
export class DpatientsPageModule {}
