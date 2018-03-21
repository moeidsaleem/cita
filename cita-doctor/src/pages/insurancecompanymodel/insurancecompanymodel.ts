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
  selector: 'page-insurancecompanymodel',
  templateUrl: 'insurancecompanymodel.html',
})
export class InsurancecompanymodelPage {
  InsuranceData;
  loading: Loading;
  color = [];
  data;
  sp_id = [];
  ids;
  url;
  insurances;
  ins_id;
  lng;

  constructor(public navCtrl: NavController, public navParams: NavParams, private server: ServerProvider,
    private auth: AuthProvider, private loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private http: Http,private net : NetworkCheckProvider,private viewCtrl : ViewController,
  private app : MyApp) {
    this.lng = app.getCurrentLanguage();
    this.data = this.navParams.get('data');

    this.url = this.server.url + "Doctor/DoctorInsuranceCompanies?doctor_id=" + this.auth.user_id;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsurancecompanymodelPage');
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

  LoadData() {
    return new Promise(resolve => {
      this.http.get(this.url).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.InsuranceData = data['data'];
          this.ChangeColor();
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
  ChangeColor() {
    this.color = [];
    this.InsuranceData.forEach(element => {
      this.color.push('rgba(52, 152, 219,0.6)');
    });
  }

  TimeSlot(t, i) {
    this.ChangeColor();
    this.insurances = t;
    this.sp_id = [];

    if (this.insurances.availed == true) {

      this.InsuranceData[i].availed = false;
      this.ins_id = this.InsuranceData[i].clinic_id;
    }
    else {

      this.InsuranceData[i].availed = true;
      this.ins_id = this.InsuranceData[i].clinic_id;
    }

    this.InsuranceData.forEach(element => {
      if (element.availed == true) {

        this.sp_id.push(element.company_id);
        this.ids = this.sp_id;
      }

    });


    this.color[i] = "rgba(41, 128, 185,1.0)";
  }

  UpdateInsuranceCompanies()
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
  Back()
  {
    this.navCtrl.pop();
    this.viewCtrl.dismiss();
  }

  Update()
  {
  
    var params = this.server.url + "Doctor/UpdateInsuranceCompanies?clinic_id="+this.ins_id
    +"&company_ids="+this.ids;

    console.log(params);
    return new Promise(resolve =>{
      this.http.get(params).map(res =>res.json()).subscribe(data =>
        {
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

}
