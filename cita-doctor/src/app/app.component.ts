import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';
import { AuthProvider } from '../providers/auth/auth';
import { NotificationProvider } from '../providers/notification/notification';

import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'MainPage';
  //rootPage : any = 'InappPage';

  @ViewChild(Nav) nav: Nav;

  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthProvider,
    private notify: NotificationProvider, private translate: TranslateService) {

    if (!this.auth.isLoggedIn) {
      this.rootPage = "DloginPage";
      
    }
    if(this.auth.isLoggedIn){
      if(this.auth.checkExpiry()>0){
        //expired 
        console.log('plan has expired');
        this.rootPage ='ExpiredPage';
      }
      

    } 
  

    this.setDefaultLanguage();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }



 

  getCurrentLanguage(){
    if(localStorage.getItem("lng")){
      return localStorage.getItem("lng")
    }
    else{
      return "english";
    }
  }

  ChangeLanguage(language) {
    console.log("Parameter val", language);

    if (language == "english") {
      this.translate.setDefaultLang("en");
      localStorage.setItem("lng","english");
    }
    else {
      this.translate.setDefaultLang("ar");
      localStorage.setItem("lng","arabic");
    }
  }

  setDefaultLanguage(){
    if(localStorage.getItem("lng")){

      var lang = localStorage.getItem("lng");

      if(lang == "arabic"){
        this.translate.setDefaultLang("ar");
      }
      else{
        this.translate.setDefaultLang("en");
      }

    }
    else{
      localStorage.setItem("lng","english");
      this.translate.setDefaultLang("en");
    }
  }


}

