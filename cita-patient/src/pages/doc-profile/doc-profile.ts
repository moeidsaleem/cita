import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { ServerProvider } from '../../providers/server/server';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Http } from '@angular/http';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Socket } from 'ng-socket-io';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';



@IonicPage()
@Component({
  selector: 'page-doc-profile',
  templateUrl: 'doc-profile.html',
})
export class DocProfilePage {
  rate = 5;
  details = 'doctor';
  loading: Loading;
  doctor;
  doctor_id = null;
  url;
  s_doctor;
  reviews;
  schedule;
  lang;
  service;
  insurance_companies;
  currentIndex = 0;
  temp;
  color = [];
  day; time_slot = null;
  book_now_button = false;
  @ViewChild(Slides) slides: Slides;
  date;
  lat = null;
  lng = null;
  initial_slots = false;
  final_slots = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private server: ServerProvider, private loadingCtrl: LoadingController, public http: Http,
    private auth: AuthProvider, private toastCtrl: ToastController,private socket : Socket,private network: Network,
  private app : MyApp)
     {
       this.lang = this.app.getCurrentLanguage();
    this.doctor = navParams.get('profile');
    if (this.doctor != null || this.doctor != undefined) {
      console.log(this.doctor);
      this.doctor_id = this.doctor.doctor_id;
      this.storeDoctor(this.doctor_id, JSON.stringify(this.doctor));
      this.url = this.server.url + "Patient/DoctorProfile?id=" + this.doctor_id;
    }
    else {
      this.doctor_id = window.localStorage.getItem("doctor_id");
      this.url = this.server.url + "Patient/DoctorProfile?id=" + this.doctor_id;
      this.doctor = JSON.parse(window.localStorage.getItem("doctor"));
      console.log(this.doctor);
    }

    //let connectSubscription = this.network.onConnect().subscribe(() => {
    this.loading = this.loadingCtrl.create({
      content: "Loading..!",
    });
    this.loading.present();
    this.LoadDoctor().then(() => {
      this.temp = this.schedule[this.currentIndex].time_slots;
      this.day = this.schedule[this.currentIndex].day;
      this.date = this.schedule[this.currentIndex].date;

      if(this.schedule[this.currentIndex].time_slots == 0)
      {
        this.initial_slots = true;
      }
      else
      {
        this.initial_slots = false;
      }

      this.ChangeColor();

      this.loading.dismissAll();

  });
  let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    this.presentT();
  });
  }

  presentT() {
    let toast = this.toastCtrl.create({
      message: 'Network Disonnected',
      duration: 3000
    });
    toast.present();
  }

  storeDoctor(doctor_id, doctor) {
    window.localStorage.setItem("doctor_id", doctor_id);
    window.localStorage.setItem("doctor", doctor);
  }

  ChangeColor() {
    this.color = [];
    this.temp.forEach(element => {
      this.color.push('rgba(52, 152, 219,0.6)');
    });
  }

  ionViewDidLoad() {
  
    

  }

  nextSlide(){
    this.currentIndex = this.slides.getActiveIndex();
    this.slides.slideTo(this.currentIndex+1, 500);
    this.slideChanged();

  }
  previousSlide(){
    this.currentIndex = this.slides.getActiveIndex();
    this.slides.slideTo(this.currentIndex-1, 500);
    this.slideChanged();
  }


  slideChanged() {
    this.ChangeColor();
    this.currentIndex = this.slides.getActiveIndex();
    if (this.currentIndex < this.schedule.length) {
      this.initial_slots = false;
      this.ChangeColor();
      this.day = this.schedule[this.currentIndex].day;
      this.date = this.schedule[this.currentIndex].date;
      this.temp = this.schedule[this.currentIndex].time_slots;

      if(this.temp.length == 0)
      {
       this.final_slots = true;
      }
      else
      {
        this.final_slots = false;
      }

      
    }
  }

  TimeSlot(t, i) {
    this.ChangeColor();
    this.time_slot = t;
    this.color[i] = "rgba(41, 128, 185,1.0)";
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Please Select Time Slot',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  displayToast() {
    let toast = this.toastCtrl.create({
      message: 'Appointment Booked',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  Book() {
    if (this.time_slot == null) {

      this.presentToast();
    }
    else {
      this.BookAppintment(this.auth.user_id, this.doctor_id, this.day, this.date, this.time_slot);
      console.log(this.time_slot);
    }
  }

  BookAppintment(user_id, doctor_id, day, date, time_slot) {
    if (this.auth.isLoggedin) {
      var book_appointment = this.server.url + "Patient/BookAppointment?";
      var params = "patient_id=" + user_id + "&doctor_id=" + doctor_id + "&time_slot=" + encodeURI(time_slot) + "&day=" + encodeURI(day) + "&date=" + date;
      console.log("url", book_appointment + params);
      return new Promise(resolve => {

        this.http.get(book_appointment + params).map(res => res.json()).subscribe(data => {
          if (data['status'] == "success") {
            this.socket.connect();
            this.socket.emit('message', { user_id: doctor_id, title: "Appointment", msg: "Appointment Booked By " + this.auth.patient_name });

            this.displayToast();
            this.navCtrl.setRoot("AppointmentsPage");
            resolve(true);
          }
          else {
            resolve(false);
          }
        });
      });
    }
    else {
      this.navCtrl.setRoot("PloginPage");
    }

  }

  LoadDoctor() {

    console.log(this.url);
    return new Promise(resolve => {

      this.http.get(this.url).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.s_doctor = data['data'];
          this.lat =this.s_doctor.location_lat;
          this.lng = this.s_doctor.location_lng;
          this.reviews = data['data'].reviews;
          this.schedule = data['data'].schedule;
          this.service = data['data'].service;
          this.insurance_companies = data['data'].insurance_companies;
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });
  }

  Review()
  {
    this.navCtrl.push("RatingPage",{
      doctor_id : this.doctor_id
    });
  }



  OpenMap(lat,lng)
  {
    window.open("geo:?q="+lat+ "," + lng,"_system");
  }
}
