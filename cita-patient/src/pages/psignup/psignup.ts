import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Loading,
  AlertController,
  ModalController
} from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ActionSheetController } from "ionic-angular/components/action-sheet/action-sheet-controller";
import { ImagePicker } from "@ionic-native/image-picker";
import { AuthProvider } from '../../providers/auth/auth';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { ServerProvider } from '../../providers/server/server';


@IonicPage()
@Component({
  selector: 'page-psignup',
  templateUrl: 'psignup.html',
})
export class PsignupPage {
  imageName = null;
  loading: Loading;
  base64Image;
  first_name; last_name;
  email;
  password;
  phone;
  city_id;
  street_address;
  mobile_os;
  status = "active";
  lat; lng; location;
  gender;
  url;
  cities_url;
  cities;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private auth: AuthProvider, private server: ServerProvider,
    public loadingCtrl: LoadingController, private camera: Camera, 
    public actionSheet: ActionSheetController, public imagePicker: ImagePicker,
    public modal: ModalController, private alertCtrl: AlertController, 
    private nativeGeoCoder: NativeGeocoder,
    private http: Http) {
    this.url = this.server.url + "Account/RegisterPatient";
    this.cities_url = this.server.url + "App/AllCities";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PsignupPage');
    this.loading = this.loadingCtrl.create({
      content : "Loading..!",
    });
    this.loading.present();
    this.AllCities().then(()=>{
      this.loading.dismissAll();

    });
  }

  AllCities()
  {
    return new Promise(resolve => {

      this.http.get(this.cities_url).map(res => res.json()).subscribe(data => {
        console.log(data);

        if (data['status'] == "success") {
          console.log("Success!");
          console.log(data['data']);
          this.cities = data['data'];
          resolve(true);

        }
        else {
          console.log("Failed!");
          this.presentAlert("Failed", "No Cities");
          resolve(false);

        }


      });
    });
  }
  CityId(city_id) {
    this.city_id = city_id;
  }

  signup() {
    this.nativeGeoCoder.forwardGeocode(this.street_address)
      .then((coordinates: NativeGeocoderForwardResult) => {
        console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude);
        this.lat = coordinates.latitude;
        this.lng = coordinates.longitude;
        this.location = this.lat + "," + this.lng;
      })
      .catch((error: any) => {
        console.log("geocoder", error);
      });

    var params = "?first_name=" + this.first_name + "&last_name=" + this.last_name + "&email=" + this.email + "&password=" + this.password +
      "&street_address=" + this.street_address + "&location=" + this.location + "&phone=" + this.phone + "&city_id=" + this.city_id +
      "&status=" + this.status + "&mobile_os=" + this.mobile_os + "&gender=" + this.gender;
    console.log("ur;", this.url + params);
    return new Promise(resolve => {

      this.http.get(this.url + params).map(res => res.json()).subscribe(data => {
        console.log(data);

        if (data['status'] == "success") {
          console.log("Success!");
          this.presentAlert("Success", "Registered Successfully");

          resolve(true);
          this.navCtrl.push("PloginPage");
        }
        else {
          console.log("Failed!");
          this.presentAlert("Failed", "Registration Failed");
          resolve(false);

        }


      });
    });


  }

  presentAlert(status, message) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  // presentActionSheetUser() {
  //   let actionSheet = this.actionSheet.create({
  //     title: 'Choose Profile Picture',
  //     buttons: [
  //       {
  //         text: 'Camera',
  //         handler: () => {
  //           console.log('Camera clicked');
  //           this.profilePicture();
  //         }
  //       }, {
  //         text: 'Gallery',
  //         handler: () => {
  //           console.log('Gallery clicked');
  //           this.galleryChoose();
  //         }
  //       }, {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  // galleryChoose() {
  //   let options = {
  //     maximumImagesCount: 1,
  //     quality: 70,
  //     outputType: 1
  //   };
  //   this.imagePicker.getPictures(options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //       console.log('Image URI: ' + results[i]);

  //       this.base64Image = "data:image/jpeg;base64," + results[i];

  //       const file_name = "profile_" + new Date().getTime() + ".jpg";

  //       this.imageName = file_name;
  //     }
  //   }, (err) => { });
  // }

  // profilePicture() {
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     saveToPhotoAlbum: true,
  //     cameraDirection: 1,
  //     correctOrientation: true
  //   };

  //   this.camera.getPicture(options).then(
  //     imageData => {

  //       this.base64Image = "data:image/jpeg;base64," + imageData;

  //       const file_name = "profile_" + new Date().getTime() + ".jpg";

  //       this.imageName = file_name;

  //     },
  //     err => {
  //       // Handle error

  //       console.log("Error", err);
  //     }
  //   );
  // }







}
