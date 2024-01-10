import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Device } from '@capacitor/device';


@Component({
  selector: 'app-access-status',
  templateUrl: './access-status.page.html',
  styleUrls: ['./access-status.page.scss'],
})
export class AccessStatusPage implements OnInit {

  device_uuid: any;
  signupStatusData: any;


  constructor(private modalCtrl: ModalController, private capHttp: HttpCapService, 
              private router: Router, private resMsg : ResponseMsgService, public ls: LoaderService) { }



  ionViewWillEnter(){
    this.ls.showLoader();
    Device.getId().then( (res) => {
      // uuid: "dbf01cb72d884e76"  test UUID Android Emulator
      this.device_uuid = res.uuid;
      console.log(this.device_uuid);
      this.getSignup_StatusData();
      this.ls.hideLoader();
    });
  }



  
  getSignup_StatusData(){
    this.capHttp.postData('/check-status', {device_id : this.device_uuid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status == 'success' && res.data){ 
         this.signupStatusData = res.data;
      }else{
      }
    }).catch( err => { });
  }



  dismiss(){
    this.modalCtrl.dismiss();
  }


  goto_signup(){
    this.router.navigate(['/select-role']);
    this.modalCtrl.dismiss();
  }


  ngOnInit(): void {
    
  }

}
