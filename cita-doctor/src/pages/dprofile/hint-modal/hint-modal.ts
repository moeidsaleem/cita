import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ViewController, IonicPage, AlertController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { ServerProvider } from '../../../providers/server/server';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { NetworkCheckProvider } from '../../../providers/network-check/network-check';
import { MyApp } from '../../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-hint-modal',
  templateUrl: 'hint-modal.html'
})
export class HintModalPage {
  myParam: string;
  description;
  url;
  lng;
  loading: Loading;
  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  constructor(public viewCtrl: ViewController, params: NavParams, private auth: AuthProvider,
    private server: ServerProvider, private http: Http, private alertCtrl: AlertController,
    private navCtrl: NavController, private loadingCtrl: LoadingController, private net: NetworkCheckProvider,
    private app: MyApp) {
    this.lng = app.getCurrentLanguage();
    this.myParam = params.get('myParam');
    this.description = params.get('data');
    this.url = this.server.url + "Doctor/UpdateStatement";


  }



  UpdateDescription() {
    if (this.net.networkCheck) {
      this.loading = this.loadingCtrl.create({
        content: "Loading...!",
      });
      this.loading.present();
      this.Update().then(() => {
        this.loading.dismissAll();
      });
    }
    else {
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
  Update() {
    var params = "?doctor_id=" + this.auth.user_id + "&statement=" + this.description;
    return new Promise(resolve => {
      this.http.get(this.url + params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.presentAlert("Success", "Updated Successfully");
          resolve(true);
        }
        else {
          this.presentAlert("Failed", "Failed to Update");
          resolve(false);
        }
      })
    });
  }


  onBackButton() {

    this.navCtrl.pop();

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
