import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DloginPage } from './dlogin';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DloginPage,
  ],
  imports: [
    IonicPageModule.forChild(DloginPage),
    TranslateModule.forChild()
  ],
})
export class DloginPageModule {}
