import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Loading } from 'ionic-angular/components/loading/loading';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  appointment_url;
  appointments;
  loading: Loading;
  no_appointments = false;
  lat = null;
  lng = null;
  lang;


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
    private server: ServerProvider, private http: Http, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,private app : MyApp) {
      this.lang = this.app.getCurrentLanguage();
    if (!this.auth.isLoggedin) {
      this.navCtrl.setRoot("PloginPage");
    }
   

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad AppointmentsPage');
    if(this.auth.isLoggedin)
    {
  this.loading = this.loadingCtrl.create({
      content: "Loading",
    });
    this.loading.present();
    this.DownloadAppointments().then(() => {
      this.loading.dismissAll();
    });
  }
  }
  CancelAppointment(a) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Cancel',
      message: 'Do you want to cancel this appointment?',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.CancelApp(a);
          }
        }
      ]
    });
    alert.present();
  }
  CancelApp(a) {
    var params = this.server.url + "Patient/CancelAppointment?id=" + a;
    return new Promise(resolve => {

      this.http.get(params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.presentAlert("Success", "Appointment Cancelled");
          resolve(true);
        }
        else {
          this.presentAlert("Failed", "Appointment Cancellation Failed");
          resolve(false);
        }
      });
    });

  }
  presentAlert(status, message) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: message,
      buttons: [
        {
          text: 'Ok',
          role: 'Ok',
          handler: () => {
            this.ionViewWillEnter();

          }
        }
      ]
    });
    alert.present();
  }

Delete(a)
{
  let alert = this.alertCtrl.create({
    title: 'Confirm Cancel',
    message: 'Do you want to delete this appointment?',
    buttons: [
      {
        text: 'No',
        role: 'No',
        handler: () => {

        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.DeleteAppointment(a);
        }
      }
    ]
  });
  alert.present();
}

  

  DeleteAppointment(a)
  {
    var params = this.server.url + "Patient/DeleteAppointment?appointment_id="+a;
    return new Promise(resolve => {

      this.http.get(params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.presentAlert("Success", "Appointment Deleted");
          resolve(true);
        }
        else {
          this.presentAlert("Failed", "Appointment Deletion Failed");
          resolve(false);
        }
      });
    });
  }

  DownloadAppointments() {

    this.appointment_url = this.server.url + "Patient/MyAppointments?id=" + this.auth.user_id;
    console.log("url", this.appointment_url);
    return new Promise(resolve => {

      this.http.get(this.appointment_url).map(res => res.json()).subscribe(data => {

        if (data['status'] == "success") {
          this.appointments = data['data'];
          this.lat = data['data'].location_lat;
          this.lng = data['data'].location_lng;
          if (this.appointments == null || this.appointments == "") {
            this.no_appointments = true;
          }

          resolve(true);
        }
        else {

          resolve(false);
        }
      });
    });

  }


  OpenMap(lat,lng)
  {
    window.open("geo:?q="+lat+ "," + lng,"_system");
  }

}
