import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.page.html',
  styleUrls: ['./members-list.page.scss'],
})
export class MembersListPage implements OnInit {

  userRole;
  userToken;
  memberData;

  numOfData: number = 14;
  // numOfData: number = 40;

  constructor(private router: Router,
     private checkStr: StorageService,
     private resMsg : ResponseMsgService,
     private capHttp: HttpCapService,
     private ls: LoaderService
    ) { }



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
          this.getMemberList_Data();
        }
      }else{        
      }
    }).catch( err => {  });
  }



  getMemberList_Data(){
    this.ls.showLoader();
    this.capHttp.getData('/member-listing', this.userToken).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === "success"){ 
        this.memberData = res.data;
      }
      this.ls.hideLoader();
    }).catch( err => { });
    this.ls.hideLoader();
  }




  doInfinite(event: any) {
    setTimeout(() => {
      this.numOfData += 4;
      event.target.complete(); 
    }, 2000); 
  }



  viewMemberDetails(pUserID){
     this.router.navigate(['/member-details'], {queryParams: {pUserID: pUserID}});
  }


  ngOnInit() {
  }


}
