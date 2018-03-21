import { Component,ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  

  contact = {
    email : '',
    phone : '',
    message : ''
  };

  @ViewChild('myInput') myInput: ElementRef;
  
  resize() {
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Message was successfully sent',
      duration: 3000
    });
    toast.present();
  }


}
