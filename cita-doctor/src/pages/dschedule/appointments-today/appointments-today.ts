import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, ViewController } from 'ionic-angular';
import { ServerProvider } from '../../../providers/server/server';
import { AuthProvider } from '../../../providers/auth/auth';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MyApp } from '../../../app/app.component';



@IonicPage()
@Component({
  selector: 'page-appointments-today',
  templateUrl: 'appointments-today.html',
})


export class AppointmentsTodayPage {
  data;
  loading : Loading;
  url;
  DoctorAppointments;
  InsuranceCompanies;
  lng;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,
    private auth: AuthProvider,private alertCtrl : AlertController, 
    private loadingCtrl : LoadingController, private server : ServerProvider,private _sanitizer: DomSanitizer,
  private viewCtrl : ViewController,private app : MyApp) {
    this.lng = this.app.getCurrentLanguage();
    this.data = this.navParams.get('data');
    this.url = this.server.url + "Doctor/DoctorAppointments?doctor_id="+this.auth.user_id+"&date="+
    this.data.date;
    console.log(this.url);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentsTodayPage');
  }

  ionViewDidEnter()
  {
    this.loading = this.loadingCtrl.create({
      content: "Loading...!",
    });
    this.loading.present();
    this.LoadData().then(() => {
      this.loading.dismissAll();

    });
  }

  LoadData() {
    return new Promise(resolve => {
      this.http.get(this.url).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.DoctorAppointments = data['data'];
      
          resolve(true);
        }
        else {

          resolve(false);

        }
      })
    });
  }

  onBackButton() {

    this.navCtrl.pop();
    

  }
  OpenMessageApp(phonenumber)
  {
    window.open("sms://" + phonenumber,"_system");
  }

  OpenPhoneApp(phonenumber) {
    window.open("tel://" + phonenumber);
  }

}
