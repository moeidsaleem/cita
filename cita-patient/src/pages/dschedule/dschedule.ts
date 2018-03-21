import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController } from 'ionic-angular';


/**
 * Generated class for the DschedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dschedule',
  templateUrl: 'dschedule.html',
})
export class DschedulePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, public alertCtrl: AlertController) {
  }
  Schedule="Summary";

  ionViewDidLoad() {
    console.log('ionViewDidLoad DschedulePage');
  }

  openScheduleModal() {
    this.openModal('AppointmentsTodayPage');
  }


  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
      .present();
  }
}
