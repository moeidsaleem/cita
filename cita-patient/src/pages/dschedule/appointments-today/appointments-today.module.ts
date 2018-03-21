import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentsTodayPage } from './appointments-today';

@NgModule({
  declarations: [
    AppointmentsTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentsTodayPage),
  ],
})
export class AppointmentsTodayPageModule {}
