import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTabPage } from './my-tab';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyTabPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTabPage),
    TranslateModule.forChild()
  ]
})
export class MyTabPageModule {}
