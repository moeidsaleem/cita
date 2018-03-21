import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, ActionSheetController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-dpatients',
  templateUrl: 'dpatients.html',
})
export class DpatientsPage {

  url;
  loading : Loading;
  doctorPatients;
  searchValue;
  dpatients;
  lng;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth : AuthProvider,
  private server : ServerProvider, private loadingCtrl : LoadingController, private http : Http,
private app : MyApp) {
  this.lng = app.getCurrentLanguage();
    this.url = this.server.url + "Doctor/AppointmentsDoctors?id="+this.auth.user_id;
  }



  ionViewWillEnter() 
  {
    this.loading = this.loadingCtrl.create({
      content : "Loading....",
    });
    this.loading.present();

    this.LoadData().then(() => {
      this.loading.dismissAll();
    });
  }

  Search(value)
  {
    this.doctorPatients = this.dpatients.filter(p => p.patient_name == value); 
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

  AddPatient()
  {
    this.navCtrl.push("PatientaddPage");
  }
  OpenMessageApp(phonenumber)
  {
    console.log(phonenumber);
    window.open("sms://" + phonenumber,"_system");
  }

  OpenPhoneApp(phonenumber) {
    console.log(phonenumber);
    window.open("tel://" + phonenumber);
  }

}
