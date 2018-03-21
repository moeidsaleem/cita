import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicPage } from './clinic';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClinicPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicPage),
    TranslateModule.forChild()
  ],
})
export class ClinicPageModule {}
