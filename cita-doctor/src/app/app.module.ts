import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { ServerProvider } from '../providers/server/server';
import { AuthProvider } from '../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { Facebook } from '@ionic-native/facebook';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GooglePlus } from '@ionic-native/google-plus';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { NotificationProvider } from '../providers/notification/notification';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Http, HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from "@angular/common/http"; 
import { Diagnostic } from '@ionic-native/diagnostic';
import { NetworkCheckProvider } from '../providers/network-check/network-check';



const config: SocketIoConfig = { url: 'http://life347.herokuapp.com/', options: {} };
export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  }) 

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    File,
    FileTransfer,
    FilePath,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServerProvider,
    ImagePicker,
    AuthProvider,
    NativeGeocoder,
    Camera,
    Facebook,
    GooglePlus,
    NotificationProvider,
    LocalNotifications,
    InAppPurchase,
    Diagnostic,
    NetworkCheckProvider
  ]
})
export class AppModule {}
