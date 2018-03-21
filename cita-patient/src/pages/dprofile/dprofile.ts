import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the DprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dprofile',
  templateUrl: 'dprofile.html',
})
export class DprofilePage {

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController) {
  }
  rate = 5;
  justInfo = "doc";
  ionViewDidLoad() {
    console.log('ionViewDidLoad DprofilePage');
  }

  openHintModal() {
    this.openModal('HintModalPage');
  }

  openClinicModal() {
    this.openModal('ClinicPage');
  }


  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
      .present();
  }

}
