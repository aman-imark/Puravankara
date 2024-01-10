import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { EventService } from 'src/app/services/event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { OtpAuthPage } from '../otp-auth/otp-auth.page';


@Component({
  selector: 'app-phone-select',
  templateUrl: './phone-select.page.html',
  styleUrls: ['./phone-select.page.scss'],
})
export class PhoneSelectPage implements OnInit {


  role: string;    // [{1= primary phone number,  2=alternative phone number}]



  constructor(private router: Router, private modalCtrl: ModalController, private fb: FormBuilder, 
              private checkStr: StorageService, private ls: LoaderService,
              private resMsg: ResponseMsgService) { }


  ngOnInit() {   
  }



  signupRoleValue(ev){
     this.role = ev.detail.value;
  }


  goto_next(){
    if(this.role){
      this.openOTPmodal();
      this.modalCtrl.dismiss();
      // this.router.navigate(['/declarations'],  {queryParams: {'role': this.role}});
      // this.router.navigate(['/signup'],  {queryParams: {'role': this.role}});
    }else{
      this.resMsg.presentToast('Required : Please select any one option!', 2000, 'bottom');
    }
  }


  
  async openOTPmodal(){
    const modal = await this.modalCtrl.create({
      component: OtpAuthPage,
      animated: true,
      backdropDismiss: true,
      mode: 'md',
    });
    return await modal.present()
  }


  dismiss(){
    this.modalCtrl.dismiss();
  }


}
