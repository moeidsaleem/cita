import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, Loading, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-d-workinghours',
  templateUrl: 'd-workinghours.html',
})
export class DWorkinghoursPage {
  loading : Loading;
  SaturdayT: boolean;
  divvalue: boolean;
  SundayT: boolean;
  divvaluesunday: boolean;
  MondayT: boolean;
  divvalueMonday: boolean;
  TuesdayT: boolean;
  divvalueTuesday: boolean;
  WednesdayT: boolean;
  divvalueWednesday: boolean;
  ThursdayT: boolean;
  divvalueThursday: boolean;
  FridayT: boolean;
  divvalueFriday: boolean;
  bookings: string;

  timeStartsWed = "00:00";
  timeEndsWed = "00:00";
  timeStartsFri = "00:00";
  timeEndsFri = "00:00";
  timeStartsThu = "00:00";
  timeEndsThu = "00:00";
  timeStartsSat = "00:00";
  timeEndsSat = "00:00";
  timeStartsSun = "00:00";
  timeEndsSun = "00:00";
  timeStartsMon = "00:00";
  timeEndsMon = "00:00";
  timeStartsTue = "00:00";
  timeEndsTue = "00:00";
  Saturday = "00:00";
  Sunday; Monday; Tuesday; Wednesday; Thursday; Friday;

