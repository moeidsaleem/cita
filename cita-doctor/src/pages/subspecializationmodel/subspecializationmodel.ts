import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ServerProvider } from '../../providers/server/server';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Http } from '@angular/http';
import { Loading } from 'ionic-angular/components/loading/loading';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-subspecializationmodel',
  templateUrl: 'subspecializationmodel.html',
})
export class SubspecializationmodelPage {
  sub_specializations;
  loading: Loading;
  temp;
  url;
  color = [];
  sub_specs;
  data;
  specialization_id;
  sp_id= [];
  ids;
  submit_dataUrl;
  s_id;
  lng;


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
    private server: ServerProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private http: Http,private net : NetworkCheckProvider, private viewCtrl : ViewController,
  private app : MyApp) {

    this.lng = app.getCurrentLanguage();
    this.data = this.navParams.get('data');

    
    this.specialization_id = this.data;
    console.log(this.specialization_id);
 

    this.url = this.server.url + "Doctor/DoctorSpecializations?doctor_id="+this.auth.user_id+"&specialization_id="+this.specialization_id;

  }

  onBackButton() {

    this.navCtrl.pop();
   

  }

  ionViewDidEnter() {
    if(this.net.networkCheck)
    {
    this.loading = this.loadingCtrl.create({
      content: "Loading...!",
    });
    this.loading.present();
    this.LoadData().then(() => {
      this.loading.dismissAll();

    });
  }
  else
  {
    this.pAlert("No Internet Connection");
  }
  }
  pAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Internet',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();

  }

  LoadData()
  {
    console.log(this.url);
    return new Promise(resolve => {
      this.http.get(this.url).map(res => res.json()).subscribe(data => {
        if (data['status']== "success") {
         this.sub_specializations = data['data'];
         this.ChangeColor();
          resolve(true);
        }
        else {
        
          resolve(false);

        }
      })
    });
  }

 
  ChangeColor() {
    this.color = [];
    this.sub_specializations.forEach(element => {
      this.color.push('rgba(52, 152, 219,0.6)');
    });
  }
  UpdateSubSpecialization() {
    if(this.net.networkCheck)
    {
    this.loading = this.loadingCtrl.create({
      content: "Loading...!",
    });
    this.loading.present();
    this.Update().then(() => {
      this.loading.dismissAll();

    });
  }
  else
  {
    this.pAlert("No Internet Connection");
  }

  }

  Update()
  {
  
    var params = this.server.url + "Doctor/UpdateSubSpecialization?doctor_id="+this.auth.user_id
    +"&sub_ids="+this.ids;
    console.log(params);
    return new Promise(resolve =>{
      this.http.get(params).map(res =>res.json()).subscribe(data =>{
          if(data['status'] == "success")
          {
            this.presentAlert("Success", "Updated Successfully");
            resolve(true);
          }
          else
          {
            this.presentAlert("Failed", "Failed to Update");
            resolve(false);
          }
      })
    });

  }


  presentAlert(status, message) {
    let alert = this.alertCtrl.create({
      title: status,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.viewCtrl.dismiss();
           
          }
        }
      ]
    });
    alert.present();
  }


  TimeSlot(t, i) {
    this.ChangeColor();
    this.sub_specs = t;
    this.sp_id = [];
    
    if(this.sub_specs.availed == true)
    {
  
      this.sub_specializations[i].availed = false;
      this.s_id = this.sub_specializations[i].sub_specialization_id;
    }
    else
    {
      
      this.sub_specializations[i].availed = true;
      this.s_id = this.sub_specializations[i].sub_specialization_id;
    }
   
    this.sub_specializations.forEach(element => {
      if(element.availed == true)
      {   
        
        this.sp_id.push(element.sub_specialization_id);
        this.ids = this.sp_id;
        console.log("han",this.ids.toString());
      }
       
    });
    

    this.color[i] = "rgba(41, 128, 185,1.0)";
  }

}
