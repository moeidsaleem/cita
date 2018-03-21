import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DpatientsPage } from './dpatients';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DpatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(DpatientsPage),
    TranslateModule.forChild()
  ],
})
export class DpatientsPageModule {}
