import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LeadMessagePage } from 'src/app/modals/lead-message/lead-message.page';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';

import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.page.html',
  styleUrls: ['./add-region.page.scss'],
})
export class AddRegionPage implements OnInit {
  @ViewChild('carSearchInput') carInput: ElementRef;
  
  userToken;
  userRole;
 
  submitted: boolean = false;

  stateSugData: any;
  companySugData: any;
  memberSugData: any;

  company_id: any;



  constructor(private router: Router, private capHttp: HttpCapService, private formBuilder: FormBuilder, 
              private resMsg : ResponseMsgService, private modalCtrl: ModalController, private checkStr: StorageService,
              private alertCtrl: AlertController, private datePipe: DatePipe, private ls: LoaderService) 
              
              { }


  ngOnInit(): void {
  }


  ionViewWillEnter(){
    this.getUser();
  }




  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.userRole = data.role;
           this.getStates(this.userToken);
           this.getMembers(this.userToken);
           if(this.userRole === 3){
             this.getCompany(this.userToken);
           }
        }
      }
    }).catch( err => {  });
  }





  getStates(token){
    this.capHttp.postData('/states', '', token).then((res:any) => {  console.log(res);   
      if(res.status === "success"){ 
         this.stateSugData =  res.data;
         this.stateSugData.forEach(object => {
          object.selected = false;
        });
      }
    }).catch( err => {
    });
  }


  
  getCompany(token){
    // this.capHttp.getData('/get-company', token).then((res:any) => {  console.log(res);   
    //   if(res.status === "success"){ 
    //     if(res.data === ''){
    //       this.companySugData =  [];
    //     }else{
    //       this.companySugData =  res.data;
    //       this.companySugData.forEach(object => {
    //         object.selected = false;
    //       });
    //     }
    //   }
    // }).catch( err => {
    // });
  }

  getMembers(token){
    this.capHttp.getData('/get-company-members', token).then((res:any) => {  console.log(res);   
      if(res.status === "success"){ 
        if(res.data === ''){
          this.memberSugData =  [];
        }else{
          this.memberSugData =  res.data;
          this.company_id = res.id;
          this.memberSugData.forEach(object => {
            object.selected = false;
          });
        }
      }
    }).catch( err => {
    });
  }



  regionForm_Submit(){
    this.submitted = true;

    console.log(this.stateSugData);
    console.log(this.memberSugData);

    const aa = this.stateSugData.filter(x => x.selected === true);
    const aa_ids = aa.map((obj) => {
      return obj.id;
    });
    const aaa_ids = aa_ids.toString();

    const bb = this.memberSugData.filter(x => x.selected === true);
    const bb_ids = bb.map((obj) => {
      return obj.id;
    });

    const cc = this.memberSugData.filter(x => x.selected === true);
    const cc_ids = cc.map((obj) => {
      return obj.id;
    });
    const ccc_ids = cc_ids.toString();

    if(aa_ids.length === 0){
      this.resMsg.presentToast('Please select State!' , 2000, 'bottom');
    }
    // else if(bb_ids.length === 0){
    //   this.resMsg.presentToast('Please select Company!' , 2000, 'bottom');
    // }
    else if(cc_ids.length === 0){
      this.resMsg.presentToast('Please select Members!' , 2000, 'bottom');
    }else{
        if(aa_ids && bb_ids && cc_ids){
        this.ls.showLoader();
        const payload = {
          region_name: aaa_ids, 
          company_id: this.company_id, 
          member_id: ccc_ids
        };
  
        this.capHttp.postData('/create-region', payload, this.userToken).then((res:any) => {  console.log(res);   
          this.ls.hideLoader();
          if(res.status === "success"){ 
            this.resMsg.presentToast(res.status+': '+res.msg , 2000, 'bottom');
          }else{
            this.resMsg.presentToast(res.status+': '+res.msg , 2000, 'bottom');
          }
        }).catch( err => {
          this.ls.hideLoader();
        });
        }else{
          this.resMsg.presentToast('Please fill the form Correctly!' , 2000, 'bottom');
        }
    }
  }




  getMemberSuggestion(token){
    this.capHttp.postData('/get-all-members-for-region', '', token).then((res:any) => { //  console.log(res);   
      if(res.status === "success"){ 
         this.memberSugData =  res.data;
      }
    }).catch( err => {
    });
  }



}
