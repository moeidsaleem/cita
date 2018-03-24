import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  @ViewChild(Nav) nav: Nav;
  loading: Loading;
  s_id; c_id; a_id; i_id; d_name;
  s_url; c_url; a_url; i_url; dname_url;
  url;
  doctors_list = null;
  profile_picture;
  pic;
  no_data = false;
  lng;
  constructor(public navCtrl: NavController, public navParams: NavParams, private server: ServerProvider,
    private http: Http, private loadingCtrl: LoadingController, private auth: AuthProvider,
    private alertCtrl: AlertController, private network: Network, public toastCtrl: ToastController,
  private app : MyApp) {
    this.lng = this.app.getCurrentLanguage();
    this.s_id = navParams.get('s_id');
    this.c_id = navParams.get('c_id');
    this.a_id = navParams.get('a_id');
    this.i_id = navParams.get('i_id');
    this.d_name = navParams.get('d_name');
    this.url = this.server.url + "Patient/DoctorsList?";
    if (this.s_id != undefined) {
      this.s_url = this.url + "specialization=" + this.s_id;
    }
    else {
      this.s_url = this.url + "specialization";
    }
    if (this.c_id != undefined) {
      this.c_url = this.s_url + "&city=" + this.c_id;
    }
    else {
      this.c_url = this.s_url + "&city";
    }
    if (this.a_id != undefined) {
      this.a_url = this.c_url + "&area=" + this.a_id;
    }
    else {
      this.a_url = this.c_url + "&area";
    }

    if (this.i_id != undefined) {
      this.i_url = this.a_url + "&insurance_company=" + this.i_id;
    }
    else {
      this.i_url = this.a_url + "&insurance_company";
    }
    if (this.d_name != undefined) {
      this.dname_url = this.i_url + "&doctor_name=" + this.d_name + "&id=" + this.auth.user_id;
    }
    else {
      this.dname_url = this.i_url + "&doctor_name&id=" + this.auth.user_id;
    }

  }
  rate = 4;
  ionViewWillEnter() {
      if(this.doctors_list==null){

      
    this.loading = this.loadingCtrl.create({
        content: "Loading",
      });
    
      this.loading.present();
      this.LoadDoctors().then(() => {

        this.loading.dismissAll();

      });
    }

    // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   this.presentToast();
    // });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Network Disonnected',
      duration: 3000
    });
    toast.present();
  }

  UnFavourite(doctorid) {
    // let connectSubscription = this.network.onConnect().subscribe(() => {
      if (!this.auth.isLoggedin) {
        this.navCtrl.setRoot("PloginPage");
      }
      else {
        var url = this.server.url + "Patient/UnLikeDoctor?patient_id=" + this.auth.user_id + "&doctor_id=" + doctorid;
        return new Promise(resolve => {

          this.http.get(url).map(res => res.json()).subscribe(data => {
            if (data['status'] == "success") {
              this.presentAlert("Success", "Doctor UnMarked");
              resolve(true);
            }
            else {
              this.presentAlert("Error", "Please Try Again");
              resolve(false);
            }
          });
        });

      }
    // });

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast();
    });

  }
  Favourite(doctorid) {

  
      if (!this.auth.isLoggedin) {
        this.navCtrl.setRoot("PloginPage");
      }
      else {
        var url = this.server.url + "Patient/LikeDoctor?patient_id=" + this.auth.user_id + "&doctor_id=" + doctorid;
        console.log("myurl", url);
        return new Promise(resolve => {

          this.http.get(url).map(res => res.json()).subscribe(data => {
            if (data['status'] == "success") {
              this.presentAlert("Success", "Doctor Bookmarked");
              resolve(true);
            }
            else {
              this.presentAlert("Error", "Please Try Again");
              resolve(false);
            }
          });
        });
      }
 

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast();
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
            this.ionViewWillEnter();
          }
        }
      ]
    });
    alert.present();
  }



  LoadDoctors() {

    console.log(this.dname_url);
    return new Promise(resolve => {

      this.http.get(this.dname_url).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.doctors_list = data['data'];
          if (this.doctors_list.fb_linked == 1 || this.doctors_list.google_linked == 1) {
            this.pic = this.doctors_list.profile_pic_url;
            this.CheckPicture(this.pic);
          }
          else {
            this.pic = "http://doctorsapp.itwaly.co.uk/Content/uploads/" + this.doctors_list.profile_picture;
            this.CheckPicture(this.pic);
          }
          if (this.doctors_list.length == 0) {
            this.no_data = true;
            console.log(this.doctors_list.length);
          }
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });
  }

  CheckPicture(profile_picture) {
    return new Promise(resolve => {
      this.http.get(profile_picture).subscribe(data => {
        if (data) {
          console.log("picture hai");
          this.pic = profile_picture;
          resolve(true);
        }
        else {
          console.log("picture ni hai");
          this.pic = "assets/imgs/noimage.png";
          resolve(false);

        }
      }, (() => {
        console.log("picture ni hai");
        this.pic = "assets/imgs/noimage.png";
        resolve(false);
      }))
    });
  }

  docsProfilePage(event, profile) {
    this.navCtrl.push('DocProfilePage', {
      profile: profile
    });
  }

}
