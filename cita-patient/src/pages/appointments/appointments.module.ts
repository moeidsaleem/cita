import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentsPage } from './appointments';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentsPage),
    TranslateModule.forChild()
  ],
})
export class AppointmentsPageModule {}
