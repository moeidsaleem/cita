import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesmodelPage } from './servicesmodel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ServicesmodelPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesmodelPage),
    TranslateModule.forChild()

  ],
})
export class ServicesmodelPageModule {}
