import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptionPage } from './subscription';

@NgModule({
  declarations: [
    SubscriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscriptionPage),
  ],
})
export class SubscriptionPageModule {}
