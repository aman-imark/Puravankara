import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UploadLeadsPage } from 'src/app/modals/upload-leads/upload-leads.page';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  userToken;

  leadTypeFilterData;
  cityFilterData;
  projectFilterData;
  memberSugData;

  showMemberSug: boolean;
  autoCompleteClick: boolean = false;

  filterMember;

  filterData = {
    Lead_Ids: '',
    City_Ids: '',
    Project_Ids: '',
    member_id: '',
    member_name: '',
    apply: false
  };




  setLeadValue;
  setCityValue;
  setProjectValue;

  returnFilterValue;




  constructor(private router: Router, private capHttp: HttpCapService, private modalCtrl: ModalController,
              private resMsg : ResponseMsgService, private checkStr: StorageService, 
              private ls: LoaderService, private formBuilder: FormBuilder) { }



      
  ionViewWillEnter(){
    this.getUser();
    this.autoCompleteClick = false;
  }


  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      console.log(data);
      if(data !== null || data !== '' || typeof(data) !== 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getFilter();
        }
      }
    }).catch( err => {  });
  }




  getFilter(){
    this.checkStr.getStore('filterList').then((data:any) => { 
      console.log(data)
      if(data === null || data === '' || typeof(data) === 'undefined'){
        this.getLeadTypes(this.userToken);
        this.getCities(this.userToken);
        this.getProjects(this.userToken);
        this.getMembers(this.userToken);    
      }else{ 
        this.leadTypeFilterData = data.leadStatusData;
        this.cityFilterData = data.cityData;
        this.projectFilterData = data.projectsData;
        this.memberSugData = data.memberSugData;
      }
    })
  }



  getLeadTypes(token){
    this.capHttp.postData('/get-lead-status', '', token).then((res:any) => {  console.log(res);  
      if(res.status === "success"){ 
        this.leadTypeFilterData = res.data;
        this.leadTypeFilterData.forEach(object => {
          object.selected = false;
        });
      }
    }).catch( err => {
    });
  }


  getCities(token){
    this.capHttp.postData('/get-cities', '', token).then((res:any) => {   console.log(res);  
      if(res.status === "success"){ 
        this.cityFilterData = res.data;
        this.cityFilterData.forEach(object => {
          object.selected = false;
        });
      }
    }).catch( err => {
    });
  }


  getProjects(token){
    this.capHttp.postData('/get-projects', '', token).then((res:any) => {   console.log(res);  
      if(res.status === "success"){ 
        this.projectFilterData = res.data;
        this.projectFilterData.forEach(object => {
          object.selected = false;
        });
      }
    }).catch( err => {
    });
  }


  getMembers(token){
    this.capHttp.postData('/get-members', '', token).then((res:any) => {  // console.log(res);
      if(res.status === "success"){ 
        this.memberSugData = res.data;        
      }
    }).catch( err => {
    });
  }



  memberAutoCompleteValue(id, name){
    console.log(this.filterMember);
    this.autoCompleteClick = true;
    if(id){
      this.filterData.member_id = id;
      this.filterData.member_name = name
      this.filterMember = name;
    }
    this.showMemberSug = false;
  }

  memberInputInput(){
    // console.log(this.showMemberSug)
    // console.log(this.filterMember);
    // this.showMemberSug = true;
    // console.log(this.showMemberSug)
    // console.log(this.showMemberSug)
  }

  memberInputBlur(){
    // this.showMemberSug = false;
    // console.log(this.showMemberSug)
  }

  memberInputFocus(){
    // this.showMemberSug = true;
    // console.log(this.showMemberSug)
  }

  memberInputChange(){
    // console.log(this.filterMember.length);
    if(this.filterMember.length >= 2){
      if(this.autoCompleteClick === true){
        this.showMemberSug = false;
      }else{
        this.showMemberSug = true;
      }      
    }else{
      this.showMemberSug = false;
    }
  }




  clearFilter(){
    this.checkStr.removeStore('filterList');
    this.modalCtrl.dismiss(this.filterData);
    this.getUser();
  }





  applyFilter(){
    this.checkStr.setStore('filterList', {"leadStatusData" :this.leadTypeFilterData,
    "cityData": this.cityFilterData, "projectsData": this.projectFilterData,
    "memberData": this.memberSugData});

    this.checkStr.getStore('filterList').then((data:any) => { 
      console.log(data)  
      if(data != null || data != '' || typeof(data) != 'undefined'){

        const aa = data.leadStatusData.filter(x => x.selected === true);
        const aa_ids = aa.map((obj) => {
          return obj.id;
        });
        const aaa_ids = aa_ids.toString();
    

        const cc = data.cityData.filter(x => x.selected === true);
        const cc_ids = cc.map((obj) => {
          return obj.id;
        });
        const ccc_ids = cc_ids.toString();


        const dd = data.projectsData.filter(x => x.selected === true);
        const dd_ids = dd.map((obj) => {
          return obj.id;
        });
        const ddd_ids = dd_ids.toString();

        this.filterData.apply = true;
        this.filterData.Lead_Ids = aa_ids;
        this.filterData.City_Ids = cc_ids;
        this.filterData.Project_Ids = dd_ids;
        this.filterData.member_id = '';
        this.filterData.member_name = '';

        this.modalCtrl.dismiss(this.filterData);
        console.log(this.filterData);
      }else{  }
    }).catch( err => { });
  }




  dismiss(){
    this.filterData.apply = false;
    this.modalCtrl.dismiss(this.filterData);
  }

  ngOnInit() {
  }


}
