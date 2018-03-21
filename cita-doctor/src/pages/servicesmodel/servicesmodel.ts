import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, ViewController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { AuthProvider } from '../../providers/auth/auth';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-servicesmodel',
  templateUrl: 'servicesmodel.html',
})
export class ServicesmodelPage {
  Services;
  loading: Loading;
  color = [];
  data;
  sp_id = [];
  ids;
  url;
  services;
  s_id;
  lng;

  constructor(public navCtrl: NavController, public navParams: NavParams, private server: ServerProvider,
    private auth: AuthProvider, private loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private http: Http,private net : NetworkCheckProvider,private viewCtrl : ViewController,
  private app : MyApp) {
    this.lng = app.getCurrentLanguage();
    this.data = this.navParams.get('data');


    this.url = this.server.url + "Doctor/DoctorServices?doctor_id=" + this.auth.user_id;
    console.log(this.url);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesmodelPage');
  }

  ionViewDidEnter() {
    if(this.net.networkCheck)
    {
    this.loading = this.loadingCtrl.create({
      content: "Loading...!",
    });
    this.loading.present();
    this.LoadData().then(() => {
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

  onBackButton() {

    this.navCtrl.pop();

  }

  LoadData() {
    console.log(this.url);
    return new Promise(resolve => {
      this.http.get(this.url).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.Services = data['data'];
          this.ChangeColor();
          resolve(true);
        }
        else {

          resolve(false);

        }
      })
    });
  }

  UpdateServices()
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

  Update()
  {
    
  
    var params = this.server.url + "Doctor/UpdateDoctorServices?doctor_id="+this.auth.user_id
    +"&sub_ids="+this.ids;
    console.log(params);
    return new Promise(resolve =>{
      this.http.get(params).map(res =>res.json()).subscribe(data =>{
          if(data['status'] == "success")
          {
            this.presentAlert("Success", "Updated Successfully");
            resolve(true);
          }
          else
          {
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
          }
        }
      ]
    });
    alert.present();
  }


  ChangeColor() {
    this.color = [];
    this.Services.forEach(element => {
      this.color.push('rgba(52, 152, 219,0.6)');
    });
  }

  TimeSlot(t, i) {
    this.ChangeColor();
    this.services = t;
    this.sp_id = [];

    if (this.services.status == true) {

      this.Services[i].status = false;
      this.s_id = this.Services[i].service_id;
    }
    else {

      this.Services[i].status = true;
      this.s_id = this.Services[i].service_id;
    }

    this.Services.forEach(element => {
      if (element.status == true) {

        this.sp_id.push(element.service_id);
        this.ids = this.sp_id;
      }

    });


    this.color[i] = "rgba(41, 128, 185,1.0)";
  }

}
