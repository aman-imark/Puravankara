import { Component, Input, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LeadMessagePage } from 'src/app/modals/lead-message/lead-message.page';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';

import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { spaceValidator, phoneNumberValidator } from 'src/app/customValidator';


@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.page.html',
  styleUrls: ['./add-lead.page.scss'],
})
export class AddLeadPage implements OnInit {

  userToken;

  leadForm: FormGroup;
  submitted: boolean = false;

  cityData;
  projectData;

  projectForm: FormGroup;

  constructor(private router: Router, private capHttp: HttpCapService, private formBuilder: FormBuilder, 
              private resMsg : ResponseMsgService, private modalCtrl: ModalController, private checkStr: StorageService,
              private alertCtrl: AlertController, private ls: LoaderService) { }




  ngOnInit(): void {
    this.leadForm = this.formBuilder.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],  
      // mobile: ["", [Validators.required, phoneNumberValidator, spaceValidator(false)]],
     
      mobile: ["", [Validators.required, this.validatePhoneNumber1]],
      alternate_number: ["", [this.validatePhoneNumber2]],
      city_id: ["", [Validators.required]],
      channel_partner: ["", [Validators.required]],
      project_id: [{value: "", disabled: true}, [Validators.required,]]
    });

    this.projectForm = this.formBuilder.group({
      city: ["", [Validators.required]],
    });

    console.log(this.leadForm.get('mobile').value);
  }


  
  ionViewWillEnter(){
    this.getUser();
    this.getCities();
  }


  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
        }
      }
    }).catch( err => {  });
  }


  
  get f() {
    return this.leadForm.controls;
  }



  validatePhoneNumber1(control) {
    const value = control.value;
    // console.log(value);

      const indianPhoneNumberPattern = /^[6-9]\d{9}$/; // Indian phone number format
      const ukPhoneNumberPattern = /^(?:(?:(?:00\s?|\+)\s?44\s?|\(0\))?(?:1[23456789]\d\d\d\d\d\d\d\d\d|\(01\)\s?\d{4}\s?\d{4,5}|[123456789]\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d)|((?:00\s?|\+)\s?1\s?[.-]?\s?)(?:(?:\(\d{3}\))|(?:\d{3}))[.-]?\s?\d{3}[.-]?\s?\d{4})$/; // UK phone number format
      const usPhoneNumberPattern = /^(?:(?:\(\d{3}\))|(?:\d{3}))[.-]?\s?\d{3}[.-]?\s?\d{4}$/; // USA phone number format
  
      if (
        indianPhoneNumberPattern.test(value) ||
        ukPhoneNumberPattern.test(value) ||
        usPhoneNumberPattern.test(value)
      ) {
        return null; // Valid phone number
      } else {
        return { invalidPhoneNumber: true }; // Invalid phone number
      }
    
    // // Determine the regex pattern based on the selected country code
    // let regexPattern = '';
    // switch (selectedCountryCode) {
    //   case 'IN':
    //     regexPattern = indianPhoneNumberPattern.source;
    //     break;
    //   case 'UK':
    //     regexPattern = ukPhoneNumberPattern.source;
    //     break;
    //   case 'US':
    //     regexPattern = usPhoneNumberPattern.source;
    //     break;
    //   default:
    //     // Use a generic pattern if no specific country code is selected
    //     regexPattern = `(${indianPhoneNumberPattern.source}|${ukPhoneNumberPattern.source}|${usPhoneNumberPattern.source})`;
    //     break;
    // }

    // const regex = new RegExp(regexPattern);

    // if (!regex.test(value)) {
    //   return { invalidPhoneNumber: true };
    // }

    // return null;
  }

  validatePhoneNumber2(control) {
    const value = control.value;
    // console.log(value);

    // if (alternateNumberControl && alternateNumberControl.value) {
    if (value) {
      const indianPhoneNumberPattern = /^[6-9]\d{9}$/; // Indian phone number format
      const ukPhoneNumberPattern = /^(?:(?:(?:00\s?|\+)\s?44\s?|\(0\))?(?:1[23456789]\d\d\d\d\d\d\d\d\d|\(01\)\s?\d{4}\s?\d{4,5}|[123456789]\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d)|((?:00\s?|\+)\s?1\s?[.-]?\s?)(?:(?:\(\d{3}\))|(?:\d{3}))[.-]?\s?\d{3}[.-]?\s?\d{4})$/; // UK phone number format
      const usPhoneNumberPattern = /^(?:(?:\(\d{3}\))|(?:\d{3}))[.-]?\s?\d{3}[.-]?\s?\d{4}$/; // USA phone number format
  
      if (
        indianPhoneNumberPattern.test(value) ||
        ukPhoneNumberPattern.test(value) ||
        usPhoneNumberPattern.test(value)
      ) {
        return null; // Valid phone number
      } else {
        return { invalidPhoneNumber: true }; // Invalid phone number
      }
    } else {
      return null; // No validation if alternate_number is empty
    }

  }



  addLead_form(){
      this.submitted = true;
      console.log(this.leadForm);
      if(this.leadForm.status === "INVALID"){
        this.resMsg.presentToast('Please fill all the details Correctly!' , 2000, 'bottom');
      }else if(this.leadForm.status === "VALID"){
        console.log(this.userToken);
        this.ls.showLoader();
        this.capHttp.postData('/create-lead', this.leadForm.value, this.userToken).then((res:any) => {   console.log(res);   
          this.ls.hideLoader();
          if(res.status === "success"){ 
            this.leadMessage(res.msg, res.salesforece);
            this.leadForm.reset();
          }else{
            this.resMsg.presentToast(res.status+': '+res.msg , 2000, 'bottom');
          }
        }).catch( err => {
        });
      }
  }




  citySelectEvent(ev: any){
    // console.log(ev);
    console.log(this.leadForm.get('city_id').value);
    if(this.leadForm.get('city_id').value){

      this.projectForm.controls['city'].setValue(this.leadForm.get('city_id').value);

      console.log(this.projectForm.value);
      // this.getProjects(this.leadForm.get('city_id').value);
      this.getProjects();
      this.leadForm.get('project_id')?.enable();
    }
  }




  getCities(){
    this.capHttp.getData('/cities').then((res:any) => {   console.log(res);   
      if(res.status === "success"){ 
        this.cityData = res.data;
      }
    }).catch( err => {
    });
  }



  getProjects(){
    this.ls.showLoader();
    this.capHttp.postData('/projects-by-city-name', {city : this.projectForm.get('city').value}, '').then((res:any) => {   console.log(res);   
      this.ls.hideLoader();
      if(res.status === "success"){ 
        this.projectData = res.data;
      }else{
        this.resMsg.presentToast(res.status+ ': Somthing wrong!' , 2000, 'bottom');
      }
    }).catch( err => { this.resMsg.presentToast('Please fill all the details Correctly!' , 2000, 'bottom');
    });
  }


  

  async leadMessage(message, salesforece) {
    console.log('Modal Clicked')
    const modal = await this.modalCtrl.create({  
      component: LeadMessagePage,
      componentProps: {'message': message, 'salesforece': salesforece},
      animated: true,
      backdropDismiss: true,
      cssClass: 'center-modals',
      mode: 'md'
    });  
    return await modal.present();  
  }  



}
