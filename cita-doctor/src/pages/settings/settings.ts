import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Socket } from 'ng-socket-io';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  language = false;
  lng;
  ChangeLanguageText;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, private auth: AuthProvider, private socket: Socket,
     private app: MyApp) {

      //this.translate.use("ar");

      this.lng = app.getCurrentLanguage();
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  openSettingsModal() {
    this.navCtrl.push("AccountSettingsModelPage");
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName)
      .present();

  }

  Language() {
    if (this.language == false) {
      this.language = true;
    }
    else {
      this.language = false;
    }
  }
 

}
