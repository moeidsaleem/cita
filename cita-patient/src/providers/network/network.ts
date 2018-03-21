import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';


@Injectable()
export class NetworkProvider {

  isNetwork = false;

  constructor(public http: Http, private network : Network) {
    console.log('Hello NetworkProvider Provider');

    this.CheckNetwork();
  }

  CheckNetwork()
  {
    
  }

}
