import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ResponseMsgService {

  private myToast: any;


  constructor(public toastCtrl: ToastController) { }



  async presentToast(message, duration, position) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            toast.onDidDismiss();
          }
        }
      ]
    });

    await toast.present();
  }



}
