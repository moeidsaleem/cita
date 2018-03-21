import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the DoctorPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html'
})
export class DoctorPage {

  dprofileRoot = 'DprofilePage'
  dscheduleRoot = 'DschedulePage'
  dsettingsRoot = 'DsettingsPage'
  dpatientRoot = 'DpatientsPage'


  constructor(public navCtrl: NavController) {}

}
