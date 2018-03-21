import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DschedulePage } from './dschedule';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DschedulePage,
  ],
  imports: [
    IonicPageModule.forChild(DschedulePage),
    TranslateModule.forChild()
  ],
})
export class DschedulePageModule {}
