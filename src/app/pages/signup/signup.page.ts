import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';

import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { PickerController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DatePickPage } from 'src/app/modals/date-pick/date-pick.page';
import { DatePickBirthPage } from 'src/app/modals/date-pick-birth/date-pick-birth.page';

import { AccessStatusPage } from 'src/app/modals/access-status/access-status.page';
import { DatePipe } from '@angular/common';
import { Device } from '@capacitor/device';

import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';

import { spaceValidator, phoneNumberValidator } from 'src/app/customValidator';


// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

import { Http, HttpResponse, HttpOptions } from '@capacitor-community/http';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  device_uuid;

  role: string;
  rera_number: string;

  signupForm: FormGroup;
  submitted: boolean = false;

  date_setVal;
  dob_setVal;

  fileNameGST: any;
  fileNameRERA: any;

  inputValue = '';
  predictions: any[] = [];

  showSuggest: boolean = false;

  orgLists: any;
  stateData: any;

  constructor(private router: Router, private capHttp: HttpCapService, private formBuilder: FormBuilder,
    private resMsg : ResponseMsgService, private checkStr: StorageService, private activatedRoute: ActivatedRoute,
    private pickerController: PickerController, private modalCtrl: ModalController, private datePipe: DatePipe,
    private resMsgServ: ResponseMsgService, private ls: LoaderService) 
    
    
    { }

