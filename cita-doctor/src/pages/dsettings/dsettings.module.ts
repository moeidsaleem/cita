import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DsettingsPage } from './dsettings';

@NgModule({
  declarations: [
    DsettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(DsettingsPage),
  ],
})
export class DsettingsPageModule {}
