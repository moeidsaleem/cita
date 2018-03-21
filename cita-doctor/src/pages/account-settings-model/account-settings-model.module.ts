import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountSettingsModelPage } from './account-settings-model';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountSettingsModelPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountSettingsModelPage),
    TranslateModule.forChild()

  ],
})
export class AccountSettingsModelPageModule {}
