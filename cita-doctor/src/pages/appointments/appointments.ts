import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, ActionSheetController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import { MyApp } from '../../app/app.component';
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  url;
  loading : Loading;
  doctorPatients;
  searchValue;
  dpatients;
  lng;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth : AuthProvider,
    private server : ServerProvider, private loadingCtrl : LoadingController, private http : Http,
  private app : MyApp, private alertCtrl : AlertController,private socket : Socket) {
    this.lng = app.getCurrentLanguage();
    this.url = this.server.url + "Doctor/DoctorPatients?doctor_id="+this.auth.user_id;
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content : "Loading....",
    });
    this.loading.present();

    this.LoadData().then(() => {
      this.loading.dismissAll();
    });
  }
  LoadData()
  {
    console.log(this.url);
    return new Promise(resolve => {
      this.http.get(this.url).map(res => res.json()).subscribe (data => {
        if(data['status'] == "success")
        {
          this.doctorPatients = data['data'];
          this.dpatients = this.doctorPatients;
          resolve(true);
        }
        else
        {
          resolve(false);
        }
      })
    })
  }
  OpenMessageApp(phonenumber)
  {
    window.open("sms://" + phonenumber,"_system");
  }

  OpenPhoneApp(phonenumber) {
    window.open("tel://" + phonenumber);
  }

  Approve(a,p)
  {
    let alert = this.alertCtrl.create({
      title: 'Confirm Approve',
      message: 'Do you want to approve this appointment?',
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
            this.ApproveApp(a,p);
          }
        }
      ]
    });
    alert.present();
  }

  ApproveApp(a,p)
  {
    var params = this.server.url + "Doctor/ApproveAppointment?id=" + a;
    return new Promise(resolve => {

      this.http.get(params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.socket.connect();
          this.socket.emit('message', { user_id: p, title: "Appointment", msg: "Appointment Approved By " + this.auth.doctor_name });

          this.presentAlert("Success", "Appointment Approved");
          resolve(true);
        }
        else {
          this.presentAlert("Failed", "Please try Again");
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

  Cancel(a,c)
  {
    let alert = this.alertCtrl.create({
      title: 'Confirm Cancel',
      message: 'Do you want to Cancel this appointment?',
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
            this.CancelApp(a,c);
          }
        }
      ]
    });
    alert.present();
  }

  CancelApp(a,c)
  {
    var params = this.server.url + "Doctor/CancelAppointment?id=" + a;
    return new Promise(resolve => {

      this.http.get(params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.socket.connect();
          this.socket.emit('message', { user_id: c, title: "Appointment", msg: "Appointment Cancelled By " + this.auth.doctor_name });

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

}
