import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';

import { StorageService } from 'src/app/services/storage.service';
import { AccessStatusPage } from 'src/app/modals/access-status/access-status.page';
import { ModalController } from '@ionic/angular';
import { Device } from '@capacitor/device';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {


  device_uuid;

  constructor(private router: Router, private capHttp: HttpCapService, private checkStr: StorageService,
          private modalCtrl: ModalController, private resMsg: ResponseMsgService, public ls: LoaderService) { }


  ngOnInit() {
  }


  ionViewWillEnter(){
    Device.getId().then( (res) => {
      // uuid: "dbf01cb72d884e76"  test UUID Android Emulator
      this.device_uuid = res.uuid;
      console.log(this.device_uuid);
    });
  }




  goto_next(){
    // this.ls.showLoader();
    // this.capHttp.postData('/check-status', {device_id : this.device_uuid}).then((res:any) => {  // console.log(res);
    //   console.log(res);
    //   this.ls.hideLoader();
    //   if(res.status === 'success' && res.data){ 
    //     console.log(res.data.profile_status)
    //      if(res.data.profile_status == '3'){
    //         console.log('IF')
    //         // this.router.navigate(['/select-role']);
    //         this.router.navigate(['/login']);
    //      }else{         
    //         console.log('Else')  
    //         this.accessStatusModal();
    //      }
    //   }else{
    //     this.router.navigate(['/select-role']);
    //   }
    // }).catch( err => { 
      
    //     this.ls.hideLoader();
    //     console.log(err)
    //     this.router.navigate(['/select-role']);
    // });
    this.router.navigate(['/select-role']);
  }




  async accessStatusModal(){
    const modal = await this.modalCtrl.create({
      component : AccessStatusPage,
      animated : true,
      backdropDismiss: true,
      mode: 'md'
    });
    modal.onDidDismiss().then( (data) => {
    });
    return await modal.present();
  }



}
