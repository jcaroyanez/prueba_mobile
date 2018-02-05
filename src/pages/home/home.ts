import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
   data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public _storeProvider:StoreProvider, public push:Push, private alertCtrl:AlertController) {
    this.pushsetup();
    }

  ionViewDidLoad() {
    /// obtener los datos del usuario del storage
    this._storeProvider.getDato().then((rest:any) => {
      this.data  = rest;
    })
  }

  logout(){
   /// remover los datos del usuario del storage
   this._storeProvider.remove();
   this.navCtrl.setRoot('LoginPage');
  }

  /// agregando opciones
  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '358720980507'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };

  /// setiando opciones       
  const pushObject: PushObject = this.push.init(options);
   
  // sucribiendo al evento para recivir notificaciones
  pushObject.on('notification').subscribe((notification: any) => {
    /// en primer plano
    if (notification.additionalData.foreground) {
      let prompt = this.alertCtrl.create({
        title: notification.title,
        subTitle: notification.message,
      });
      prompt.present();
    }else{
      let prompt = this.alertCtrl.create({
        title: notification.title,
        subTitle: notification.message,
      });
      prompt.present();
    }
  });
  
  /// el id enviando por firebae 
  pushObject.on('registration').subscribe((registration: any) => {
    console.log(registration.registrationId);
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }


}
