import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hint-modal',
  templateUrl: 'hint-modal.html'
})
export class HintModalPage {
  myParam: string;
  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  constructor(
    public viewCtrl: ViewController,
    params: NavParams
  ) {
    this.myParam = params.get('myParam');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
