import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { EventService } from 'src/app/services/event.service';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

import { SpaceValidator } from 'src/app/customValidator';
import { Device } from '@capacitor/device';
import { OtpAuthPage } from 'src/app/modals/otp-auth/otp-auth.page';
import { PhoneSelectPage } from 'src/app/modals/phone-select/phone-select.page';

import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  device_uuid;

  loginForm: FormGroup;
  submitted: boolean = false;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';



  constructor(private router: Router, private capHttp: HttpCapService, private formBuilder: FormBuilder, private events: EventService,
              private resMsg : ResponseMsgService, private checkStr: StorageService, public ls: LoaderService, private modalCtrl: ModalController) { }




  ngOnInit(): void {
    Device.getId().then( (res) => {
      // uuid: "dbf01cb72d884e76"
      this.device_uuid = res.uuid;
    });


    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      password: ["", [Validators.required,  Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), SpaceValidator.cannotContainSpace
        // Validators.pattern("(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}")
      ]]      
    });
  }


  ionViewWillEnter(){
    this.get_userData();
  }
  


  get_userData(){
    this.checkStr.getStore('userData').then((data:any) => {   
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){             
          this.router.navigate(['main/tabs/tab1']);
        }
      }else{        
      }
    }).catch( err => {  });
  }



  
  get f() {
    return this.loginForm.controls;
  }

  

  user_login(){
      this.submitted = true;
      if(this.loginForm.status == "INVALID"){
        this.resMsg.presentToast('Please fill all the details Correctly!' , 2000, 'bottom');
      }else if(this.loginForm.status == "VALID"){
        this.ls.showLoader();
        this.capHttp.postFormData('/login', this.loginForm.value).then((res:any) => {   console.log(res); 
          this.ls.hideLoader();  
          if(res.status === "success"){ 
            // this.openOTPmodal();
            this.openPHONEmodal();

            // {
            //   "status": "success",
            //   "msg": "otp send successfully."
            // }
          }else{
            this.resMsg.presentToast(res.status+': '+res.msg , 2000, 'bottom');
          }
        }).catch( err => {
        });
      }else{
      }
  }


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }



  async openOTPmodal(){
    const modal = await this.modalCtrl.create({
      component: OtpAuthPage,
      animated: true,
      backdropDismiss: true,
      mode: 'md',
    });

    modal.onDidDismiss().then( (data) => {
      if(data){
        this.get_userData();
      }
    });   

    return await modal.present()
  }


  async openPHONEmodal(){
    const modal = await this.modalCtrl.create({
      component: PhoneSelectPage,
      animated: true,
      backdropDismiss: true,
      mode: 'md',
    });

    modal.onDidDismiss().then( (data) => {
      if(data){
        this.get_userData();
      }
    });   

    return await modal.present()
  }




}
