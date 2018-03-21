import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-my-tab',
  templateUrl: 'my-tab.html'
})
export class MyTabPage {

  searchRoot = 'SearchPage'
  favoriteRoot = 'FavoritePage'
  appointmentsRoot = 'AppointmentsPage'
  lng;


  constructor(public navCtrl: NavController,private auth : AuthProvider,private app : MyApp)
   {
     this.lng = this.app.getCurrentLanguage();
   }

}
