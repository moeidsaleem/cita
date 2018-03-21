import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DprofilePage } from './dprofile';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(DprofilePage),
    Ionic2RatingModule
  ],
})
export class DprofilePageModule {}
