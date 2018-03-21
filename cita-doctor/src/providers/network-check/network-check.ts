import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';

@Injectable()
export class NetworkCheckProvider {
  networkCheck = true;

  constructor(public http: Http, private diagnostic: Diagnostic, private plt: Platform) {
    //   this.plt.ready().then(() => {
    //   this.diagnostic.isWifiEnabled()
    //   .then((enabled) =>{
        
    //      this.CheckNetwork(enabled);
        
    //   }), function(error) {
    //     alert("Error"+error);
    //     console.error("The following error occurred: "+error);
    //   }
    // })
  }

  CheckNetwork(enabled)
  {
    if(enabled)
    {
      this.networkCheck = true;
    }
    else
    {
      this.networkCheck = false;
    }
  }
}



