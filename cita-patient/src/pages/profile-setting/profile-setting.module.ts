import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileSettingPage } from './profile-setting';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ProfileSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileSettingPage),
    TranslateModule.forChild()
  ],
})
export class ProfileSettingPageModule {}
