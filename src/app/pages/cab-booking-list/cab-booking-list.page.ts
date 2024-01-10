import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LeadMessagePage } from 'src/app/modals/lead-message/lead-message.page';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-cab-booking-list',
  templateUrl: './cab-booking-list.page.html',
  styleUrls: ['./cab-booking-list.page.scss'],
})
export class CabBookingListPage implements OnInit {

  userToken;
  cabListData;


  constructor(private router: Router, private capHttp: HttpCapService, private ls: LoaderService,
    private resMsg : ResponseMsgService, private modalCtrl: ModalController, private checkStr: StorageService,
    private alertCtrl: AlertController) { }


  ngOnInit() {
    this.get_userData();
  }
      

  ionViewWillEnter(){
    // this.get_userData();
  }
  

  get_userData(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){             
          this.userToken = data.token;
          this.cabBookingListData();
        }
      }else{        
      }
    }).catch( err => {  });
  }




  cabBookingListData(){
    // console.log(token);
    this.ls.showLoader();
    this.capHttp.postData('/cab-booking-list', '', this.userToken).then((res:any) => {  console.log(res);
      // console.log(res);
      if(res.status === "success"){ 
         this.cabListData = res.data;
      }else{
        //  this.presentToast(res.message);
      }
      this.ls.hideLoader();
    }).catch( err => { this.ls.hideLoader(); });
  }



  goto_cabBookingDetail(cab_book_id){
    this.router.navigate(['cab-booking-details'], {queryParams: {'cab_book_id': cab_book_id}});
  }


}
