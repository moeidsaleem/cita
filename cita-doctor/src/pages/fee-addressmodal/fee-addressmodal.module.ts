import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeeAddressmodalPage } from './fee-addressmodal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FeeAddressmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(FeeAddressmodalPage),
    TranslateModule.forChild()
  ],
})
export class FeeAddressmodalPageModule {}
