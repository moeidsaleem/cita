import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ModalController, NavController, Platform, NavParams, AlertController, Loading, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ServerProvider } from '../../providers/server/server';
import { ImagePicker } from "@ionic-native/image-picker";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { NetworkCheckProvider } from '../../providers/network-check/network-check';
import { MyApp } from '../../app/app.component';

declare var google: any;



@IonicPage()
@Component({
  selector: 'page-dprofile',
  templateUrl: 'dprofile.html',
})
export class DprofilePage {


  val;
  user_id;
  loading: Loading;
  url;
  sub_specializations = null;
  services = null;
  clinic = null;
  insurance_companies = null;
  doctor_data = null;
  profile_picture;
  imageName = null;
  base64Image;
  pic;
  lat = "33.637261";
  lng = "73.068860";
  doctors_data = {

    doctor_name: '',
    bookings: 0,
    email: '',
    phone: '',
    avg_rating: 0,
    total_rating: 0,
    professioanl_statement: '',
    specialization_id: '',
    specialization_name: ''
  };
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lang;





  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public alertCtrl: AlertController,
    private auth: AuthProvider, private http: Http, private loadingCtrl: LoadingController,
    private server: ServerProvider, public imagePicker: ImagePicker, private camera: Camera,
    public actionSheet: ActionSheetController, private filePath: FilePath, private file: File,
    private transfer: FileTransfer, private nativeGeoCoder: NativeGeocoder, private plt: Platform,
    private network: NetworkCheckProvider, private app: MyApp) {

    this.lang = app.getCurrentLanguage();


    if (!this.auth.isLoggedIn) {
      this.navCtrl.setRoot("DloginPage");
    }
    else {
      console.log(this.user_id);
      this.user_id = this.auth.user_id;
      this.url = "Doctor/DoctorProfile?id=" + this.user_id;

    }


  }
  rate = 5;
  justInfo = "doc";
 
  Appointments() {
    this.navCtrl.push("AppointmentsPage");
  }

  ionViewDidLoad(){
    if (this.network.networkCheck) {
      this.loading = this.loadingCtrl.create({
        content: "Loading.",
      });
      //this.loading.present();
      this.LoadProfile().then(() => {
        console.log("Loading Dismissed");
        this.loading.dismissAll();

      }, () => {
        this.loading.dismissAll();
      });

    }
    else {
      this.pAlert("No Internet Connection");
    }

  }




  ionViewWillEnter() {
    if (this.network.networkCheck) {
      this.loading = this.loadingCtrl.create({
        content: "Loading.",
      });
      //this.loading.present();
      this.LoadProfile().then(() => {
        console.log("Loading Dismissed");
       // this.loading.dismissAll();

      }, () => {
      //  this.loading.dismissAll();
      });

    }
    else {
      this.pAlert("No Internet Connection");
    }
   

  }
  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);


    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
    });
  }


  pAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Internet',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();

  }



  LoadProfile() {
    this.val = this.server.url + this.url;

    console.log("myurl", this.server.url + this.url);
    return new Promise(resolve => {
      this.http.get(this.server.url + this.url).map(res => res.json()).subscribe(data => {
        if (data["status"] == "success") {
          this.doctor_data = data['data'];
          this.profile_picture = this.doctor_data.generic_data.profile_pic_url;
          if (this.doctor_data.generic_data.fb_linked == 1 || this.doctor_data.generic_data.google_linked == 1) {
            this.pic = this.doctor_data.generic_data.profile_pic_url;
            this.CheckPicture(this.pic);
          }
          else {
            this.pic = "http://doctorsapp.itwaly.co.uk/Content/uploads/" + this.profile_picture;
            this.CheckPicture(this.pic);
          }

          this.doctors_data.doctor_name = this.doctor_data.generic_data.doctor_name;
          this.doctors_data.bookings = this.doctor_data.generic_data.bookings;
          this.doctors_data.email = this.doctor_data.generic_data.email;
          this.doctors_data.phone = this.doctor_data.generic_data.phone;
          this.doctors_data.avg_rating = this.doctor_data.generic_data.avg_rating;
          this.doctors_data.total_rating = this.doctor_data.generic_data.total_rating;
          this.doctors_data.specialization_id = this.doctor_data.generic_data.specialization_id;
          this.doctors_data.specialization_name = this.doctor_data.generic_data.specialization_name;
          this.doctors_data.professioanl_statement = this.doctor_data.professional_statement;
          this.sub_specializations = data['data'].sub_specializations;
          this.services = data['data'].services;
          this.clinic = data['data'].clinic;
          if (this.doctor_data.location_lat == "" || this.doctor_data.location_lat == null && this.doctor_data.location_lng == "" || this.doctor_data.location_lng == null) {
            this.lat = "26.034477";
            this.lng = "50.500731";
            this.loadMap(this.lat, this.lng);
          }
          else {
            this.loadMap(this.doctor_data.location_lat, this.doctor_data.location_lng);
          }

          console.log("insuracne", data['data'].insurance_company.insurance_companies);

          this.insurance_companies = data['data'].insurance_company.insurance_companies;
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
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
  openHintModal(modaldata) {
    this.navCtrl.push("HintModalPage",{
      modaldata : modaldata
    })
   
  }

  openClinicModal(modaldata) {
    this.navCtrl.push("ClinicPage",{
      data : modaldata
    })
  }


  openModal(pageName, modaldata) {
    let modal = this.modalCtrl.create(pageName, { data: modaldata });
    modal.onDidDismiss(() => {
      if (this.network.networkCheck) {
        this.ionViewWillEnter();
      }
      else {
        this.pAlert("No Internet Connection");
      }
    })

    modal.present();
  }

  doRefresh(refresher) {
    this.ionViewWillEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  openFeeAddress(modaldata) {
    this.navCtrl.push("FeeAddressmodalPage",{
      data : modaldata
    })
    
  }

  openInsuranceModal(modaldata) {
    this.navCtrl.push("InsurancecompanymodelPage",{
      data : modaldata
    })
    //this.openModal('', modaldata);
  }

  openAssistantPhoneNameModal(modaldata) {
    this.navCtrl.push("AssnamenumbermodelPage",{
      data : modaldata
    })
  }

  openSubSpecializationModel(modaldata) {
    this.navCtrl.push("SubspecializationmodelPage",{
      data : modaldata
    })
   
    
  }

  openServicesModel(modaldata) {
    this.navCtrl.push("ServicesmodelPage",{
      data : modaldata
    })
    //this.openModal('ServicesmodelPage', modaldata);
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
    console.log("Optionsssss", options);

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
    var url = this.server.url + "Doctor/UpdateProfilePicture";
    var image = this.base64Image;
    var options = {
      fileKey: "file",
      fileName: this.imageName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'doctor_id': this.auth.user_id

      }

    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Submitting...',
    });
    this.loading.present();

    console.log("finlurl", url, options);
    fileTransfer.upload(image, url, options).then(data => {
      if (data.response == "success") {
        this.pic = this.base64Image;
        console.log("imagedata", data);

        this.loading.dismissAll();
        this.PresentAlert("Success", "Updated Successfully");
      }
      else {
        this.loading.dismissAll();
        this.PresentAlert("Failed", "Updation Failed");
      }

    }, err => {
      console.log("error", err);

      this.loading.dismissAll();

    });


  }
  PresentAlert(status, message) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }
  Back() {
    this.navCtrl.pop();
  }


}
