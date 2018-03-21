import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PloginPage } from './plogin';

@NgModule({
  declarations: [
    PloginPage,
  ],
  imports: [
    IonicPageModule.forChild(PloginPage),
  ],
})
export class PloginPageModule {}
