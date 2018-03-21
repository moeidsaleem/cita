import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading } from 'ionic-angular';

import { AuthProvider } from '../../../providers/auth/auth';
import { ServerProvider } from '../../../providers/server/server';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NetworkCheckProvider } from '../../../providers/network-check/network-check';
import { MyApp } from '../../../app/app.component';



@IonicPage()
@Component({
  selector: 'page-clinic',
  templateUrl: 'clinic.html',
})
export class ClinicPage {

  ClinicData;
  loading : Loading;
  url;
  clinic_name;
  assisstant_number;
  lng;

 


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private auth: AuthProvider, private server: ServerProvider, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,private http : Http,private net : NetworkCheckProvider,
  private app : MyApp) {

    this.lng = app.getCurrentLanguage();
    this.ClinicData = this.navParams.get("data");
    this.clinic_name = this.ClinicData.clinic_name;
    this.assisstant_number = this.ClinicData.clinic_number;
    this.url = this.server.url + "Doctor/UpdateClinicNameAddress";

  }


  UpdateNameAddress()
  {
    if(this.net.networkCheck)
    {

    this.loading = this.loadingCtrl.create({
      content: "Loading...!",
    });
    this.loading.present();
    this.Update().then(() => {
      this.loading.dismissAll();
    });
  }
  else
  {
    this.pAlert("No Internet Connection");
  }
  }
  pAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Internet',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();

  }

  Update()
  {
    var params = "?doctor_id=" + this.auth.user_id + "&clinic_name=" + this.clinic_name + "&assistant_number="+this.assisstant_number;
    console.log(this.url + params);
    return new Promise(resolve => {
      this.http.get(this.url + params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.presentAlert("Success", "Updated Successfully");
          resolve(true);
        }
        else {
          this.presentAlert("Failed", "Failed to Update");
          resolve(false);
        }
      })
    });
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
            //this.navCtrl.push("MainPage");
            //this.navCtrl.push("DprofilePage");
          }
        }
      ]
    });
    alert.present();
  }

  onBackButton() {

    this.navCtrl.pop();

  }


}
