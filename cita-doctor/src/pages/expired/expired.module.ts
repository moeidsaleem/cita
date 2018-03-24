import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpiredPage } from './expired';

@NgModule({
  declarations: [
    ExpiredPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpiredPage),
  ],
})
export class ExpiredPageModule {}
