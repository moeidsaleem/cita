import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DprofilePage } from './dprofile';
import { Ionic2RatingModule } from 'ionic2-rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(DprofilePage),
    TranslateModule.forChild(),
    Ionic2RatingModule
  ],
})
export class DprofilePageModule {}
