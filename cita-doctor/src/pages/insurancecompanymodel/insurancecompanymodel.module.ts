import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsurancecompanymodelPage } from './insurancecompanymodel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InsurancecompanymodelPage,
  ],
  imports: [
    IonicPageModule.forChild(InsurancecompanymodelPage),
    TranslateModule.forChild()
  ],
})
export class InsurancecompanymodelPageModule {}
