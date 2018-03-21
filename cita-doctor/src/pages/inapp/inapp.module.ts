import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InappPage } from './inapp';

@NgModule({
  declarations: [
    InappPage,
  ],
  imports: [
    IonicPageModule.forChild(InappPage),
  ],
})
export class InappPageModule {}
