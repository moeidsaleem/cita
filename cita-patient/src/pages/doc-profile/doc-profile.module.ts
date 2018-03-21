import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocProfilePage } from './doc-profile';
import { Ionic2RatingModule } from 'ionic2-rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DocProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(DocProfilePage),
    Ionic2RatingModule,
    TranslateModule.forChild()
  ],
})
export class DocProfilePageModule {}


