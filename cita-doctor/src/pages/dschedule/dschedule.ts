import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, Loading } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { AuthProvider } from '../../providers/auth/auth';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-dschedule',
  templateUrl: 'dschedule.html',
})
export class DschedulePage {

  url;
  data;

  Appointments;
  day2; day3; day4; day5; day6;
  datearray = [];
  weekdays = [];
  loading: Loading;
  c_week_date;
  curr_date;
  current_date;
  n_week_date;
  n_week_ending_date;
  c_week_day;
  next_week_ending_d;
  week;
  isToggledC: boolean;
  isToggledN: boolean;
  thisWeek;
  nextWeek;
  DoctorAvailability;
  ScheduleUrl;
  DoctorSchedules;
  no_appointments;
  lng;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private http: Http,
    public modalCtrl: ModalController, public alertCtrl: AlertController,
    private server: ServerProvider, private auth: AuthProvider,private net : NetworkCheckProvider,
  private app : MyApp) {
    this.lng = app.getCurrentLanguage();

    this.isToggledC = false;
    this.url = this.server.url + "Doctor/Appointments?doctor_id=" + this.auth.user_id;
    this.ScheduleUrl = this.server.url + "Doctor/Schedules?id=" + this.auth.user_id;
      console.log(this.ScheduleUrl);
    this.current_date = new Date();
    this.curr_date = this.current_date.getDay();
    this.c_week_day = 6 - this.curr_date;
    if (this.c_week_day == 1) {
      var current_week_ending_date = new Date(this.current_date.getTime() + 0 * 24 * 60 * 60 * 1000).getDate();
      var current_week_ending_month = new Date(this.current_date.getTime() + 0 * 24 * 60 * 60 * 1000).getMonth();
      var current_week_ending_year = new Date(this.current_date.getTime() + 0 * 24 * 60 * 60 * 1000).getFullYear();

      this.c_week_date = current_week_ending_date + "-" + current_week_ending_month + "-" + current_week_ending_year;

      var next_week_starting_date = new Date(this.current_date.getTime() + 1 * 24 * 60 * 60 * 1000).getDate();
      var next_week_starting_month = new Date(this.current_date.getTime() + 1 * 24 * 60 * 60 * 1000).getMonth();
      var next_week_starting_year = new Date(this.current_date.getTime() + 1 * 24 * 60 * 60 * 1000).getFullYear();

      this.n_week_date = next_week_starting_date + "-" + next_week_starting_month + "-" + next_week_starting_year;

    }
    this.next_week_ending_d = 6 + this.c_week_day;
    var next_week_ending_date = new Date(this.current_date.getTime() + this.next_week_ending_d * 24 * 60 * 60 * 1000).getDate();
    var next_week_ending_month = new Date(this.current_date.getTime() + this.next_week_ending_d * 24 * 60 * 60 * 1000).getMonth();
    var next_week_ending_year = new Date(this.current_date.getTime() + this.next_week_ending_d * 24 * 60 * 60 * 1000).getFullYear();

    this.n_week_ending_date = next_week_ending_date + "-" + next_week_ending_month + "-" + next_week_ending_year;

  }

  public notify() {

    if (this.isToggledC == true) {

      this.thisWeek = "currentWeek";
      this.UpdateData();

    }
  }

  OpenWorkingHoursPage() {
    this.navCtrl.push("DWorkinghoursPage");
  }

  openModal(pageName, modaldata) {
    let modal = this.modalCtrl.create(pageName, { data: modaldata });

    modal.onDidDismiss(() => {
      if(this.net.networkCheck)
      {
     this.ionViewWillEnter();
    }
    else
    {
      this.pAlert("No Internet Connection");
    }
    })
      modal.present();
  }

  public notifyN() {

    if (this.isToggledN == true) {

      this.nextWeek = "nextWeek";
    }
  }

  Back() {
    this.navCtrl.pop();
  }

  UpdateData() {

  }




  Schedule = "Summary";

  ionViewDidLoad(){
    console.log('ionViewDidLoad DschedulePage');

    if(this.net.networkCheck)
    {
    this.loading = this.loadingCtrl.create({
      content: "Loading",
    });
    //this.loading.present();
    this.LoadData().then(() => {
      this.loading.dismissAll();

    });

    this.GetSchedules();
  }
  else
  {
    this.pAlert("No Internet Connection");
  }

  }

  ionViewWillEnter() {
    console.log('ionViewDidEnter DschedulePage');
    if(this.net.networkCheck)
    {
   
    //this.loading.present();
    this.LoadData().then(() => {
    // this.loading.dismissAll();

    });

    this.GetSchedules();
  }
  else
  {
    this.pAlert("No Internet Connection");
  }
  }

  openScheduleModal(modaldata) {
    this.openModal('AppointmentsTodayPage', modaldata);
  }
  ionViewDidEnter() {
   
  }
  pAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Internet',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();

  }

  GetSchedules() {
    console.log(this.ScheduleUrl);
    return new Promise(resolve => {
      this.http.get(this.ScheduleUrl).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.DoctorSchedules = data['data'];

          resolve(true);
        }
        else {

          resolve(false);

        }
      })
    });
  }

  LoadData() {
    console.log(this.url);
    return new Promise(resolve => {
      this.http.get(this.url).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.Appointments = data['data'];
          console.log(this.Appointments);
          this.no_appointments = false;

          resolve(true);
        }
        else {
          this.no_appointments = true;

          resolve(false);

        }
      })
    });
  }




}
