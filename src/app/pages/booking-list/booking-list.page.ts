import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { UploadLeadsPage } from 'src/app/modals/upload-leads/upload-leads.page';
import { LoaderService } from 'src/app/services/loader.service';
import { FilterPage } from 'src/app/modals/filter/filter.page';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.page.html',
  styleUrls: ['./booking-list.page.scss'],
})
export class BookingListPage implements OnInit {


  userToken;
  allLeadData;

  allBookingData;


  constructor(private router: Router, private capHttp: HttpCapService, private modalCtrl: ModalController,
              private resMsg : ResponseMsgService, private checkStr: StorageService, private ls: LoaderService) { }



  ngOnInit() {
    this.getUser();
  }
      

  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getAllBookingData();
        }
      }
    }).catch( err => {  });
  }





  getAllBookingData(){
    this.ls.showLoader();
    this.capHttp.postData('/booking-list', '', this.userToken).then((res:any) => {  // console.log(res);
      console.log(res);
      this.ls.hideLoader();
      if(res.status === "success"){ 
         this.allBookingData = res.data;
         this.allBookingData.forEach(object => {
           object['show'] = false;
         });
        //  console.log(this.allBookingData);        
      }else{
        //  this.presentToast(res.message);
      }
    }).catch( err => { });
  }
  
  




  viewClicked(index) {
    for (let i = 0; i < this.allBookingData.length; i++) {
      this.allBookingData[i].show = false;
    }
    // console.log(this.allBookingData[index]);
    this.allBookingData[index].show = true;
  }

  closeClicked(index){
    for (let i = 0; i < this.allBookingData.length; i++) {
      this.allBookingData[i].show = false;
    }
    // console.log(this.allBookingData[index]);
    this.allBookingData[index].show = false;
  }
  


}
