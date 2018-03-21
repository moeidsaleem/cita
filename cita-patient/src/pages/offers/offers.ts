import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  offers=[{
    img:'http://familydoctor.com.au/wp-content/uploads/revslider/home/Family_Doctor_banner1.jpg',
    doctor:'Mubashir Luqman'
  },{
    img:'http://www.nationalheartinstitute.com/images/banner-img4.jpg',
    doctor:'Daniel Jackson'
  }]
  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersPage');
  }

}
