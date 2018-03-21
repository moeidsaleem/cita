import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-dlogin',
  templateUrl: 'dlogin.html',
})
export class DloginPage {
  loading: Loading;
  firstname;
  lastname;
  lng;
  em;
  imageurl;
  usercreds = {
    email: '',
    password: ''
  };
  response;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private server: ServerProvider, private http: Http,
    private auth: AuthProvider, private fb: Facebook, private googlePlus: GooglePlus,
  private net : NetworkCheckProvider,private app: MyApp) {
    this.lng = app.getCurrentLanguage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DloginPage');
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

              var creds = "?first_name=" + user.first_name + "&email=" + user.email + "&last_name=" + user.last_name + "&picture=" + user.picture;
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
    return new Promise(resolve => {
      this.http.get(this.server.url + 'Doctor/DoctorFacebookLogin' + creds).map(res => res.json()).subscribe(data => {

        console.log("mtdata", data);
  
  
        if (data['status'] == 'success') {
         
          window.localStorage.setItem("user_id",this.auth.user_id = data['data'][0].doctor_id );
          window.localStorage.setItem("doctor_name", this.auth.doctor_name = data['data'][0].doctor_full_name);
          this.auth.isLoggedIn = true;
          var id = this.auth.user_id;
          this.AddSchedule(id);
          this.navCtrl.setRoot("MainPage");
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

  LoginGmail() {
    this.googlePlus.login({
    })
    .then(res =>   
        this.GoogleData(res)   
      )
    .catch(err => console.log("Error",err));
  
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
      var creds = "Doctor/GoogleDoctorLogin?first_name=" + fname + "&email=" + email + "&last_name=" + lname + "&picture=" + imgurl;
         
      return new Promise (resolve => {
        this.http.get(this.server.url + creds).map(res => res.json()).subscribe(data => {
          if(data['status'] == "success")
          {

            window.localStorage.setItem("user_id",this.auth.user_id = data['data'][0].doctor_id );
            window.localStorage.setItem("doctor_name", this.auth.doctor_name = data['data'][0].doctor_full_name);
            this.auth.isLoggedIn = true;
            var id = this.auth.user_id;
            console.log("saved",id);
            this.AddSchedule(id);
            this.navCtrl.setRoot("MainPage");
            //window.location.reload();
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

  Login() {
    if(this.net.networkCheck)
    {
    this.loading = this.loadingCtrl.create({
      content: "Loading..!",
    });
    this.loading.present();
    this.auth.LoginUser(this.usercreds).then(data => {
      this.loading.dismissAll();
      console.log(data);
      if (data) {
        var id = this.auth.user_id;
        this.AddSchedule(id);

        this.navCtrl.setRoot('MainPage');
      }
      else {
        this.failedAlert();
      }
    })
  }
  else
  {
    this.presentAlert("No Internet Connection");
  }
  }

  AddSchedule(id) {
    var params = this.server.url + "Doctor/AddSchedule?id=" + id;
    return new Promise(resolve => {
      this.http.get(params).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
        
          resolve(true);
        }
        else {
          resolve(false);
        }
      })

    })

  }
  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Internet',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();

  }

  failedAlert() {
    let alert = this.alertCtrl.create({
      title: 'Failed',
      subTitle: 'Incorrect email or password',
      buttons: ['Ok']
    });
    alert.present();
  }

  Signup()
  {
    this.navCtrl.push("SignupPage");
  }

}
