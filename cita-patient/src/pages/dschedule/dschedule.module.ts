import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DschedulePage } from './dschedule';

@NgModule({
  declarations: [
    DschedulePage,
  ],
  imports: [
    IonicPageModule.forChild(DschedulePage),
  ],
})
export class DschedulePageModule {}
