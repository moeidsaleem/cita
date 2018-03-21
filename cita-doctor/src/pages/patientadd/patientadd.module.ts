import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientaddPage } from './patientadd';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PatientaddPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientaddPage),
    TranslateModule.forChild()
  ],
})
export class PatientaddPageModule {}
