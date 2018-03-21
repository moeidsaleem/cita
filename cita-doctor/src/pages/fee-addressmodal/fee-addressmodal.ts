import { Component , ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';
import { MyApp } from '../../app/app.component';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-fee-addressmodal',
  templateUrl: 'fee-addressmodal.html',
})
export class FeeAddressmodalPage {
  @ViewChild('map') mapElement: ElementRef;
  FeeAddress;
  loading : Loading;
  examination_fee;
  address;
  url;

  map: any;
  lat = "26.034477";
  lng = "50.500731";
  lang;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http : Http,
  private auth : AuthProvider, private server : ServerProvider, private alertCtrl : AlertController,
private loadingCtrl : LoadingController, private net : NetworkCheckProvider,private viewCtrl : ViewController,
private app : MyApp) {
  this.lang = app.getCurrentLanguage();
    this.FeeAddress = this.navParams.get("data");
    console.log(this.FeeAddress);
    this.examination_fee = this.FeeAddress.examination_fee;
    this.address = this.FeeAddress.address;
    this.lat = this.FeeAddress.location_lat;
    this.lng = this.FeeAddress.location_lng;
    console.log(this.lat,this.lng);
    
  
    this.url = this.server.url + "Doctor/UpdateFeeAddress";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeeAddressmodalPage');
  }

  ionViewDidEnter()
  {
    if(this.lat == "" || this.lat == null && this.lng == "" || this.lng == null)
    {
     
      this.lat = "26.034477";
      this.lng = "50.500731";
    }
    this.loadMap(this.lat,this.lng);
  }

  loadMap(lat,lng)
  {
    let latLng = new google.maps.LatLng(lat,lng);


    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      
      
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true
    });
    

    google.maps.event.addListener(marker, 'drag', function (event) {
      console.log('new position is ' + event.latLng.lat() + ' / ' + event.latLng.lng());
    });

    google.maps.event.addListener(marker, 'dragend', (event) => {
      console.log('final position is ' + event.latLng.lat() + ' / ' + event.latLng.lng());
      this.lat = event.latLng.lat();
      this.lng = event.latLng.lng(); 


    });

  }

  Back()
  {
    this.navCtrl.pop();
  }

  onBackButton() {

    this.navCtrl.pop();
    

  }

  UpdateFeeAddress()
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
    var params = "?doctor_id=" + this.auth.user_id + "&fee=" + this.examination_fee + "&address="+this.address
    +"&lat="+this.lat+"&lng="+this.lng;
    return new Promise(resolve => {
      this.http.get(this.url + params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.presentAlert("Success", "Updated Successfully");
          resolve(true);
        }
        else {
          this.presentAlert("Failed", "Please Add a doctor clinic first");
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
