import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ActionSheetController, Modal, ModalController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  first_name; last_name;
  email;
  password;
  phone;
  city_id;
  street_address;
  mobile_os;
  status = "active";
  lat; lng; location;
  gender;
  url;
  spec_url;
  specialization;
  loading: Loading;
  specialization_id;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthProvider, private server: ServerProvider,
    public loadingCtrl: LoadingController,
    public actionSheet: ActionSheetController,
    public modal: ModalController, private alertCtrl: AlertController, private http: Http,
    private net: NetworkCheckProvider) {

    this.url = this.server.url + "Account/DoctorRegister";
    this.spec_url = this.server.url + "Doctor/Specializations";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    if (this.net.networkCheck) {
      this.loading = this.loadingCtrl.create({
        content: "Loading..!",
      });
      this.loading.present();
      this.AllSpecializations().then(() => {
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

  SpID(specialization_id) {
    this.specialization_id = specialization_id;
  }

  AllSpecializations() {
    return new Promise(resolve => {

      this.http.get(this.spec_url).map(res => res.json()).subscribe(data => {
        console.log(data);

        if (data['status'] == "success") {
          console.log("Success!");
          console.log(data['data']);
          this.specialization = data['data'];
          resolve(true);

        }
        else {
          console.log("Failed!");
          this.presentAlert("Failed", "No Specializations");
          resolve(false);

        }


      });
    });
  }

  presentAlert(status, message) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  Login() {
    this.navCtrl.push("DloginPage");
  }

  Signup() {
    if (this.net.networkCheck) {
      var params = "?first_name=" + this.first_name + "&last_name=" + this.last_name + "&email=" + this.email + "&password=" + this.password +
        "&phone=" + this.phone + "&specialization=" + this.specialization_id +
        "&status=" + "active" + "&mobile_os=" + this.mobile_os;
      console.log("ur;", this.url + params);
      return new Promise(resolve => {

        this.http.get(this.url + params).map(res => res.json()).subscribe(data => {
          console.log(data);

          if (data['status'] == "success") {
            console.log("Success!");
            this.presentAlert("Success", "Registered Successfully");
            this.navCtrl.push("DloginPage");

            resolve(true);

          }
          else {
            console.log("Failed!");
            this.presentAlert("Failed", "Registration Failed");
            resolve(false);

          }


        });
      });
    }
    else {
      this.pAlert("No Internet Connection");
    }
  }

}
