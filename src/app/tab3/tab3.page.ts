import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  userToken;

  allBookingData;
  invoiceData;

  segmentTab3: string;



  constructor(private router: Router, private capHttp: HttpCapService, private modalCtrl: ModalController,
    private resMsg : ResponseMsgService, private checkStr: StorageService, private ls: LoaderService)


  {
    this.segmentTab3 = "1";
  }

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
           this.getInvoice_Data();
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
  
  
  getInvoice_Data(){
    this.capHttp.postData('/invoice', '', this.userToken).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === "success"){ 
        this.invoiceData = res.data;
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





  goto_InvoiceDetails(invoice_id){
    this.router.navigate(['/invoice-details'], {queryParams: {InvoiceId: invoice_id}});
  }

  
}
