import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {

  constructor(private iap:InAppPurchase, private auth:AuthProvider ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
  }
  ionViewDidLeave(){
 //   this.navCtrl.pop();
  }
plans=[{
  productId:'101D',
  plan_name:'1 Month Premium',
  price: 15,
  validity:30,
  description:'1 Month Package upgrade.'
},{
  productId:'102D',
  plan_name:'6 Month Premium',
  price: 75,
  validity:180,
  description:'Upgrade to premium and enjoy half-year benefits'
},{
  productId:'105D',
  plan_name:'1 Year Premium',
  price:150,
  validity: 360,
  description:'1 Year Premium upgrade with more features.'

}]

plan={
  plan_name:'FREE PLAN',
  price:0,
  validity:this.auth.limit,
  description:'Free Plan enjoy free access.'
}


payPlan(plan){
  this.iap.buy(plan.productId).then(res=>{
    //update Profile with joiningDate and limit 
    this.auth.limit += plan.validity;
  },err=>{
   // this.auts
   console.log(err);
  });
}
}
