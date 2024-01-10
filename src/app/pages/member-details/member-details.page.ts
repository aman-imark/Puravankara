import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { LoaderService } from 'src/app/services/loader.service';

import { ModalController } from '@ionic/angular';
import { SelectLeadActivePage } from 'src/app/modals/select-lead-active/select-lead-active.page';
import { BookCabInputPage } from 'src/app/modals/book-cab-input/book-cab-input.page';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {

  userToken;
  userRole;
  memberDetails;
  leadCount;
  leadData : any[];
  pUserID;

  public show: boolean = false;

  reasonForm: FormGroup;


  // 0: {id: 1, type_name: 'Warm Lead'}
  // 1: {id: 2, type_name: 'Commercial Discussion'}
  // 2: {id: 3, type_name: 'Site Visit Scheduled'}
  // 3: {id: 4, type_name: 'Expired Lead'}
  // 4: {id: 5, type_name: 'Site Visit Conducted'}



  // leadData : any[] = [
  //   {
  //       "firstname": "Saurabh",
  //       "updated_at": null,
  //       "lastname": "Chauhan",
  //       "id": 63,
  //       "type": 1,
  //       "lead_type": "Warm Lead",
  //       "email": "skc@test.com",
  //       "mobile": 9765678190,
  //       "status": 1,
  //       "company_name": "The Property Investors Alliance",
  //       "leadby": "Saurabh Chauan",
  //       "image": "https://cp.purvaconnect.com/leads/avatar.svg",
  //       "lead_status": 1,
  //       "show": false,
  //       "want_active": true,
  //       "client_interest": false,
  //       "reason_input": false,
  //       "confirm_closed": false,
  //       "issite_visit": false,
  //       "isbook_cab": false
  //   },
  //   {
  //       "firstname": "Meenakshi",
  //       "updated_at": null,
  //       "lastname": "Nanta",
  //       "id": 64,
  //       "type": 1,
  //       "lead_type": "Expired Lead",
  //       "email": "meena.kshi@test.com",
  //       "mobile": 9897987267,
  //       "status": 1,
  //       "company_name": "The Property Investors Alliance",
  //       "leadby": "Saurabh Chauan",
  //       "image": "https://cp.purvaconnect.com/leads/avatar.svg",
  //       "lead_status": 4,
  //       "show": false,
  //       "want_active": true,
  //       "client_interest": false,
  //       "reason_input": false,
  //       "confirm_closed": false,
  //       "issite_visit": false,
  //       "isbook_cab": false
  //   },
  //   {
  //       "firstname": "Tom",
  //       "updated_at": null,
  //       "lastname": "Clancy",
  //       "id": 65,
  //       "type": 1,
  //       "lead_type": "Commercial Discussion",
  //       "email": "tom.clancy@test.com",
  //       "mobile": 9087897716,
  //       "status": 1,
  //       "company_name": "The Property Investors Alliance",
  //       "leadby": "Saurabh Chauan",
  //       "image": "https://cp.purvaconnect.com/leads/avatar.svg",
  //       "lead_status": 2,
  //       "show": false,
  //       "want_active": true,
  //       "client_interest": false,
  //       "reason_input": false,
  //       "confirm_closed": false,
  //       "issite_visit": false,
  //       "isbook_cab": false
  //   },
  //   {
  //       "firstname": "Jack",
  //       "updated_at": null,
  //       "lastname": "Ryan",
  //       "id": 66,
  //       "type": 1,
  //       "lead_type": "Site Visit Conducted",
  //       "email": "jack.ryan@test.com",
  //       "mobile": 8780089273,
  //       "status": 1,
  //       "company_name": "The Property Investors Alliance",
  //       "leadby": "Saurabh Chauan",
  //       "image": "https://cp.purvaconnect.com/leads/avatar.svg",
  //       "lead_status": 3,
  //       "show": false,
  //       "want_active": true,
  //       "client_interest": false,
  //       "reason_input": false,
  //       "confirm_closed": false,
  //       "issite_visit": false,
  //       "isbook_cab": false
  //   }
  // ];

  
    constructor(private router: Router,
       private checkStr: StorageService,
       private resMsg : ResponseMsgService,
       private capHttp: HttpCapService,
       private ls: LoaderService,
       private modalCtrl: ModalController,
       private activatedRoute: ActivatedRoute,
       private fb: FormBuilder
      ) { }
  
  

  ngOnInit() {
    this.reasonForm = this.fb.group({
      reason: ['', [Validators.required]]
    });
  }
    

  ionViewWillEnter(){
    this.activatedRoute.queryParams.subscribe( (params) => {
         console.log(params);
         this.pUserID = params.pUserID;
    });

    this.get_userData();
    // console.log(this.leadData);
  }
    
  
  
  get_userData(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){   
          this.userToken = data.token;      
          this.userRole = data.role;   
          if(data.role == '3'){
             this.getMember_DetailsData();          
          }
          if(data.role == '2'){      
          }
          if(data.role == '1'){
             this.getMember_DetailsData();
          }
        }
      }else{        
      }
    }).catch( err => {  });
  }
  
  
  
  getMember_DetailsData(){
    this.ls.showLoader();
    this.capHttp.postData('/member-details', {id: this.pUserID}, this.userToken).then((res:any) => {  console.log(res);
      this.ls.hideLoader();
      // console.log(res);
      if(res.status === "success"){ 
        this.memberDetails = res.data;
        this.leadCount = res.count;
        this.leadData = res.leads;
        this.leadData.forEach(object => {
          object['show'] = false;
          object['cab_booking_status_custom'] = false;
          object['site_visit_custom'] = false;
          object['client_interested_custom'] = false;
          object['lead_closed_custom'] = false;          
          object['lead_closed_Yes_custom'] = false; 
          
          object['lead_active_custom'] = false;          
          // object['custom'] = false;
        });
        console.log(this.leadData);
      }
    }).catch( err => { });
  }
  
 


  viewClicked(index) {
    for (let i = 0; i < this.leadData.length; i++) {
      this.leadData[i].show = false;
    }
    // console.log(this.leadData[index]);
    this.leadData[index].show = true;
    console.log(this.leadData);
  }

  closeClicked(index){
    for (let i = 0; i < this.leadData.length; i++) {
      this.leadData[i].show = false;
    }
    // console.log(this.leadData[index]);
    this.leadData[index].show = false;
    console.log(this.leadData);
  }
  



  async cabBookingModal(index, action, name, lead_id){
    console.log(index, action, name, lead_id);
    if(action == 'yes'){
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
           this.getMember_DetailsData();
        }
      });   
      return await modal.present();  
    }

    if(action == 'no'){
        for (let i = 0; i < this.leadData.length; i++) {
          this.leadData[i].cab_booking_status_custom = false;
        }
        this.leadData[index].cab_booking_status_custom = true;
        console.log(this.leadData);
    }
  }  


  isSiteVisit(index, action, lead_id){
    console.log(index, action, lead_id)

    if(action == 'yes'){
      this.ls.showLoader();
      this.capHttp.postData('/site-visit-conducted', {lead_id: lead_id}, this.userToken).then((res:any) => {  // console.log(res);
        console.log(res);
        this.ls.hideLoader();
        if(res.status === "success"){ 
           this.getMember_DetailsData();
        }
      }).catch( err => { });
    }
    if(action == 'no'){
        for (let i = 0; i < this.leadData.length; i++) {
          this.leadData[i].site_visit_custom = false;
        }
        this.leadData[index].site_visit_custom = true;
    }
  }


  clientInterested(index, action){
    console.log(index, action)

    if(action == 'yes'){
      for (let i = 0; i < this.leadData.length; i++) {
        this.leadData[i].lead_active_custom = false;
        this.leadData[i].client_interested_custom = false;
        this.leadData[i].lead_closed_custom = false;
      }
      this.leadData[index].lead_active_custom = true;
      this.leadData[index].client_interested_custom = true;
      this.leadData[index].lead_closed_custom = true;
    }
    if(action == 'no'){
        for (let i = 0; i < this.leadData.length; i++) {
          this.leadData[i].client_interested_custom = false;
        }
        this.leadData[index].client_interested_custom = true;
    }
  }



  confirmLeadClosed(index, action){
    console.log(index, action)
    if(action == 'yes'){
      for (let i = 0; i < this.leadData.length; i++) {
        this.leadData[i].lead_closed_custom = false;
        this.leadData[i].lead_closed_Yes_custom = false;
      }
      this.leadData[index].lead_closed_custom = true;
      this.leadData[index].lead_closed_Yes_custom = true;
    }
    if(action == 'no'){
      for (let i = 0; i < this.leadData.length; i++) {
        this.leadData[i].lead_closed_custom = false;
      }
      this.leadData[index].lead_closed_custom = true;
    }
  }




  leadCloseSubmit(lead_id){
    console.log(lead_id)
    if(this.reasonForm.status == 'VALID'){
      let closeLeadData = {
       lead_id: lead_id, 
       reason: this.reasonForm.value.reason,
      };
      this.capHttp.postData('/close-lead', closeLeadData, this.userToken).then( (res: any) => {
         console.log(res);
         if(res.status == 'success'){
            this.getMember_DetailsData();
         }
      }).catch( (err) => { 
      });
   }else{
   }
  }




  want_leadActive(index, action, lead_id){
    console.log(index, action, lead_id)
     if(action == 'yes'){
       this.selectLeadActiveModal(lead_id);
     }
     if(action == 'no'){
        for (let i = 0; i < this.leadData.length; i++) {
          this.leadData[i].lead_active_custom = false;
        }
        this.leadData[index].lead_active_custom = false;
     }
  }



  async selectLeadActiveModal(lead_id){
    console.log(lead_id);
    const modal = await this.modalCtrl.create({  
      component: SelectLeadActivePage,
      componentProps: {lead_id : lead_id},
      animated: true,
      backdropDismiss: false,
      cssClass: 'center-modals',
      mode: 'md'
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      const clientStatus = data.data.status;
      console.log(clientStatus);
   
    });
    return await modal.present();  
  }





}
