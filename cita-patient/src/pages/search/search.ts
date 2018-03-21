import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Loading,
  AlertController,
  ModalController
} from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServerProvider } from '../../providers/server/server';
import { NetworkProvider } from '../../providers/network/network';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';



@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild(Nav) nav: Nav;
  specialities;
  cities;
  areas;
  insurance_company;
  loading: Loading;
  speciality_url;
  city_url;
  area_url;
  insurance_url;
  speciality_id; area_id; city_id; insurance_id; doctorname;
  lng;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private http: Http, private server: ServerProvider,
  private network : Network,public toastCtrl: ToastController,private app : MyApp) {

    this.lng = this.app.getCurrentLanguage();
    this.speciality_url = this.server.url + "App/Specializations";
    this.city_url = this.server.url + "App/AllCities";
    this.area_url = this.server.url + "App/AllAreas";
    this.insurance_url = this.server.url + "App/InsuranceCompanies";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
   
    // let connectSubscription = this.network.onConnect().subscribe(() => {
      this.loading = this.loadingCtrl.create({
        content: "Loading",
      });
      this.loading.present();
      this.Speciality();
      this.Cities();
      this.AllAreas();
      this.Insurance().then(() => {
        this.loading.dismissAll();
      });
      // });
  
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
     this.presentToast();
      });
   
  
  
  }
  SpecialityId(speciality_id) {
  }
  CityId(city_id) {
    console.log("city_id", city_id);
    var params = "http://doctorsapp.itwaly.co.uk/App/Areas?id=" + city_id;
    return new Promise(resolve => {

      this.http.get(params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.areas = null;
          this.areas = data['data'];
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Network Disonnected',
      duration: 3000
    });
    toast.present();
  }

  InsuranceId(insurance_id) {

  }

  AreaId(area_id) {

  }

  AllAreas() {
    return new Promise(resolve => {

      this.http.get(this.area_url).map(res => res.json()).subscribe(data => {

        if (data['status'] == "success") {
          this.areas = data['data'];
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });
  }

  Speciality() {
    return new Promise(resolve => {

      this.http.get(this.speciality_url).map(res => res.json()).subscribe(data => {
        console.log(data);

        if (data['status'] == "succes") {
          this.specialities = data['data'];
          resolve(true);
        }
        else {
          resolve(false);
        }
      },()=>{
        resolve(false);
      });
    });
  }
  Cities() {
    return new Promise(resolve => {

      this.http.get(this.city_url).map(res => res.json()).subscribe(data => {
        console.log(data);

        if (data['status'] == "success") {
          this.cities = data['data'];
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });
  }

  Insurance() {
    return new Promise(resolve => {

      this.http.get(this.insurance_url).map(res => res.json()).subscribe(data => {
        console.log(data);

        if (data['status'] == "succes") {
          this.insurance_company = data['data'];
          resolve(true);
        }
        else {
          resolve(false);

        }


      });
    });
  }
  searcResultPage() {
    this.navCtrl.push('SearchResultPage',
      {
        s_id: this.speciality_id,
        c_id: this.city_id,
        a_id: this.area_id,
        i_id: this.insurance_id,
        d_name: this.doctorname
      }

    )
    this.speciality_id = null;
    this.city_id = null;
    this.area_id = null;
    this.insurance_id = null;
    this.doctorname = null;
  }

}
