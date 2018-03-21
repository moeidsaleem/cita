import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentsTodayPage } from './appointments-today';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppointmentsTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentsTodayPage),
    TranslateModule.forChild()
  ],
})
export class AppointmentsTodayPageModule {}
