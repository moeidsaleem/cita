import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssnamenumbermodelPage } from './assnamenumbermodel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AssnamenumbermodelPage,
  ],
  imports: [
    IonicPageModule.forChild(AssnamenumbermodelPage),
    TranslateModule.forChild()
  ],
})
export class AssnamenumbermodelPageModule {}
