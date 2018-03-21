import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DWorkinghoursPage } from './d-workinghours';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DWorkinghoursPage,
  ],
  imports: [
    IonicPageModule.forChild(DWorkinghoursPage),
    TranslateModule.forChild()
  ],
})
export class DWorkinghoursPageModule {}
