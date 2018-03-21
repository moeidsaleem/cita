import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, Loading, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-patientadd',
  templateUrl: 'patientadd.html',
})
export class PatientaddPage {
  patient_f_name;
  patient_l_name;
  mobile_number;
  email;
  street_address;
  gender;
  loading : Loading;
  add_url;
  lng;

  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl : LoadingController,
  private alertCtrl : AlertController,private auth : AuthProvider,private server : ServerProvider,
private http : Http,private app : MyApp) {
  this.lng = app.getCurrentLanguage();

    this.add_url = this.server.url + "Doctor/AddPatient";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientaddPage');
  }

  AddPatient()
  {
    var params = "?f_name="+this.patient_f_name+"&lname="+this.patient_l_name+"&phone="+this.mobile_number+
    "&email="+this.email+"&street_address="+this.street_address+"&gender="+this.gender+"&id="+this.auth.user_id;

    return new Promise(resolve => {
      this.http.get(this.add_url + params).map(res =>res.json()).subscribe(data => {
        if(data['status'] == "success")
        {
          this.presentAlert("Patient","Added Successfully");
          resolve(true);
        }
        else
        {
          resolve(false);
        }
      })
    })
  }

  presentAlert(status, message) {
    let alert = this.alertCtrl.create({
      title: status,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  onBackButton()
  {
    this.navCtrl.pop();
  }



}
