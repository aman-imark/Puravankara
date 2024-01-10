import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BookCabInputPage } from 'src/app/modals/book-cab-input/book-cab-input.page';
import { BookSiteVisitPage } from 'src/app/modals/book-site-visit/book-site-visit.page';

import { StorageService } from 'src/app/services/storage.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { LoaderService } from 'src/app/services/loader.service';



@Component({
  selector: 'app-site-visit',
  templateUrl: './site-visit.page.html',
  styleUrls: ['./site-visit.page.scss'],
})



export class SiteVisitPage implements OnInit {

  userToken: string;
  allLeadData: any[];

  sendFilter = {
    status: '',
    city: '',
    project: '',
    member: '',
  };


  constructor(public modalCtrl: ModalController, private alertController: AlertController, private router: Router,
              private capHttp: HttpCapService, private checkStr: StorageService, private ls: LoaderService) { }




  ngOnInit() {
    this.getUser();
  }
      

  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getAllLeadData();
        }
      }
    }).catch( err => {  });
  }





  getAllLeadData(){
    this.ls.showLoader();
    this.capHttp.postData('/all-leads', this.sendFilter, this.userToken).then((res:any) => {  // console.log(res);
      console.log(res);
      this.ls.hideLoader();
      if(res.status == "success"){ 
         this.allLeadData = res.data; 
      }
    }).catch( err => { });
  }
  

  
  async siteVisitModal(name, lead_id, createDate){
    const modal = await this.modalCtrl.create({  
      component: BookSiteVisitPage,
      componentProps: {name: name, lead_id: lead_id, createDate: createDate},
      animated: true,
      backdropDismiss: true,
      cssClass: 'center-modals',
      mode: 'md'
    }); 
    modal.onDidDismiss().then( (data) => {
      console.log(data);
      if(data.data.siteVistData === true){  
        this.getAllLeadData();        
      }
    });   
    return await modal.present();  
  }  


  async cabBookingModal(name, lead_id, bookingDate, bookingTime){
    const modal = await this.modalCtrl.create({  
      component: BookCabInputPage,
      componentProps: {name: name, lead_id: lead_id, bookingDate: bookingDate, bookingTime: bookingTime},
      animated: true,
      backdropDismiss: true,
      cssClass: 'center-modals',
      mode: 'md'
    }); 
    modal.onDidDismiss().then( (data) => {
      console.log(data);
      if(data.data.cabBooking === true){  
        this.getAllLeadData();        
      }
    });   
    return await modal.present();  
  }  



}
