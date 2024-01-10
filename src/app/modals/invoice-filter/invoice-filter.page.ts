import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.page.html',
  styleUrls: ['./invoice-filter.page.scss'],
})
export class InvoiceFilterPage implements OnInit {

  setInvoiceValue;
  invFilterData = {
    Status_Id: '',
    Status_Name: '',
  };


  constructor(private router: Router, private capHttp: HttpCapService, private modalCtrl: ModalController,
   private checkStr: StorageService, private ls: LoaderService) { }


   ngOnInit() {
    this.getUser();
  }
      



  getUser(){
    this.ls.showLoader();
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
          //  this.userToken = data.token;
          this.ls.hideLoader();
           this.getFilter();
        }
      }
    }).catch( err => {  });
  }


  getFilter(){
    this.checkStr.getStore('filterList_Invoice').then((data:any) => { 
        console.log(data)
        if(data != null || data != '' || typeof(data) != 'undefined'){
          this.invFilterData.Status_Id = data.Status_Id;
          this.invFilterData.Status_Name = data.Status_Name;        
          console.log(this.invFilterData);
          if(data.Status_Id && data.Status_Name){
             this.setInvoiceValue = data.Status_Id+'/'+data.Status_Name;
          }
        }
    }).catch( err => {         
        this.setInvoiceValue = '';       
    });
  }


  
   invoiceRadio(ev){
    console.log(ev.detail.value)
      if(ev.detail.value){
        let project = ev.detail.value.split('/');
        this.invFilterData.Status_Id = project[0];
        this.invFilterData.Status_Name = project[1];
      }else{
        this.invFilterData.Status_Id = '';
        this.invFilterData.Status_Name = '';
      }
  }




  clearFilter(){
    this.checkStr.removeStore('filterList_Invoice');
    this.modalCtrl.dismiss({apply: false});
    this.getUser();
  }




  applyFilter(){
    console.log(this.invFilterData); 
    this.checkStr.setStore('filterList_Invoice', this.invFilterData);
    this.modalCtrl.dismiss({apply: true});
  }


  dismiss(){
    this.modalCtrl.dismiss();
  }

  
}
