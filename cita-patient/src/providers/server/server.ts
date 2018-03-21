import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ServerProvider {
  public url;

  constructor(public http: Http) {
    console.log('Hello ServerProvider Provider');
    //this.url = "http://localhost:58824/Service/";
    this.url = "http://doctorsapp.itwaly.co.uk/Service/";
  }

}
