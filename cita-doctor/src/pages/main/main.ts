import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  doctorProfileRoot = 'DprofilePage'
  schedulesRoot = 'DschedulePage'
  patientsRoot = 'DpatientsPage'
  settingsRoot = 'SettingsPage'
    
  lng;
  constructor(public navCtrl: NavController,private auth : AuthProvider,private app : MyApp) {
    this.lng = this.app.getCurrentLanguage();
    if(!this.auth.isLoggedIn)
    {
      this.navCtrl.setRoot("DloginPage");
    }
  }

}
