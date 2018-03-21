import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubspecializationmodelPage } from './subspecializationmodel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SubspecializationmodelPage,
  ],
  imports: [
    IonicPageModule.forChild(SubspecializationmodelPage),
    TranslateModule.forChild()

  ],
})
export class SubspecializationmodelPageModule {}
