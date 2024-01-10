import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';

import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';

@Component({
  selector: 'app-cab-booking-details',
  templateUrl: './cab-booking-details.page.html',
  styleUrls: ['./cab-booking-details.page.scss'],
})
export class CabBookingDetailsPage implements OnInit {

  userToken;

  cab_book_id;
  cabDataA;
  cabDataB;
  cabDataC;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private capHttp: HttpCapService,
              private resMsg: ResponseMsgService,
              private checkStr: StorageService, private ls: LoaderService, private alertCtrl: AlertController) { }



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (data) => {
       console.log(data);
       this.cab_book_id = data.cab_book_id;
       this.getUser();
    })
  }



  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.cabBookingDetails(this.cab_book_id ,this.userToken);
        }
      }
    }).catch( err => {  });
  }





  cabBookingDetails(cab_book_id, token){
    console.log(cab_book_id);
    this.ls.showLoader();
    this.capHttp.postData('/booking-details', {"booking-id": cab_book_id}, token).then((res:any) => {   console.log(res);
      this.ls.hideLoader();
      // console.log(res);
      if(res.status === "success"){ 
         this.cabDataA = res.leads_data;
         this.cabDataB = res.booking_data;
         this.cabDataC = res.booking_data.project_name;
        //  console.log(this.cabDataA);
      }else{
        //  this.presentToast(res.message);
      }
    }).catch( err => { });
  }


  async cancelCabBooking(){
      const alert = await this.alertCtrl.create({
        message: 'Are you sure to cancel the cab booking?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              this.ls.showLoader();
              this.capHttp.postData('/cancel-booking', {"id": this.cab_book_id}, this.userToken).then((res:any) => {   console.log(res);
                this.ls.hideLoader();
                // console.log(res);
                if(res.status === "success"){ 
                   this.resMsg.presentToast('Success : '+res.msg , 2000, 'bottom');
                   this.router.navigate(['/cab-booking-list']);
                }else{
                   this.resMsg.presentToast('Error : '+res.msg , 2000, 'bottom');
                }
              })
            },
          },
        ],
      });
  
      await alert.present();
  }



}
