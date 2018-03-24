import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GooglePlus } from '@ionic-native/google-plus';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-plogin',
  templateUrl: 'plogin.html',
})
export class PloginPage {
  loading: Loading;
  firstname;
  lastname;
  em;
  imageurl;
  usercreds = {
    email: '',
    password: ''
  };

  constructor(private menu:MenuController,public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController, private auth: AuthProvider,
    private fb: Facebook,private server : ServerProvider,private http : Http,private googlePlus: GooglePlus,
    private network : Network,public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PloginPage');
    this.menu.swipeEnable(false);
  }

  SignUp() {
    this.navCtrl.push("PsignupPage");
  }
  MainPage()
  {
    this.navCtrl.push("MyTabPage");
  }
  LoginGmail() {
  

    this.googlePlus.login({

    })
    .then(res =>
     
        this.GoogleData(res)   
      )
    .catch(err => console.log("Error",err))

  
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Network Disonnected',
      duration: 3000
    });
    toast.present();
  }

  GoogleData(data)
  {
    this.lastname = data.familyName;
    this.firstname = data.givenName;
    this.em = data.email;
    this.imageurl = data.imageUrl;
   
    this.LoginWithGmail(this.firstname,this.lastname,this.em,this.imageurl);
  }

  LoginWithGmail(fname,lname,email,imgurl)
  {
    return new Promise(resolve => {
      var creds = "Patient/GooglePatientLogin?first_name=" + fname + "&email=" + email + "&last_name=" + lname + "&picture=" + imgurl;
         
      return new Promise (resolve => {
        this.http.get(this.server.url + creds).map(res => res.json()).subscribe(data => {
          if(data['status'] == "success")
          {
           
            window.localStorage.setItem("user_id",this.auth.user_id = data['data'][0].patient_id );
            window.localStorage.setItem("patient_name",this.auth.patient_name = data['data'][0].patient_full_name );
            this.auth.isLoggedin = true;
            //this.auth.user_id = data['data'][0].patient_id;
            this.navCtrl.setRoot("MyTabPage");
            resolve(true);
          }
          else
          {
            resolve(false);
          }
        });
      })
    })  
  }


  LoginFb() {

   
    let env = this;
    let permissions = new Array<string>();
    permissions = ["public_profile,email"];

    return new Promise(resolve => {

      this.fb.login(permissions)
        .then(function (response) {

          let params = new Array<string>();

          env.fb.api("/me?fields=email,gender,first_name,last_name", params)
            .then(function (user) {
              user.picture = "https://graph.facebook.com/" + user.id + "/picture?type=large";

              console.log("FB Data", user);

              var creds = "?first_name=" + user.first_name + "&email=" + user.email +"&last_name="+ user.last_name + "&picture=" + user.picture;
              console.log("fburlll",env.server.url + 'Account/FacebookLogin' + creds);

             
               
                env.FBLogin(creds);
           

            })
        }, function (error) {
          console.log(error);
          resolve(false);
        });

    });



  }

  FBLogin(creds)
  {
    console.log(this.server.url + 'Account/FacebookLogin' + creds);
    return new Promise(resolve => {
      this.http.get(this.server.url + 'Account/FacebookLogin' + creds).map(res => res.json()).subscribe(data => {

        console.log("mtdata", data);
  
  
        if (data['status'] == 'success') {
         
          window.localStorage.setItem("user_id",this.auth.user_id = data['data'][0].patient_id );
          window.localStorage.setItem("patient_name",this.auth.patient_name = data['data'][0].patient_full_name );
          this.auth.isLoggedin = true;
          this.navCtrl.setRoot("MyTabPage");
          console.log("Saved!");
          resolve(true);
        }
        else {
          console.log("Failed!");
          resolve(false);
        }
  
      });
    })
    
  }


  Login() {


    this.loading = this.loadingCtrl.create({
      content: "Loading",
    });
    this.loading.present();
    this.auth.LoginUser(this.usercreds).then(data => {
      this.loading.dismissAll();
      console.log(data);
      if (data) {
        this.navCtrl.setRoot('SearchPage').then(r=>{
          this.menu.swipeEnable(true);
          

        })
      }
      else {
        this.failedAlert();
      }
    })



  }

  failedAlert() {
    let alert = this.alertCtrl.create({
      title: 'Failed',
      subTitle: 'Incorrect email or password',
      buttons: ['Ok']
    });
    alert.present();
  }

}
