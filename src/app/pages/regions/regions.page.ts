import { Component, ViewChild, OnInit } from '@angular/core';

import { HttpCapService } from '../../services/http-cap.service';
import { StorageService } from '../../services/storage.service';
import { ResponseMsgService } from '../../services/response-msg.service';

import { Router } from '@angular/router';



@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {

  userRole;
  userToken;

  regionData: any;
 

  constructor(private capHttp: HttpCapService, 
    private checkStr: StorageService, private resMsg: ResponseMsgService, private router: Router)

  { }

  ngOnInit() {
  }


  ionViewWillEnter(){
    this.get_userData();
  }
  


  get_userData(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){             
          this.userRole = data.role;
          this.userToken = data.token; 
          this.getRegionData();
        }
      }else{        
      }
    }).catch( err => {  });
  }




  getRegionData(){
    this.capHttp.postData('/get-all-regions', '', this.userToken).then((res:any) => {   console.log(res);   
      if(res.status === "success"){
        if(res.data){
          this.regionData = res.data;
        }
      }
    }).catch( err => {
    });
  }







  viewMembersList(){
    this.router.navigate(['/members-list']);
    // this.router.navigate(['/members-list-b']);
  }


  
  viewLeadList(){
    this.router.navigate(['/lead-list']);
  }



}
