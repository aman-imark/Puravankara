import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { EventService } from 'src/app/services/event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { timer, Subscription } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";

import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-otp-auth',
  templateUrl: './otp-auth.page.html',
  styleUrls: ['./otp-auth.page.scss'],
})


export class OtpAuthPage implements OnInit, OnDestroy {

  otpForm: FormGroup;

  countDown: Subscription;
  counter = 600;
  tick = 1000;

  otpExpire: boolean = false;

  pushRegister_token: string;


  constructor(private router: Router, private modalCtrl: ModalController, private fb: FormBuilder, 
              private checkStr: StorageService, private ls: LoaderService, private capHttp: HttpCapService, 
              private resMsg: ResponseMsgService, private events: EventService, public pushNoti: NotificationsService) { }


  ngOnInit() {
    this.otpForm = this.fb.group({
      otp1: ["", [Validators.required]],
      otp2: ["", [Validators.required]],
      otp3: ["", [Validators.required]],
      otp4: ["", [Validators.required]]
    });
    this.getFCM_Event();
  }


  ngOnDestroy(){
    this.countDown=null;
  }


  ionViewWillEnter(){
     this.startCountdown();
  }


  getFCM_Event(){
      this.events.currentEvent2.subscribe((data: any) => {
        console.log(data);
        if(data){   
          this.pushRegister_token = data;
        }
      }); 
  }



  resetTimer(){
    this.countDown.unsubscribe();
    this.startCountdown();
  }


  startCountdown() {
    this.counter = 600;
    this.countDown = timer(0, this.tick).subscribe((res) =>  {
      // console.log(res);
       --this.counter
       if(res > 600){
         this.otpExpire = true;
        //  console.log('Expired!')
       }
    });
  }
  


  otpController(event, next, prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
      return 0;
    }
  }


  
  submitVerifyOTP(){
    if(this.otpForm.status == "VALID"){
       this.ls.showLoader();
       let completeOTP = this.otpForm.value.otp1+this.otpForm.value.otp2+this.otpForm.value.otp3+this.otpForm.value.otp4;
       let otpData ={
           otp: completeOTP,
           fcm_token: this.pushRegister_token,
          //  fcm_token: "e-XNNcdWQiCy1l43Cb1-yy:APA91bGfeO0O-WYZY0S9obp8AhrqabButKISGjLSbyEosV4iYv8XWskTJKWAuOcnZ8up6BRH-sqPRF5mxd5auzcHalElEptIEKGcmMtn8tnrHJ3oEk1pae8Au6vz4G69K0IN6nN34kWY"
       };
       console.log(otpData);
       this.capHttp.postData('/otp' , otpData, '',).then( (res: any) => { console.log(res)
         this.ls.hideLoader();
         if(res.status == 'success'){
            if(res.data.token){
              let userData = {
                token: res.data.token,
                role: res.data.role,
                email: res.data.email,
                name: res.data.name,
                role_name: res.data.role_name
              }
              this.events.publish(userData);
              this.checkStr.setStore('userData', userData);
              this.dismiss();
              this.resMsg.presentToast('Success : '+res.msg , 2000, 'bottom');
            }
         }else if(res.status == 'invalid'){
            this.resMsg.presentToast('Invalid : '+res.msg , 2000, 'bottom');
         }else if(res.status == 'expired'){
            this.resMsg.presentToast('Expired : '+res.msg , 2000, 'bottom');
         }
       }).catch( (err) => { });
    }
    if(this.otpForm.status == "INVALID"){
       this.resMsg.presentToast('Please enter the OTP corectlly!', 2000, 'bottom');
    }
  }



  resendCode(){
     this.ls.showLoader();
     this.capHttp.postData('/resend-otp' , '', '',).then( (res: any) => { // console.log(res);
       this.ls.hideLoader();
       if(res.status === 'success'){
          this.resetTimer();
          this.resMsg.presentToast(res.msg, 2000, 'bottom');
       }
     }).catch( (err) => { });
  }



  dismiss(){
    this.countDown=null;
    this.modalCtrl.dismiss();
  }


}