// vinod.kumar@imarkinfotech.com

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      type: ["", [Validators.required]],
      company_name: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      name: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      email: ["", [Validators.required, Validators.email]],
      // pan_number: ["KUXDC9010Z", [Validators.required,  Validators.pattern(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/)]],
      pan_number: ["", [Validators.required, Validators.pattern(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/)]],
      // msme: ["AB12C1234567", [Validators.required,  Validators.pattern(/^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{7}$/)]],
      msme: ["", [Validators.pattern(/^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{7}$/)]],
      // gst_number: ["04AABCU9603R1ZV", [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9A-Za-z]{1}$/)]],
      gst_number: ["", [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9A-Za-z]{1}$/)]],
      // rera_no: ["", [Validators.pattern(/^[A-Z]{3}\/[A-Z]{2}\/RERA\/[0-9]{4}\/[0-9]{3}\/[A-Z]{2}\/[0-9]{6}\/[0-9]{6}$/)]],
      // rera_no: ["PRM/KA/RERA/1251/446/AG/171201/001619", [Validators.pattern(/^[A-Z]{3}\/[A-Z]{2}\/RERA\/[0-9]{4}\/[0-9]{3}\/[A-Z]{2}\/[0-9]{6}\/[0-9]{6}$/)]],
      
      // rera_no: ["", [Validators.required, Validators.pattern(/^[A-Z]{2,3}\/[A-Z0-9]+\/RERA\/\d{4}\/\d{3}\/[A-Z0-9]+\/\d{6}\/\d{6}$/)]], 
      rera_no: ["", [Validators.required, Validators.pattern(
        /^(?:[A-Z]{2,3}\/[A-Z0-9]+\/RERA\/\d{4}\/\d{3}\/[A-Z0-9]+\/\d{6}\/\d{6}|[A-Z]{3}\/[A-Z]{2}\/RERA\/\d{4}\/\d{3}\/[A-Z0-9]+\/\d{6}\/\d{6}|[A-Z]{2}\/[A-Za-z]+\/\d{4}\/\d{4}|[A-Z]\d{11}[A-Z]|K-RERA\/\d{4}\/\d{4}|[A-Z]\d{11}|[A-Z]{4}\d{8})$/
      )]],
      
      gst_certificate: [null, []],
      rera_certificate: [null, []],
      have_gst: ["yes"],
  
      phone: ["", [Validators.required, this.validatePhoneNumber1]],
      alternate_number: ["", [this.validatePhoneNumber2]],
      city: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      pincode: ["", [Validators.pattern(/^[1-9][0-9]{5}$/)]],
      address: ["", [Validators.required]],
      communication_address: [""],

      date: [""],
      dob: [""],
      region_name: ["", [Validators.required]],
      vendor_id: ["", [Validators.required]], 

      partner_name: ["", [Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      device_id: ["", [Validators.required]],
    });         
  }



  // Name, Address, Email-ID, Phone NO, PAN-No, RERA-No, GST-No(* if applicable)]:
  
  // ORG: type_name, company_name, name, email, pan_number, msme, have_gst, gst_number, rera_no, rera_certificate, phone, alternate_number, city, address, communication_address, pincode, dob, date, partner_name
  // CP: type_name, company_name, name, email, pan_number, gst_number, rera_no, phone, city, address

  // required: company_name, name, email, pan_number, rera_no, phone, city, address, 




  ionViewWillEnter(){
    Device.getId().then( (res) => {
      // uuid: "dbf01cb72d884e76"  test UUID Android Emulator
      this.device_uuid = res.uuid;
      console.log(this.device_uuid);
    });
    this.activatedRoute.queryParams.subscribe((params) => { console.log(params)
      this.role = params.role;
      // this.rera_number = params.rera_number;

      this.signupForm.controls['type'].setValue(this.role);
      // this.signupForm.controls['rera_no'].setValue(this.rera_number);
      this.signupForm.controls['device_id'].setValue(this.device_uuid);
    });

    this.getOrganization();
    this.getStates();
  }

  
  getOrganization(){
    this.capHttp.getData('/organization-listing').then((res:any) => {  console.log(res);   
      if(res.status === "success"){
         this.orgLists = res.data;
      }
    }).catch( err => {
    });
  }

  getStates(){
    this.capHttp.postData('/states', '', '').then((res:any) => {  console.log(res);   
      if(res.status === "success"){
         this.stateData = res.data;
      }
    }).catch( err => {
    });
  }


  onFileSelectedGST(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const file: File = inputElement.files[0];
    console.log(file);
    this.fileNameGST = file.name;

    const reader = new FileReader();
    console.log(reader);

    const fileUrl = URL.createObjectURL(file);
    console.log(fileUrl);

    const fileData = reader.result as ArrayBuffer;
    console.log(fileData);


    // this.signupForm.patchValue({
    //   gst_certificate: new Blob([file])
    // });
    this.signupForm.patchValue({
      gst_certificate: file
    });

    // this.signupForm.patchValue({
    //   gst_certificate: new Blob([fileData])
    // });

    // this.signupForm.patchValue({
    //   gst_certificate: (new Blob([fileData], { type: file.type }), file.name),
    // });
    
    console.log(this.signupForm.value);

    // reader.onload = () => {
    //   const fileData = reader.result as ArrayBuffer;
    //   const formData = new FormData();
    //   formData.append('file', new Blob([fileData], { type: file.type }), file.name);
    //   console.log(formData);
    //   reader.readAsArrayBuffer(file);
    // }


    // spread oprator ***
    // const numbers = [1, 2, 3];
    // const newNumbers = [...numbers, 4];
    // console.log(newNumbers);
    // this.signupForm.patchValue({
    //   gst_certificate: new Blob([file]),
    // });
  }


  onFileSelectedRERA(event: any){
    console.log(event.target)

    const file = event.target.files[0];
    this.fileNameRERA = file.name;

    const reader = new FileReader();
    // const fileUrl = URL.createObjectURL(file);

    // this.signupForm.patchValue({
    //   rera_certificate: new Blob([file])
    // });

    this.signupForm.patchValue({
      rera_certificate: file
    });

    reader.onload = () => {
      const fileData = reader.result as ArrayBuffer;
      const formData = new FormData();
      formData.append('file', new Blob([fileData], { type: file.type }), file.name);
      console.log(formData);
      // Make the HTTP request to your PHP API endpoint
      // this.http.post('https://example.com/upload.php', formData).subscribe(
      //   response => {
      //     console.log('File uploaded successfully', response);
      //   },
      //   error => {
      //     console.error('Error uploading file', error);
      //   }
      // );
      // };
    reader.readAsArrayBuffer(file);
    }
    console.log(reader);
  }


  removeFileGST(){
    this.fileNameGST = null;
  }

  removeFileRERA(){
    this.fileNameRERA = null;
  }

  
  get f() {
    return this.signupForm.controls;
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
      if(value){
      return { invalidPhoneNumber: true }; // Invalid phone number
      }
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


  async onFileSelected(event: Event) {
    // const inputElement = event.target as HTMLInputElement;
    // const file = inputElement.files[0];
    // console.log(file);

    // if(inputElement.files[0].type === 'application/pdf'){
    //   // this.csvFileName = inputElement.files[0].name;
    //   // this.csvFileSize = inputElement.files[0].size;
    // }else{
    //   this.resMsgServ.presentToast('File type not supported!', 2000, 'bottom')
    // }

    // this.signupForm.patchValue({
    //   gst_certificate: file,
    // });





    // // Read the file contents
    // const fileContents: any = await this.readFile(file);
    // console.log(fileContents)
  
    // // Create a FormData object to send the file to the server
    // // const formData = new FormData();
    // // formData.append('file', new Blob([fileContents], { type: 'application/pdf' }), file.name);
    // // console.log(formData)

    // https://cp.purvaconnect.com/api/upload-csv

  }
  

  async readFile(file: File) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        resolve(new Uint8Array(fileReader.result as ArrayBuffer));
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  


  user_signup(): void {
      this.submitted = true;
      this.signupForm.controls['device_id'].setValue(this.device_uuid);

      if(this.role === '2'){
        this.signupForm.controls['region_name'].setValue('none');
        this.signupForm.controls['vendor_id'].setValue('none');
      }

      console.log(this.signupForm);
      console.log(this.signupForm.value);
      // console.log(this.signupForm.get('company_name').value);

      // const formData = new FormData();
      // formData.append('type', this.signupForm.get('type').value);
      // formData.append('company_name', this.signupForm.get('company_name').value);
      // formData.append('name', this.signupForm.get('name').value);
      // formData.append('pan_number', this.signupForm.get('pan_number').value);
      // formData.append('gst_number', this.signupForm.get('gst_number').value);
      // formData.append('city', this.signupForm.get('city').value);
      // formData.append('email', this.signupForm.get('email').value);
      // formData.append('phone', this.signupForm.get('phone').value);
      // formData.append('alternate_number', this.signupForm.get('alternate_number').value);
      // formData.append('msme', this.signupForm.get('msme').value);
      // formData.append('rera_no', this.signupForm.get('rera_no').value);
      // formData.append('date', this.signupForm.get('date').value);
      // formData.append('address', this.signupForm.get('address').value);
      // formData.append('communication_address', this.signupForm.get('communication_address').value);
      // formData.append('dob', this.signupForm.get('dob').value);
      // formData.append('pincode', this.signupForm.get('pincode').value);
      // formData.append('partner_name', this.signupForm.get('partner_name').value);
      // formData.append('gst_certificate', this.signupForm.get('gst_certificate').value);
      // formData.append('rera_certificate', this.signupForm.get('rera_certificate').value);
      // formData.append('device_id', this.signupForm.get('device_id').value);



    if(this.signupForm.status === "INVALID"){
        this.resMsg.presentToast('Incomplete: Please fill all the required fields!' , 2000, 'bottom');
    }else if(this.signupForm.status === "VALID"){
        this.ls.showLoader();

        if(this.signupForm.get('have_gst').value === "no"){
           this.signupForm.get('gst_number').setValue("");
        }
        // this.capHttp.postFormData('/register', this.signupForm.value).then((res:any) => {  console.log(res); 
        //   this.ls.hideLoader();
        //   if(res.status === "success"){ 
        //     if(this.device_uuid){
        //       this.accessStatusModal();
        //       this.signupForm.reset(this.signupForm.value);
        //       this.router.navigate(['get-started']);
        //     }
        //   }else if(res.status === "required"){

        //     if(res.message.rera_no){
        //       this.resMsg.presentToast('Warning'+': '+res.message.rera_no, 2000, 'bottom');
        //     }else if(res.message.email){
        //       this.resMsg.presentToast('Warning'+': '+res.message.email, 2000, 'bottom');
        //     }else if(res.message.pan){
        //       this.resMsg.presentToast('Warning'+': '+res.message.pan_number, 2000, 'bottom');
        //     }else if(res.message.gst_number){
        //       this.resMsg.presentToast('Warning'+': '+res.message.gst_number, 2000, 'bottom');
        //     }else if(res.message.phone){
        //       this.resMsg.presentToast('Warning'+': '+res.message.phone, 2000, 'bottom');
        //     }else{
        //       this.resMsg.presentToast('Warning'+': '+'Not submitted' , 2000, 'bottom');
        //     }

        //   }else{
        //     this.resMsg.presentToast('Warning'+': '+res.msg , 2000, 'bottom');
        //   }
        // }).catch( err => {
        //   this.ls.hideLoader();
        //   this.resMsg.presentToast('Error: Something is Wrong!' , 2000, 'bottom');
        // });

        const payload = {
          type: this.signupForm.get('type').value,
          company_name: this.signupForm.get('company_name').value,
          name: this.signupForm.get('name').value,
          email: this.signupForm.get('email').value,
          pan_number: this.signupForm.get('pan_number').value,
          msme: this.signupForm.get('msme').value,          
          gst_number: this.signupForm.get('gst_number').value,
          rera_no: this.signupForm.get('rera_no').value,  
          gst_certificate: this.signupForm.get('gst_certificate').value,   
          rera_certificate: this.signupForm.get('rera_certificate').value,  
          // have_gst
          phone: this.signupForm.get('phone').value,
          alternate_number: this.signupForm.get('alternate_number').value,
          city: this.signupForm.get('city').value,
          pincode: this.signupForm.get('pincode').value, 
          address: this.signupForm.get('address').value,     
          communication_address: this.signupForm.get('communication_address').value, 
          date: this.signupForm.get('date').value,    
          dob: this.signupForm.get('dob').value,     
          region_name: this.signupForm.get('region_name').value,   
          vendor_id: this.signupForm.get('vendor_id').value,   
          partner_name: this.signupForm.get('partner_name').value,   
          device_id: this.signupForm.get('device_id').value,   
        };

        console.log(payload);
// type, company_name, name, email, pan_number, msme, gst_number, rera_no,
// gst_certificate, rera_certificate, have_gst, phone. alternate_number,
// city, pincode, address, communication_address, date, dob, region_name, vendor_id, partner_name, device_id


        this.capHttp.register(payload).then((res) => {
          this.ls.hideLoader();
          console.log(res);
          if(res.status === "success"){ 
            if(this.device_uuid){
              this.accessStatusModal();
              this.signupForm.reset(this.signupForm.value);
              this.router.navigate(['get-started']);
            }
          }else if(res.status === "required"){
            if(res.message.rera_no){
              this.resMsg.presentToast('Warning'+': '+res.message.rera_no, 2000, 'bottom');
            }else if(res.message.email){
              this.resMsg.presentToast('Warning'+': '+res.message.email, 2000, 'bottom');
            }else if(res.message.pan){
              this.resMsg.presentToast('Warning'+': '+res.message.pan_number, 2000, 'bottom');
            }else if(res.message.gst_number){
              this.resMsg.presentToast('Warning'+': '+res.message.gst_number, 2000, 'bottom');
            }else if(res.message.phone){
              this.resMsg.presentToast('Warning'+': '+res.message.phone, 2000, 'bottom');
            }else{
              this.resMsg.presentToast('Warning'+': '+'Not submitted' , 2000, 'bottom');
            }
          }else{
            this.resMsg.presentToast('Warning'+': '+res.msg , 2000, 'bottom');
          }
        }).catch(error => {
            this.ls.hideLoader();
            console.log(error);
            this.resMsg.presentToast('Error: Something is Wrong!' , 2000, 'bottom');
        });
    }else{
        this.ls.hideLoader();
        this.resMsg.presentToast('Error: Something is Wrong!' , 2000, 'bottom');
    }
  }



  selectCity(selectedCity: any){
    console.log(selectedCity);
    this.signupForm.controls['city'].setValue(selectedCity.description);
    this.showSuggest = false;
  }


  searchCity(event: any) {
    this.inputValue = event.target.value;
    if (this.inputValue.length > 2) {
      this.getPredictions();
    } else {
      this.predictions = [];
    }
  }



  getPredictions() {
    const apiKey = 'AIzaSyCtZNVT318F-HYweBrZWJBM5k0KgSiMDKc';
    const input = encodeURIComponent(this.inputValue);
    console.log(input)
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${apiKey}`;
    let nativeHeaders = {
           'Content-Type': 'multipart/form-data', 
           'Access-Control-Allow-Origin': '*', 
    };
     
      return new Promise(resolve => { 
        Http.request({url: apiUrl,  method: 'GET', headers: nativeHeaders }).then(data => {
            console.log(data);
            if (data.data.status === 'OK' && data.data.predictions) {
              this.predictions = data.data.predictions;
              this.showSuggest = true;
            }
        }).catch(error => {
            console.log(error);
        });
      })
  }




  async dateModal(){
      const modal = await this.modalCtrl.create({
        component : DatePickPage,
        componentProps : {'val': ''},
        animated : true,
        backdropDismiss: true,
        cssClass: 'center-modals',
        mode: 'md'
      });
      modal.onDidDismiss().then( (data) => { 
        if(data){
          let selectedDate = data.data.dateValue;
          let selectedDateB = this.datePipe.transform(selectedDate, 'y-MM-dd');
            this.date_setVal = selectedDate;
            this.signupForm.controls['date'].setValue(selectedDateB);
        }
      });
      return await modal.present();
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
            this.signupForm.controls['dob'].setValue(selectedDateB);
        }
      });   
      return await modal.present();
  }


  async accessStatusModal(){
      const modal = await this.modalCtrl.create({
        component : AccessStatusPage,
        animated : true,
        backdropDismiss: true,
        mode: 'md'
      });
      modal.onDidDismiss().then( (data) => {
        this.signupForm.reset(this.signupForm.value);
      });
      return await modal.present();
  }


  goto_terms(){
    this.router.navigate(['/termsb'])
  }


}
