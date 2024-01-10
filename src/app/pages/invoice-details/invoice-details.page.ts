import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.page.html',
  styleUrls: ['./invoice-details.page.scss'],
})
export class InvoiceDetailsPage implements OnInit {


  userToken;
  invoiceID;

  invoiceDetail;

  constructor(private router: Router, private activatedroute: ActivatedRoute,
     private checkStr: StorageService,
     private resMsg : ResponseMsgService,
     private capHttp: HttpCapService,
     private ls: LoaderService,
    ) { }




  ngOnInit() {
    this.get_userData();
    this.activatedroute.queryParams.subscribe( (params) => {
      this.invoiceID = params.InvoiceId;
    }) 
  }

  

  get_userData(){
    this.checkStr.getStore('userData').then((data:any) => {   
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){             
          this.userToken = data.token;
          this.getInvoiceDetails_Data(data.token);      
        }
      }else{        
      }
    }).catch( err => {  });
  }




  getInvoiceDetails_Data(token){
    this.ls.showLoader();
    this.capHttp.postData('/invoice-details', {"invoice_id" : this.invoiceID}, token).then((res:any) => {  // console.log(res);
      console.log(res);
      this.ls.hideLoader();
      if(res.status === "success"){ 
          this.invoiceDetail = res.data;
      }
    }).catch( err => {
       this.ls.hideLoader();
    });

  }




}
