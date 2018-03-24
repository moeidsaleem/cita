import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerProvider } from '../server/server';
import 'rxjs/add/operator/map';
import { NetworkCheckProvider } from '../network-check/network-check';
import { AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
@Injectable()
export class AuthProvider {
  url_login = "";
  userData =
    {
      email: '',
      password: ''
    };
  user_id = null;
  doctor_name = null;
  isLoggedIn = false;
  loginfb = false;
  loginggmail = false;  
  joinDate='2018-01-25';

  


  constructor(public http: Http,private server : ServerProvider,private net : NetworkCheckProvider,
  private alertCtrl : AlertController, private fb : Facebook,private googlePlus: GooglePlus) {
   
    console.log('Hello AuthProvider Provider');
    this.url_login = "Account/LoginDoctor";
    this.LoginCheck();
  }

  LoginCheck() {
    var loggeduser = window.localStorage.getItem('user_id');
    if (loggeduser) {
      this.isLoggedIn = true;
      this.user_id = window.localStorage.getItem('user_id');
      this.doctor_name = window.localStorage.getItem('doctor_name');
      

    }
    else {
      this.isLoggedIn = false;
    }


      // var loggeduser = window.localStorage.getItem('user_id');
      // if (loggeduser) {
      //   if(this.loginfb)
      //   {
      //     this.loginfb = true;
      //   }
      //   else if(this.loginggmail)
      //   {
      //     this.loginggmail = true;
      //   }
      //   else
      //   {
      //     this.isLoggedIn = true;
      //   }
        
      //   this.user_id = window.localStorage.getItem('user_id');
      //   this.doctor_name = window.localStorage.getItem('doctor_name');
  
      // }
      // else {
      //   if(this.loginfb)
      //   {
      //     this.loginfb = false;
      //   }
      //   else if(this.loginggmail)
      //   {
      //     this.loginggmail = false;
      //   }
      //   else
      //   {
      //     this.isLoggedIn = false;
      //   }
      // }
  }

  checkExpiry(){
    let current = new Date();
    let expiry = new Date(this.joinDate);
    console.log(this.dateDiff(current,expiry));
    console.log(this.isLoggedIn);
    return this.dateDiff(current,expiry);
  
   
  }
  dateDiff(str1, str2){
    var diff = Date.parse(str2) - Date.parse(str1); 
    return Math.ceil(diff / 86400000)
    // return isNaN(diff) ? NaN : {
    //     diff: diff,
    //     ms: Math.ceil(diff % 1000),
    //     s: Math.ceil(diff / 1000 % 60),
    //     m: Math.ceil(diff / 60000 % 60),
    //     h: Math.ceil(diff / 3600000 % 24),
    //     d: Math.ceil(diff / 86400000)
    // };
}

  

  storeUserData(data) {
    window.localStorage.setItem("user_id", this.user_id = data['data'].doctor_id);
    window.localStorage.setItem("doctor_name", this.doctor_name = data['data'].doctor_full_name);
  }

  LoginUser(userData) {
 
      var params = "?email=" + userData.email + "&password=" + userData.password;
      return new Promise(resolve => {
        this.http.get(this.server.url + this.url_login + params).map(res => res.json()).subscribe(data => {
          if (data['status'] == "success") {
            this.isLoggedIn = true;
            this.storeUserData(data);
              resolve(true);
          }
          else {
            resolve(false);
  
          }
        })
      });
    
  }

  

  logout() {
    // if(this.loginfb)
    // {
    //   this.fb.logout();
    //   this.loginfb = false;
    //   this.user_id = null;
    //   window.localStorage.clear();
    //   window.location.reload();
     
    // } else if(this.loginggmail)
    // {
    //   this.googlePlus.logout();
    //   this.loginggmail = false;
    //   this.user_id = null;
    //   window.localStorage.clear();
    //   window.location.reload();
    // }
    // else
    // {
      this.isLoggedIn = false;
      this.user_id = null;
      this.fb.logout();
      this.googlePlus.logout();
      window.localStorage.clear();
      window.location.reload();
    //}
    
  }


}
