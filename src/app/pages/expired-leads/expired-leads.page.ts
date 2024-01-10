import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-expired-leads',
  templateUrl: './expired-leads.page.html',
  styleUrls: ['./expired-leads.page.scss'],
})
export class ExpiredLeadsPage implements OnInit {

  userToken;
  expiredLeadData;


  constructor(private router: Router, private capHttp: HttpCapService, private ls: LoaderService,
              private resMsg : ResponseMsgService, private checkStr: StorageService) { }



  ngOnInit() {
    this.getUser();
  }
      

  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getExpairedLeadData(this.userToken);
        }
      }
    }).catch( err => {  });
  }





  getExpairedLeadData(token){
    this.ls.showLoader();
    this.capHttp.postData('/expired-leads', '', token).then((res:any) => {  // console.log(res);
      console.log(res);
      this.ls.hideLoader();
      if(res.status === "success"){ 
         this.expiredLeadData = res.data;
         this.expiredLeadData.forEach(object => {
           object['show'] = false;
         });  
      }else{
        //  this.presentToast(res.message);
      }
    }).catch( err => { });
  }
  
  
    
  viewClicked(index) {
    for (let i = 0; i < this.expiredLeadData.length; i++) {
      this.expiredLeadData[i].show = false;
    }
    // console.log(this.expiredLeadData[index]);
    this.expiredLeadData[index].show = true;
  }

  closeClicked(index){
    for (let i = 0; i < this.expiredLeadData.length; i++) {
      this.expiredLeadData[i].show = false;
    }
    // console.log(this.expiredLeadData[index]);
    this.expiredLeadData[index].show = false;
  }
  




}
