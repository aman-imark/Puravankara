import { Component, OnInit } from '@angular/core';


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

import { DatePickBirthPage } from 'src/app/modals/date-pick-birth/date-pick-birth.page';

import { spaceValidator, phoneNumberValidator } from 'src/app/customValidator';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.page.html',
  styleUrls: ['./add-members.page.scss'],
})
export class AddMembersPage implements OnInit {

  userToken;

  memberForm: FormGroup;
  submitted: boolean = false;

  stateData;
  cityData;
  citySelectedValue;

  dob_setVal;
  


  constructor(private router: Router, private capHttp: HttpCapService, private formBuilder: FormBuilder, 
              private resMsg : ResponseMsgService, private modalCtrl: ModalController, private checkStr: StorageService,
              private alertCtrl: AlertController, private datePipe: DatePipe, private ls: LoaderService) { }



  ngOnInit(): void {
    this.getUser();
    this.getCities();
    this.memberForm = this.formBuilder.group({
      contact_person_name: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      email: ["", [Validators.email, Validators.required]],  
      contact_no: ["", [Validators.required, this.validatePhoneNumber1]],
      city: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      address: ["", [Validators.required]],
      
      pan_number: ["", [Validators.required, Validators.pattern(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/)]],
      // rera_no: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      // rera_no: ["", [Validators.required, Validators.pattern(/^[A-Z]{3}\/[A-Z]{2}\/RERA\/[0-9]{4}\/[0-9]{3}\/[A-Z]{2}\/[0-9]{6}\/[0-9]{6}$/)]],
      
      // rera_no: ["", [Validators.required, Validators.pattern(/^[A-Z]{2,3}\/[A-Z0-9]+\/RERA\/\d{4}\/\d{3}\/[A-Z0-9]+\/\d{6}\/\d{6}$/)]],
      rera_no: ["", [Validators.required, Validators.pattern(
        /^(?:[A-Z]{2,3}\/[A-Z0-9]+\/RERA\/\d{4}\/\d{3}\/[A-Z0-9]+\/\d{6}\/\d{6}|[A-Z]{3}\/[A-Z]{2}\/RERA\/\d{4}\/\d{3}\/[A-Z0-9]+\/\d{6}\/\d{6}|[A-Z]{2}\/[A-Za-z]+\/\d{4}\/\d{4}|[A-Z]\d{11}[A-Z]|K-RERA\/\d{4}\/\d{4}|[A-Z]\d{11}|[A-Z]{4}\d{8})$/
      )]],      
      gst_number: ["", [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9A-Za-z]{1}$/)]],
      region_name: ["", [Validators.required]],
      vendor_id: ["", []],
      // alternate_number: ["", [this.validatePhoneNumber2]],
      // date_of_birth: [""],
    });
  }




  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getStates(this.userToken);
        }
      }
    }).catch( err => {  });
  }



  
  get f() {
    return this.memberForm.controls;
  }

  

  validatePhoneNumber1(control) {
    const value = control.value;
    // const selectedCountryCode = this.phoneForm.get('countryCode').value;

    // Regular expressions to validate phone numbers
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


  addMemberData(){
      this.submitted = true;
      console.log(this.memberForm);
      if(this.memberForm.status == "INVALID"){
        this.resMsg.presentToast('Please fill all the details Correctly!' , 2000, 'bottom');
      }else if(this.memberForm.status == "VALID"){
        this.ls.showLoader();
        this.capHttp.postData('/create-lead-by-company', this.memberForm.value, this.userToken).then((res:any) => {   console.log(res);   
          this.ls.hideLoader();
          if(res.status === "success"){ 
            this.resMsg.presentToast(res.status+': '+res.msg , 2000, 'bottom');
            this.router.navigate(['main/tabs/tab1']);
            this.memberForm.reset();
          }else if(res.status === "required"){
            if(res.msg.rera_no){
              this.resMsg.presentToast('Warning'+': '+res.msg.rera_no, 2000, 'bottom');
            }else if(res.msg.email){
              this.resMsg.presentToast('Warning'+': '+res.msg.email, 2000, 'bottom');
            }else if(res.msg.pan){
              this.resMsg.presentToast('Warning'+': '+res.msg.pan_number, 2000, 'bottom');
            }else if(res.msg.gst_number){
              this.resMsg.presentToast('Warning'+': '+res.msg.gst_number, 2000, 'bottom');
            }else if(res.msg.phone){
              this.resMsg.presentToast('Warning'+': '+res.msg.phone, 2000, 'bottom');
            }else{
              this.resMsg.presentToast('Warning'+': '+'Not submitted' , 2000, 'bottom');
            }
          }else{
            this.resMsg.presentToast(res.status+': '+res.msg , 2000, 'bottom');
          }
        }).catch( err => {
        });
      }
  }



  async dateModalBirth(){
    const modal = await this.modalCtrl.create({
      component : DatePickBirthPage,
      componentProps : {'val': this.dob_setVal},
      animated : true,
      backdropDismiss: true,
      cssClass: 'center-modals',
      mode: 'md'
    });  
    modal.onDidDismiss().then( (data) => {
      if(data){
        const selectedDate = data.data.dateValue;
        const selectedDateB = this.datePipe.transform(selectedDate, 'dd-MM-y');
          this.dob_setVal = selectedDate;
          this.memberForm.controls['date_of_birth'].setValue(selectedDateB);
      }
    });   
    return await modal.present();
  }



  citySelectEvent(ev){
    // console.log(ev);
    console.log(this.memberForm.get('city').value);
    this.citySelectedValue = this.memberForm.get('city').value;
    if(this.citySelectedValue){
    }
  }



  getStates(token){
    this.capHttp.postData('/states', '', token).then((res:any) => {  console.log(res);   
      if(res.status === "success"){
         this.stateData = res.data;
      }
    }).catch( err => {
    });
  }



  getCities(){
    this.capHttp.getData('/cities').then((res:any) => {   console.log(res);   
      if(res.status === "success"){ 
        this.cityData = res.data;
      }
    }).catch( err => {
    });
  }





}
