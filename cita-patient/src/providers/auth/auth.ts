import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerProvider } from '../server/server';
import 'rxjs/add/operator/map';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';


@Injectable()
export class AuthProvider {
  url_login ;
  login_fb = false;
  login_google = false;
  userData = {
    email: '',
    password: ''
  };
  user_id = null;
  patient_name = null;
  isLoggedin = false;
  constructor(public http: Http,private server:ServerProvider,private geoCoder: NativeGeocoder,
  private fb : Facebook,private googlePlus : GooglePlus) {
    console.log('Hello AuthProvider Provider');
    this.url_login = "Account/LoginPatient";
    this.LoginCheck();

  }

  storeUserData(data) {
    window.localStorage.setItem('user_id', this.user_id = data['data'].patient_id);
    window.localStorage.setItem('patient_name', this.patient_name = data['data'].patient_full_name);
  }

  LoginCheck() {
    var loggeduser = window.localStorage.getItem('user_id');
    if (loggeduser) {
      this.isLoggedin = true;
      this.user_id = window.localStorage.getItem('user_id');
      this.patient_name = window.localStorage.getItem('patient_name');
    }
    else {
      this.isLoggedin = false;
    }

  }

  logout() {
    this.isLoggedin = false;
    this.user_id = null;
    this.fb.logout();
    this.googlePlus.logout();
    window.localStorage.clear();
    window.location.reload();
  }

  LoginUser(userData) {
    var params = "?email=" + userData.email + "&password=" + userData.password;
    console.log("login;",this.server.url+this.url_login+params);
    return new Promise(resolve => {
      this.http.get(this.server.url + this.url_login + params).map(res => res.json()).subscribe(data => {
        console.log(data);
        if (data['status'] == "success") {
          this.storeUserData(data);
          this.isLoggedin = true;
          resolve(true);
        }
        else {
          resolve(false);
        }
      },()=>{
        resolve(false);
      });
    });
  }
}
