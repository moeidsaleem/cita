import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DloginPage } from './dlogin';

@NgModule({
  declarations: [
    DloginPage,
  ],
  imports: [
    IonicPageModule.forChild(DloginPage),
  ],
})
export class DloginPageModule {}
