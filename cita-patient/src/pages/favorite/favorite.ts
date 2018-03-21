import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServerProvider } from '../../providers/server/server';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';



@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  user_id;
  fav_url;
  favourites = null;
  loading : Loading;
  no_data = false;
  pic;lng;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
    private http: Http, private server: ServerProvider,private loadingCtrl: LoadingController,
    private network : Network,public toastCtrl: ToastController,private app : MyApp) {
      this.lng = this.app.getCurrentLanguage();
    if (!this.auth.isLoggedin) {
      this.navCtrl.setRoot("PloginPage");
    }
   
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast();
       });
    
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Network Disonnected',
      duration: 3000
    });
    toast.present();
  }


  rate = 5;


  ionViewWillEnter()
  {
    console.log("Enterd");
    if(this.auth.isLoggedin)
    {
    this.loading = this.loadingCtrl.create({
      content: "Loading..!",
    });
    this.loading.present();
    this.DownloadFavourites().then(() => {
      this.loading.dismissAll();
    }); 
  }
  }

  DownloadFavourites() {
    this.fav_url = this.server.url +"Patient/MyFavoriteDoctors?id="+this.auth.user_id;
    console.log("favurl",this.fav_url);
    return new Promise(resolve => {

      this.http.get(this.fav_url).map(res => res.json()).subscribe(data => {

        if (data['status'] == "success") {
          this.favourites = data['data'];
          if(this.favourites.fb_linked == 1 || this.favourites.google_linked == 1)
          {
            this.pic = this.favourites.profile_pic_url;
            this.CheckPicture(this.pic);
          }
          else {
            this.pic = "http://doctorsapp.itwaly.co.uk/Content/uploads/" + this.favourites.profile_picture;
            this.CheckPicture(this.pic);
          }
          if(this.favourites.length == 0)
          {
            this.no_data = true;
          }
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });
  }

  CheckPicture(profile_picture) {
    return new Promise(resolve => {
      this.http.get(profile_picture).subscribe(data => {
        if (data) {
          console.log("picture hai");
          this.pic = profile_picture;
          resolve(true);
        }
        else {
          console.log("picture ni hai");
          this.pic = "assets/imgs/noimage.png";
          resolve(false);

        }
      }, (() => {
        console.log("picture ni hai");
          this.pic = "assets/imgs/noimage.png";
          resolve(false);
      }))
    });
  }


  docsProfilePage(event,profile) {
    this.navCtrl.push('DocProfilePage', {
      profile : profile
    });
  }

}
