import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { AuthProvider } from '../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'MyTabPage';
  language = false;

@ViewChild(Nav) nav:Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private notify : NotificationsProvider,
  private auth : AuthProvider,private translate: TranslateService) {

    this.setDefaultLanguage();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
   
  }

  Language() {
    if (this.language == false) {
      this.language = true;
    }
    else {
      this.language = false;
    }
  }

  Logout()
  {
    this.nav.push("PloginPage");
  }
  searchPage() {
    this.nav.push('SearchResultPage');
  }

  docProfilePage() {
    this.nav.push('DocProfilePage');
  }

  profileSettingPage() {
    this.nav.push('ProfileSettingPage');
  }


  dLoginPage() {
    this.nav.push('DloginPage');
  }

  aboutUsPage() {
    this.nav.push('AboutusPage');
  }

  contactUsPage() {
    this.nav.push('ContactusPage');
  }
  offerPage(){  
    this.nav.push('OffersPage')
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

