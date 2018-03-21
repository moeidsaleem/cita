import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  rate = 0;
  Comments;
  url;
  doctor_id;

  rating_url;
  loading: Loading;
  rated = false;
  lng;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthProvider, private server: ServerProvider,
    private http: Http, private alertCtrl: AlertController, private loadingCtrl: LoadingController,
  private app : MyApp) {
    this.lng = this.app.getCurrentLanguage();
    this.doctor_id = this.navParams.get("doctor_id");

    this.rating_url = this.server.url + "Patient/CheckRating?doctor_id=" + this.doctor_id + "&patient_id=" + this.auth.user_id;


    console.log(this.doctor_id);
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content: "Loading..",
    });
    this.loading.present();
    this.LoadData().then(() => {
      this.loading.dismissAll();
    });
  }
  LoadData()
  {
    console.log(this.url);
    return new Promise(resolve =>{
      this.http.get(this.rating_url).map(res =>res.json()).subscribe(data => {
        if(data['status'] == "success")
        {
          if(data['data'] == "Not Rated")
          {
            this.rated = true;
          }
          console.log(this.rated);
         
          resolve(true);
        }
        else
        {
          this.rated = false;
          console.log(this.rated);
          resolve(false);
        }
      })
    })
  }
  rateNow(event) {
    this.rate = event;
  }

  onBackButton() {

    this.navCtrl.pop();

  }


  AddRating() {
    this.url = this.server.url + "Patient/DoctorRating?patient_id=" + this.auth.user_id + "&doctor_id=" + this.doctor_id + "&rating=" + this.rate + "&comment=" + this.Comments;
    console.log("url", this.url);
    this.http.get(this.url).map(res => res.json()).subscribe(data => {
      console.log("list;", data);
      if (data['status'] == "success") {
        this.presentAlert("Success", "Doctor Rated.");
      }
      else {
        this.presentAlert("Failed", "Try Again Later.");
      }


    });
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.navCtrl.pop();
          }
        }

      ]
    });
    alert.present();
  }

}
