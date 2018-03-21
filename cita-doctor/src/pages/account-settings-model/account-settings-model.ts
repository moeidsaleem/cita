import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-account-settings-model',
  templateUrl: 'account-settings-model.html',
})
export class AccountSettingsModelPage {
  email;
  phone;
  url;
  loading: Loading;
  lng;
  spec_url;
  specialization;
  specialization_id;
  spc;
  no_spec = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,
    private auth: AuthProvider, private server: ServerProvider, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private net : NetworkCheckProvider, private viewCtrl : ViewController,
  private app : MyApp) {
    this.lng = this.app.getCurrentLanguage();
      this.url = this.server.url + "Doctor/AccountSettings?doctor_id="+this.auth.user_id;

      this.spec_url = this.server.url + "Doctor/Specializations";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSettingsModelPage');
  }

  ionViewDidEnter()
  {
    if(this.net.networkCheck) {

      this.AllSpecializations();
    this.loading = this.loadingCtrl.create({
      content : "Loading..",
    });
    this.loading.present();
    this.LoadData().then(() =>{
      this.loading.dismissAll();
    });
  }
  else
  {
    this.pAlert("No Internet Connection");
  }
  }

  SpID(specialization_id) {
    this.specialization_id = specialization_id;
  }


  pAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Internet',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();

  }

  AllSpecializations() {
    return new Promise(resolve => {

      this.http.get(this.spec_url).map(res => res.json()).subscribe(data => {
        console.log(data);

        if (data['status'] == "success") {
          console.log("Success!");
          console.log(data['data']);
          this.specialization = data['data'];
          resolve(true);

        }
        else {
          console.log("Failed!");
          this.presentAlert("Failed", "No Specializations");
          resolve(false);

        }


      });
    });
  }


  LoadData()
  {
    console.log(this.url);
    return new Promise(resolve =>{
      this.http.get(this.url).map(res =>res.json()).subscribe(data => {
        if(data['status'] == "success")
        {
          this.email = data['data'].email;
          this.phone = data['data'].phone;
          this.spc = data['data'].spec;
          if(this.spc != null)
          {
            this.no_spec = true;
          }
          resolve(true);
        }
        else
        {
          resolve(false);
        }
      })
    })
  }

  UpdatePhone()
  {
    if(this.net.networkCheck)
    {
    var params = this.server.url + "Doctor/UpdatePhone?doctor_id="+this.auth.user_id +"&phone="+this.phone
    +"&spe_id="+this.specialization_id;

    return new Promise(resolve => {
      this.http.get(params).map(res =>res.json()).subscribe(data => {
        if(data['status'] == "success")
        {
          this.presentAlert("Success","Updated SuccessFully");
          resolve(true);
        }
        else
        {
          this.presentAlert("Failed","Try Again Later");
        }
      })
    })
  }
  else
  {
    this.pAlert("No Internet Connection");
  }

  }
  onBackButton() {

    this.navCtrl.pop();

  }

  presentAlert(status, message) {
    let alert = this.alertCtrl.create({
      title: status,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.viewCtrl.dismiss();
       //     this.navCtrl.push("MainPage");
            //this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
