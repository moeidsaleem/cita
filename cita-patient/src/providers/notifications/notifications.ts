import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LocalNotifications } from '@ionic-native/local-notifications';


@Injectable()
export class NotificationsProvider {

  constructor(private auth: AuthProvider, private localNotifications: LocalNotifications, private socket: Socket) {
    console.log('Hello NotificationsProvider Provider');

    this.socket.connect();

    this.getNotifications().subscribe(message => {

      console.log("Notification", message);


      if(this.auth.user_id == message['message'].user_id)
      {
       this.localNotifications.schedule({
         id: 1,
         title: message['message'].title,
         text: message['message'].msg
       });
      }
    });
  }

  getNotifications() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

}
