import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { ServerProvider } from '../providers/server/server';
import { AuthProvider } from '../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Facebook } from '@ionic-native/facebook';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://life347.herokuapp.com/', options: {} };
import { LocalNotifications } from '@ionic-native/local-notifications';
import { GooglePlus } from '@ionic-native/google-plus';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { Ionic2RatingModule } from 'ionic2-rating';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Http, HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DataProvider } from '../providers/data/data'; 

export function HttpLoaderFactory(httpClient: HttpClient) {
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
          useFactory: HttpLoaderFactory,
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
    SplashScreen,
    File,
    FileTransfer,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServerProvider,
    AuthProvider,
    Camera,
    ImagePicker,
    NativeGeocoder,
    Facebook,
    NotificationsProvider,
    LocalNotifications,
    GooglePlus,
    Network,
    NetworkProvider,
    DataProvider
  ]
})
export class AppModule {}
