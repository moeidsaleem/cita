import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServerProvider } from '../../providers/server/server';
import { AuthProvider } from '../../providers/auth/auth';
import { Loading } from 'ionic-angular/components/loading/loading';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { ImagePicker } from "@ionic-native/image-picker";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-profile-setting',
  templateUrl: 'profile-setting.html',
})
export class ProfileSettingPage {
  imageName = null;
  base64Image;
  loading: Loading;
  cities_url;
  cities;
  first_name; last_name;
  email;
  phone;
  city_id;
  street_address;
  lat; lng; location;
  mobile_os;
  gender;
  pic;
  lang;

  PatientDownloadInfoUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,
    private server: ServerProvider, private auth: AuthProvider, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private nativeGeoCoder: NativeGeocoder,
    public imagePicker: ImagePicker, private camera: Camera, public actionSheet: ActionSheetController,
    private filePath: FilePath, private file: File, private transfer: FileTransfer,
  private app : MyApp) {
    this.lang = this.app.getCurrentLanguage();

    if(!auth.isLoggedin)
    {
      this.navCtrl.setRoot("PloginPage");
    }
   
    this.PatientDownloadInfoUrl = this.server.url + "Patient/PatientProfile?id=" + this.auth.user_id;
    console.log(this.PatientDownloadInfoUrl);
    this.cities_url = this.server.url + "App/AllCities";
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileSettingPage');
    // this.loading = this.loadingCtrl.create({
    //   content: "Loading..!",
    // });
    // this.loading.present();
    this.AllCities().then(() => {

    });
    this.DownloadPatientData().then(() => {
      // this.loading.dismissAll();

    });

  }
  AllCities() {
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
  presentAlert(status, message) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  DownloadPatientData() {
    return new Promise(resolve => {

      this.http.get(this.PatientDownloadInfoUrl).map(res => res.json()).subscribe(data => {
        if (data['status'] == "success") {
          this.first_name = data['data'].first_name;
          this.last_name = data['data'].last_name;
          this.phone = data['data'].phone;
          this.street_address = data['data'].street_addres;
          if(data['data'].fb_linked  == 1 || data['data'].google_linked == 1 )
          {
            this.pic = data['data'].profile_pic_url;
            this.CheckPicture(this.pic);
          }
        
            else {
              this.pic = "http://doctorsapp.itwaly.co.uk/Content/uploads/" + data['data'].profile_pic_url;
              this.CheckPicture(this.pic);
            }
          
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });
  }
  CityId(city_id) {
    this.city_id = city_id;
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


  UpdateProfile() {
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

    var params = "&first_name=" + this.first_name + "&last_name=" + this.last_name +
      "&street_address=" + this.street_address + "&location=" + this.location + "&phone=" + this.phone + "&city_id=" + this.city_id +
      "&mobile_os=" + "" + "&gender=" + this.gender;
    var url = this.server.url + "Patient/UpdateProfileInfo?patient_id=" + this.auth.user_id;
    console.log("upurl", url + params);
    return new Promise(resolve => {

      this.http.get(url + params).map(res => res.json()).subscribe(data => {
        console.log(data);

        if (data['status'] == "success") {
          console.log("Success!");
          this.presentAlert("Success", "Updated Successfully");

          resolve(true);
          this.navCtrl.push("MyTabPage");
        }
        else {
          console.log("Failed!");
          this.presentAlert("Failed", "Updation Failed Failed");
          resolve(false);

        }


      });
    });
  }

  presentActionSheetUser() {
    let actionSheet = this.actionSheet.create({
      title: 'Choose Profile Picture',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            console.log('Camera clicked');
            this.profilePicture();
          }
        }, {
          text: 'Gallery',
          handler: () => {
            console.log('Gallery clicked');
            this.galleryChoose();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  galleryChoose() {
    let options = {
      maximumImagesCount: 1,
      quality: 70,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);

        this.base64Image = "data:image/jpeg;base64," + results[i];

        const file_name = "profile_" + new Date().getTime() + ".jpg";

        this.imageName = file_name;

        this.SendImage(this.base64Image);

      }
    }, (err) => { });
  }

  profilePicture() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      cameraDirection: 1,
      correctOrientation: true
    };
    console.log("Optionsssss",options);

    this.camera.getPicture(options).then(
      imageData => {

        this.base64Image = "data:image/jpeg;base64," + imageData;

        const file_name = "profile_" + new Date().getTime() + ".jpg";

        this.imageName = file_name;
        this.SendImage(this.base64Image);

      },
      err => {
        // Handle error

        console.log("Error", err);
      }
    );
  }
  SendImage(image) {
    var url = this.server.url + "Patient/UpdateProfilePicture";
    var image = this.base64Image;
    var options = {
      fileKey: "file",
      fileName: this.imageName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'patient_id': this.auth.user_id

      }
    };
    
    const fileTransfer: FileTransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Submitting...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    console.log("finlurl",url,options);
    fileTransfer.upload(image, url, options).then(data => {

      console.log("imagedata", data);

      this.loading.dismissAll();

      //this.navCtrl.setRoot('TabsPage');
    }, err => {
      console.log("error", err);

      this.loading.dismissAll();

    });


  }

}
