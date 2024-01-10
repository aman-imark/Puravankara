import { Component, ViewChild, OnInit } from '@angular/core';

import { HttpCapService } from '../../services/http-cap.service';
import { StorageService } from '../../services/storage.service';
import { ResponseMsgService } from '../../services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  
  userRole;
  userToken;

  notificationData: any;
 

  constructor(private capHttp: HttpCapService, private ls: LoaderService,
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
          this.getNotificationsData();
        }
      }else{        
      }
    }).catch( err => {  });
  }




  getNotificationsData(){
    this.ls.showLoader();
    this.capHttp.postData('/notifications', '', this.userToken).then((res:any) => {   console.log(res);  
      this.ls.hideLoader();
      if(res.status === "success"){
        if(res.data){
          this.notificationData = res.data;
        }
      }
    }).catch( err => {
      this.ls.hideLoader();
    });
  }







  viewMembersList(){
    this.router.navigate(['/members-list']);
    // this.router.navigate(['/members-list-b']);
  }


}
