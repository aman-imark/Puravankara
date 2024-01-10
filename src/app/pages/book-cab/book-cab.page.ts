import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BookCabInputPage } from 'src/app/modals/book-cab-input/book-cab-input.page';

import { StorageService } from 'src/app/services/storage.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-book-cab',
  templateUrl: './book-cab.page.html',
  styleUrls: ['./book-cab.page.scss'],
})
export class BookCabPage implements OnInit {

  userToken: string;
  allCabListData: any[];

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
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getCabListData();
        }
      }
    }).catch( err => {  });
  }





  getCabListData(){
    this.ls.showLoader();
    this.capHttp.postData('/all-leads', this.sendFilter, this.userToken).then((res:any) => {  // console.log(res);
      console.log(res);
      this.ls.hideLoader();
      if(res.status === "success"){ 
         this.allCabListData = res.data; 
      }
    }).catch( err => { });
  }
  



  async cabBookingModal(name, lead_id){
    const modal = await this.modalCtrl.create({  
      component: BookCabInputPage,
      componentProps: {name: name, lead_id: lead_id},
      animated: true,
      backdropDismiss: true,
      cssClass: 'center-modals',
      mode: 'md'
    }); 
    modal.onDidDismiss().then( (data) => {
      console.log(data);
      if(data.data.cabBooking === true){  
        this.getCabListData();        
      }
    });   
    return await modal.present();  
  }  



}
