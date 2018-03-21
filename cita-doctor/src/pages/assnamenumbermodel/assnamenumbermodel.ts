import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Http } from '@angular/http';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';
import { MyApp } from '../../app/app.component';



@IonicPage()
@Component({
  selector: 'page-assnamenumbermodel',
  templateUrl: 'assnamenumbermodel.html',
})
export class AssnamenumbermodelPage {

  ClinicData;
  assistant_name;
  assistant_phone;
  loading: Loading;
  url;
  lng;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
    private server: ServerProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
  private http : Http, private net : NetworkCheckProvider,private viewCtrl : ViewController,
private app : MyApp) {
  this.lng = app.getCurrentLanguage();
    this.ClinicData = this.navParams.get('data');
    console.log(this.ClinicData);
    this.assistant_name = this.ClinicData.assistant_name;
    this.assistant_phone = this.ClinicData.assistant_number;
    this.url = this.server.url + "Doctor/UpdateAssistantNamePhone";
  }

 

  onBackButton() {

    this.navCtrl.pop();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssnamenumbermodelPage');
  }

  UpdatePhoneName() {
    if(this.net.networkCheck)
    {
    this.loading = this.loadingCtrl.create({
        content : "Loading..!",
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
  pAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Internet',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();

  }

  Update()
  {
    var params = "?doctor_id="+this.auth.user_id+"&name="+this.assistant_name+"&phone="+this.assistant_phone;
    return new Promise(resolve =>{
      this.http.get(this.url + params).map(res =>res.json()).subscribe(data => {
        if(data['status'] == "success")
        {
            this.presentAlert("Success","Updated Successfully");
        }
        else
        {
          this.presentAlert("Failed","Please Add a clinic first");
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
           // this.navCtrl.push("MainPage");
            //this.navCtrl.push("DprofilePage");
          }
        }
      ]
    });
    alert.present();
  }



}
