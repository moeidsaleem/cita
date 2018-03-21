import { HintModalPage } from './hint-modal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HintModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HintModalPage),
    TranslateModule.forChild()
  ],
  exports: [
    HintModalPage
  ]
})

export class HintModalPageModule { }
