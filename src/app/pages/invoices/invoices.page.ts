import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { LoaderService } from 'src/app/services/loader.service';

import { InvoiceFilterPage } from 'src/app/modals/invoice-filter/invoice-filter.page';

import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  userToken;
  invoiceData;

  sendFilter = {
    status: '',
  };

  filterSet : boolean = false;
  filterTagData;


  constructor(private router: Router,
     private checkStr: StorageService,
     private resMsg : ResponseMsgService,
     private capHttp: HttpCapService,
     private ls: LoaderService,
     private modalCtrl: ModalController
    ) { }


  ngOnInit() {
    this.getUser();
  }
      
  ionViewWillEnter(){
    this.checkStr.removeStore('filterList_Invoice');
  }


  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getInvoice_Data(this.userToken);
        }
      }
    }).catch( err => {  });
  }




  getInvoice_Data(token){
    this.ls.showLoader();
    console.log(this.sendFilter);
    this.capHttp.postData('/invoice', this.sendFilter, token).then((res:any) => {  // console.log(res);
      console.log(res);
      this.ls.hideLoader();
      if(res.status === "success"){ 
        this.invoiceData = res.data;
      }
    }).catch( err => { });
  }




  async invoiceFilterModal(){
    const modal = await this.modalCtrl.create({
      component: InvoiceFilterPage,
      animated: true,
      backdropDismiss: false,
      mode: 'md'
    });

    modal.onDidDismiss().then((data) => {
      // console.log(data);
      if(data){
        if(data.data.apply === true){
          this.filterSet = data.data.apply;
          this.getFilter();
        }
        if(data.data.apply === false){
          this.filterSet = data.data.apply;
          this.checkStr.removeStore('filterList_Invoice');
          this.sendFilter.status = '';
          this.getInvoice_Data(this.userToken);
        }
      }
    })
    return await modal.present();  

  }
 


  getFilter(){
    this.checkStr.getStore('filterList_Invoice').then((data:any) => { 
        // console.log(data);
        if(data != null || data != '' || typeof(data) != 'undefined'){
          this.filterTagData = data;
          this.sendFilter.status = this.filterTagData.Status_Id;
          this.getInvoice_Data(this.userToken);
        }
    }).catch( err => { });
  }




  removeFilterElement(type_id){
    document.getElementById(type_id).hidden = true;
    if(type_id){
       this.filterTagData.Status_Id = '';
       this.filterTagData.Status_Name = '';
       this.checkStr.setStore('filterList_Invoice', this.filterTagData);

       this.sendFilter.status = this.filterTagData.Status_Id;
       this.getInvoice_Data(this.userToken);
    }
  }
   



  goto_InvoiceDetails(invoice_id){
    this.router.navigate(['/invoice-details'], {queryParams: {InvoiceId: invoice_id}});
  }


}