  params;
  days = [];
  GetScheduleList ;
  ScheduleList = "";
  lng;




  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private http: Http, private toastCtrl: ToastController,
    private auth: AuthProvider, private server: ServerProvider, private viewCtrl: ViewController,
  private app : MyApp) {
    this.lng= app.getCurrentLanguage();
    this.SaturdayT = false;
    this.divvalue = false;
    this.SundayT = false;
    this.divvaluesunday = false;
    this.MondayT = false;
    this.divvalueMonday = false;
    this.TuesdayT = false;
    this.divvalueTuesday = false;
    this.WednesdayT = false
    this.divvalueWednesday = false;
    this.ThursdayT = false;
    this.divvalueThursday = false;
    this.FridayT = false;
    this.divvalueFriday = false;
    this.GetScheduleList = this.server.url + "Doctor/GetScheduleList?doctor_id="+this.auth.user_id;

  }

  setToggles(data){

    data.forEach(element => {
      
      if(element['status'] == 'active' && element['day'] == 'monday'){
        this.MondayT = true;
        this.divvalueMonday = true;
        this.timeStartsMon = element['time_start'];
        this.timeEndsMon = element['time_end'];
      }

      if(element['status'] == 'active' && element['day'] == "saturday")
      {
        this.SaturdayT = true;
        this.divvalue = true;
        this.timeStartsSat = element['time_start'];
        this.timeEndsSat = element['time_end'];
      }
      if(element['status'] == 'active' && element['day'] == "sunday")
      {
        this.divvaluesunday = true;
        this.SundayT = true;
        this.timeStartsSun = element['time_start'];
        this.timeEndsSun = element['time_end'];
      }
      if(element['status'] == 'active' && element['day'] == "tuesday")
      {
        this.divvalueTuesday = true;
        this.TuesdayT = true;
        this.timeStartsTue = element['time_start'];
        this.timeEndsTue = element['time_end'];
      }
      if(element['status'] == 'active' && element['day'] == "wednesday")
      {
        this.divvalueWednesday = true;
        this.WednesdayT = true;
        this.timeStartsWed = element['time_start'];
        this.timeEndsWed = element['time_end'];
      }
      if(element['status'] == 'active' && element['day'] == "thursday")
      {
        this.divvalueThursday = true;
        this.ThursdayT = true;
        this.timeStartsThu = element['time_start'];
        this.timeEndsThu = element['time_end'];
      }
      if(element['status'] == 'active' && element['day'] == "friday")
      {
        this.divvalueFriday = true;
        this.FridayT = true;
        this.timeStartsFri = element['time_start'];
        this.timeEndsFri = element['time_end'];
      }

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DWorkinghoursPage');
    this.loading = this.loadingCtrl.create({
      content : "Loading....!",
    });
    this.loading.present();
    this.GetList().then(() => {
      this.loading.dismissAll();      
    })
  }

  onBackButton() {
    this.navCtrl.pop();

  }

  GetList()
  {
    return new Promise(resolve => {
      this.http.get(this.GetScheduleList).map(res => res.json()).subscribe(data => {
        if(data['status'] == "success")
        {
          this.ScheduleList = data['data'];
          this.setToggles(data['data']);
          resolve(true);
        }
        else
        {
          resolve(false);
        }
      })
    })
  }


  click(value) {

    
    if (this.SaturdayT == true) {
      this.Saturday = "saturday";
      this.divvalue = true;
    }
    else {
      this.Saturday = "";
      this.divvalue = false;
    }
  }

  sundayclick(value) {
    if (this.SundayT == true) {
      this.Sunday = "sunday";
      this.divvaluesunday = true;
    }
    else {
      this.Sunday = "";
      this.divvaluesunday = false;
    }

  }
  Mondayclick() {
    if (this.MondayT == true) {
      this.Monday = "monday";
      this.divvalueMonday = true;
    }
    else {
      this.Monday = "";
      this.divvalueMonday = false;
    }

  }
  Tuesdayclick() {

    if (this.TuesdayT == true) {
      this.Tuesday = "tuesday";
      this.divvalueTuesday = true;
    }
    else {
      this.Tuesday = "";
      this.divvalueTuesday = false;
    }

  }
  Wednesdayclick() {
    if (this.WednesdayT == true) {
      this.Wednesday = "wednesday";
      this.divvalueWednesday = true;
    }
    else {
      this.Wednesday = "";
      this.divvalueWednesday = false;
    }

  }
  Thursdayclick() {

    if (this.ThursdayT == true) {
      this.Thursday = "thursday";
      this.divvalueThursday = true;
    }
    else {
      this.Thursday = "";
      this.divvalueThursday = false;
    }

  }

  Fridayclick() {
    if (this.FridayT == true) {
      this.Friday = "friday";
      this.divvalueFriday = true;
    }
    else {
      this.Friday = "";
      this.divvalueFriday = false;
    }

  }


  clickbookings(value) {
    this.bookings = value;
  }
  timeStartsclickSat(value) {
    console.log(value);

    this.timeStartsSat = value;
  }

  timeEndsclickSat(value) {
    this.timeEndsSat = value;
  }

  timeStartsclickSun(value) {

    this.timeStartsSun = value;
  }

  timeEndsclickSun(value) {
    this.timeEndsSun = value;
  }


  timeStartsclickMon(value) {

    this.timeStartsMon = value;
  }

  timeEndsclickMon(value) {
    this.timeEndsMon = value;
  }


  timeStartsclickTue(value) {

    this.timeStartsTue = value;
  }

  timeEndsclickTue(value) {
    this.timeEndsSat = value;
  }


  timeStartsclickWed(value) {

    this.timeStartsWed = value;
  }

  timeEndsclickWed(value) {
    this.timeEndsWed = value;
  }


  timeStartsclickThu(value) {

    this.timeStartsThu = value;
  }

  timeEndsclickThu(value) {
    this.timeEndsThu = value;
  }


  timeStartsclickFri(value) {

    this.timeStartsFri = value;
  }

  timeEndsclickFri(value) {
    this.timeEndsFri = value;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Added Successfully',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  UpdateSchedule() {
    this.days = [];
    if(this.divvalue==true)
    {
      var temp = {day:'sat',timestart:this.timeStartsSat,timeend:this.timeEndsSat,fullday:'saturday'}
      this.days.push(temp);
    }
    if(this.divvaluesunday==true)
    {
      var temp = {day:'sun',timestart:this.timeStartsSun,timeend:this.timeEndsSun,fullday:'sunday'};
      this.days.push(temp);
    }
    if(this.divvalueMonday==true)
    {
      var temp = {day:'mon',timestart:this.timeStartsMon,timeend:this.timeEndsMon,fullday:'monday'};
      this.days.push(temp);
    }
    if(this.divvalueTuesday==true)
    {
      var temp = {day:'tue',timestart:this.timeStartsTue,timeend:this.timeEndsTue,fullday:'tuesday'};
      this.days.push(temp);
    }
    if(this.divvalueWednesday==true)
    {
      var temp = {day:'wed',timestart:this.timeStartsWed,timeend:this.timeEndsWed,fullday:'wednesday'};
      this.days.push(temp);
    }
    if(this.divvalueThursday==true)
    {
      var temp = {day:'thu',timestart:this.timeStartsThu,timeend:this.timeEndsThu,fullday:'thursday'};
      this.days.push(temp);
    }  
    if(this.divvalueFriday==true)
    {
      var temp = {day:'fri',timestart:this.timeStartsFri,timeend:this.timeEndsFri,fullday:'friday'};
      this.days.push(temp);
    }  
      


    console.log(this.days);

    var finaldata = "";
    for(var i=0;i<this.days.length;i++){
      finaldata+= "timestart"+this.days[i].day+"="+this.days[i].timestart+"&timeend"+this.days[i].day+"="+this.days[i].timeend+"&"+this.days[i].day + "="+this.days[i].fullday;
      if(i+1!=this.days.length)
      {
        finaldata+="&";
      }
    }
    console.log(finaldata);
    finaldata = this.server.url + "Doctor/UpdateSchedules" + "?id="+this.auth.user_id+"&"+finaldata;
    console.log(finaldata);

   

    return new Promise(resolve => {
      this.http.get(finaldata).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          console.log('mubarik ho');
          this.presentAlert("Success", "Updated Successfully");

          resolve(true);
        }
        else {
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
            this.viewCtrl.dismiss();
            //this.navCtrl.push("MainPage");

            //this.navCtrl.push("DprofilePage");
          }
        }
      ]
    });
    alert.present();
  }



}
