import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{

 

  userToken;

  paymentsData;



  constructor(private router: Router, private activatedRoute : ActivatedRoute, 
              private capHttp: HttpCapService, private checkStr: StorageService, private ls: LoaderService) { }



  ionViewWillEnter(){
    // this.getUser();
  }



  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getPayments(this.userToken);
        }
      }
    }).catch( err => {  });
  }




  getPayments(token){
    this.ls.showLoader();
    this.capHttp.postData('/payments', '', token).then((res:any) => {   console.log(res);   
      this.ls.hideLoader();
      if(res.status === "success"){ 
        this.paymentsData = res.data;
      }
    }).catch( err => {
      this.ls.hideLoader();
    })
  }




  ngOnInit() {
    this.getUser();
  }


}
