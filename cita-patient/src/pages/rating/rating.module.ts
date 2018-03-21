import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatingPage } from './rating';
import { Ionic2RatingModule } from "ionic2-rating";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RatingPage,
  ],
  imports: [
    IonicPageModule.forChild(RatingPage),
    Ionic2RatingModule,
    TranslateModule.forChild()
  ],
})
export class RatingPageModule {}
