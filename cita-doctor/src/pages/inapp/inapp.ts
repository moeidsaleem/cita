import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';

const Monthly_Key = "com.itwaly.citadoctorapp.1month";
const Yearly = "com.itwaly.citadoctorapp.1year";
const SixMonths_Key = "com.itwaly.citadoctorapp.6months";

@IonicPage()
@Component({
  selector: 'page-inapp',
  templateUrl: 'inapp.html',
})
export class InappPage {
  products = [];
  sub;
  error;
  url;

  constructor(public navCtrl: NavController, public navParams: NavParams, private plt: Platform,
    private iap: InAppPurchase, private alertCtrl: AlertController,private auth: AuthProvider,
  private server : ServerProvider,private http : Http) {
    console.log("Constructor Called");

    this.iap
      .getProducts([Monthly_Key, SixMonths_Key, Yearly])
      .then((products) => {
        this.products = products;
        console.log("products", products);


      })
      .catch((err) => {
       
        this.presentAlert("Status", "Item Already Owned");


      });
  }

  presentAlert(status,message) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InappPage');

  }

  buy(product) {
    this.iap.buy(product).then(data => {
      this.enableItems(product);
      return this.iap.consume(data.productType, data.receipt, data.signature);
    }).then(function () {
      this.UploadOrder();


    })

  }

  UploadOrder()
  {
    var params = this.server.url + "Doctor/Subscriptions?id=" + this.auth.user_id + "sub="+this.sub;
    return new Promise(resolve => {
      this.http.get(params).map(res => res.json()).subscribe(data => {
        if(data['status'] == "success")
        {
          this.presentAlert("Success","Subscription purchased");
          resolve(true);
        }
        else
        {
          resolve(false);
        }
      })
    })
  }



  enableItems(id) {
    if (id === Monthly_Key) {
      this.sub = "1Month";
    }
    else if (id === SixMonths_Key) {
      this.sub = "6Months";
    }
    else if (id === Yearly) {
      this.sub = "1Year";
    }

  }

}
