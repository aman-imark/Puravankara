import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { UploadLeadsPage } from 'src/app/modals/upload-leads/upload-leads.page';
import { LoaderService } from 'src/app/services/loader.service';
import { FilterPage } from 'src/app/modals/filter/filter.page';

import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.page.html',
  styleUrls: ['./lead-list.page.scss'],
})
export class LeadListPage implements OnInit {

  userToken;
  allLeadData;

  sendFilter = {
    status: '',
    city: '',
    project: '',
    member: '',
  };


  filterSet : boolean = false;
  filterTagData;

  constructor(private router: Router, private capHttp: HttpCapService, private modalCtrl: ModalController,
              private resMsg : ResponseMsgService, private checkStr: StorageService, private ls: LoaderService) { }



  ngOnInit() {
    this.getUser();
  }
      
  ionViewWillEnter(){
    this.checkStr.removeStore('filterList');
  }


  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getAllLeadData(this.userToken);
        }
      }
    }).catch( err => {  });
  }



  getAllLeadData(token){
    this.ls.showLoader();
    console.log(this.sendFilter);
    
    this.capHttp.postData('/all-leads', this.sendFilter, token).then((res:any) => {  // console.log(res);
      console.log(res);
      this.ls.hideLoader();
      if(res.status === "success"){ 
         this.allLeadData = res.data;
         this.allLeadData.forEach(object => {
           object['show'] = false;
         });     
      }
    }).catch( err => { });
  }
  
  
  
  viewClicked(index) {
    for (let i = 0; i < this.allLeadData.length; i++) {
      this.allLeadData[i].show = false;
    }
    // console.log(this.allLeadData[index]);
    this.allLeadData[index].show = true;
  }

  closeClicked(index){
    for (let i = 0; i < this.allLeadData.length; i++) {
      this.allLeadData[i].show = false;
    }
    // console.log(this.allLeadData[index]);
    this.allLeadData[index].show = false;
  }
  




  async uploadLeadModal() {
    // const docUrl = 'https://cp.purvaconnect.com';
    // const docUrl = 'https://cp.purvaconnect.com/upload-lead-csv?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGVmNDUwYjIxODMwODNjZjNlYmFhZmM4MjM1MTc0ZTY0MjJjODY5ZDdjMGIxYmUwZThiMGMzOWJlM2ZlN2JiYzEwMzBkNjExODZkMWQxNjAiLCJpYXQiOjE2OTgwNDEwMzguODExODgyLCJuYmYiOjE2OTgwNDEwMzguODExODg2LCJleHAiOjE3Mjk2NjM0MzguODAwODcxLCJzdWIiOiI0MTMiLCJzY29wZXMiOltdfQ.nkawACHSv0POvQMSBmRL7Kx_U4OsD2ej8Wv-vg8-DzCZkPawXW9hGk3HqtQL0d10TR2cWsOEGkAQfUaeyAikuUdsur-p9YQr7MzLp3zGXbcMuNDnsl25D6SUtI9KrO1ovoGB0YBpZzRitRUG0_7M2ryIcBn-mqUODDtVqRNksgnTNXR8jrhrmOp1jHZQo0PxOb3eVjKS3ygbwqF5X6M8tMQ7ilok716j_9iFwIi9VlaqecMlg7raptZi-YkcDSYEKTYz5t0x2yjAX3t81fH4tkE669HwLtRTgBYXZFbrFsHdxYp5_rfZz-3qqT3yBfABtVdy698HY9zzAHqqOgMuLZBGjOw610RUhKXfalW21mz9K39kyaODYlN5T8z_oCQOAnGUBwtAsXQNTWkpKrHfkYZYvP46BK6_yVgH-FBo7HMkbuCqw_766vJa7S11_QKRJJuyscJ0maSfI0y3jALMdzfyVenX8Co_643bccCfeORuUZp26VxuH7kFjFOizWj4laR1icfOEV5OYsQr1RBENaFnIE9JKhrHtFrAei9R6dFXXgRaglcIvcPseIKMC-7yLKg4acCa9sqm5gT1ovkmv23UfkZ3rX7bYbhdap3AP5tCtvnaaprZKVVZIT14WG1SnjE-JQ5BIYFVtDvRVUHafFxxmusloHqB4zZvGzFQJTw';
    
    const docUrl = `https://cp.purvaconnect.com/upload-lead-csv?token=${this.userToken}`;


    // const OpenOptions = {
    //   url: docUrl,
    //   presentationStyle: 'fullscreen',
    // };

    await Browser.open({
      url: docUrl,
      presentationStyle: 'popover',      
    });

    // const modal = await this.modalCtrl.create({  
    //   component: UploadLeadsPage,
    //   animated: true,
    //   backdropDismiss: true,
    //   cssClass: 'center-modals',
    //   mode: 'md'
    // });  
    // return await modal.present();  
  }  




  async filterModal() {
    const modal = await this.modalCtrl.create({  
      component: FilterPage,
      animated: true,
      backdropDismiss: false,
      mode: 'md'
    });  
    modal.onDidDismiss().then((data) => {
      console.log(data);
      console.log(data.data.apply);

      if(data){
        if(data.data.apply === true){
          this.filterSet = data.data.apply;

          this.sendFilter.status = data.data.Lead_Ids;
          this.sendFilter.city = data.data.City_Ids;
          this.sendFilter.project = data.data.Project_Ids;
          this.sendFilter.member = data.data.member_id;
          this.sendFilter.member = data.data.member_id;        

          console.log(this.sendFilter);
          this.getAllLeadData(this.userToken);

          // filterData
          // this.getFilter();
        }
        if(data.data.apply === false){
          this.filterSet = data.data.apply;
          this.checkStr.removeStore('filterList');
          this.sendFilter.status = '';
          this.sendFilter.city = '';
          this.sendFilter.project = '';
          this.sendFilter.member = '';
          this.getAllLeadData(this.userToken);
        }
      }
    })
    return await modal.present();  
  }
   



  getFilter(){
    this.checkStr.getStore('filterList').then((data:any) => { 
        console.log(data);
        if(data != null || data != '' || typeof(data) != 'undefined'){
          this.filterTagData = data;

          this.sendFilter.status = this.filterTagData.Lead_Id;
          this.sendFilter.city = this.filterTagData.City_Id;
          this.sendFilter.project = this.filterTagData.Project_Id;
          this.sendFilter.member = this.filterTagData.member_id;          

          this.getAllLeadData(this.userToken);

          // document.getElementById('City_Name').hidden = false;
          // document.getElementById('Lead_Name').hidden = false;
          // document.getElementById('Project_Name').hidden = false;
          // document.getElementById('member_name').hidden = false;
        }
    }).catch( err => { });
  }


  removeFilterElement(type_id){
    document.getElementById(type_id).hidden = true;
    if(type_id == 'City_Name'){
       this.filterTagData.City_Id = '';
       this.filterTagData.City_Name = '';
       this.checkStr.setStore('filterList', this.filterTagData);

       this.sendFilter.status = this.filterTagData.Lead_Id;
       this.sendFilter.city = this.filterTagData.City_Id;
       this.sendFilter.project = this.filterTagData.Project_Id;
       this.sendFilter.member = this.filterTagData.member_id;   

       this.getAllLeadData(this.userToken);
    }
    if(type_id == 'Lead_Name'){
       this.filterTagData.Lead_Id = '';
       this.filterTagData.Lead_Name = '';
       this.checkStr.setStore('filterList', this.filterTagData);

       this.sendFilter.status = this.filterTagData.Lead_Id;
       this.sendFilter.city = this.filterTagData.City_Id;
       this.sendFilter.project = this.filterTagData.Project_Id;
       this.sendFilter.member = this.filterTagData.member_id;          
       
       this.getAllLeadData(this.userToken);
    }
    if(type_id == 'Project_Name'){
       this.filterTagData.Project_Id = '';
       this.filterTagData.Project_Name = '';
       this.checkStr.setStore('filterList', this.filterTagData);

       this.sendFilter.status = this.filterTagData.Lead_Id;
       this.sendFilter.city = this.filterTagData.City_Id;
       this.sendFilter.project = this.filterTagData.Project_Id;
       this.sendFilter.member = this.filterTagData.member_id;          
      
       this.getAllLeadData(this.userToken);
    }
    if(type_id == 'member_name'){
       this.filterTagData.member_id = '';
       this.filterTagData.member_name = '';
       this.checkStr.setStore('filterList', this.filterTagData);

       this.sendFilter.status = this.filterTagData.Lead_Id;
       this.sendFilter.city = this.filterTagData.City_Id;
       this.sendFilter.project = this.filterTagData.Project_Id;
       this.sendFilter.member = this.filterTagData.member_id;          
       
       this.getAllLeadData(this.userToken);
    }
  }
   

}
