import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { TimePickPage } from '../time-pick/time-pick.page';
import { DatePickPage } from '../date-pick/date-pick.page';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-book-cab-input',
  templateUrl: './book-cab-input.page.html',
  styleUrls: ['./book-cab-input.page.scss'],
})
export class BookCabInputPage implements OnInit {
  @Input('name') name;
  @Input('lead_id') lead_id;
  @Input('bookingDate') bookingDate;
  @Input('bookingTime') bookingTime;
 

  userToken: any;
  formA: boolean = true;

  titleText: string;


  cab_form : FormGroup;
  date_setVal;
  selectedTimeValue;

  cabBookSubmit: boolean = false;

  searchTerm: string = '';
  searchPlaces: any[];

  searchTerm2: string = '';
  searchPlaces2: any[];


  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private datePipe: DatePipe, private ls: LoaderService,
              private capHttp: HttpCapService, private checkStr: StorageService, private resMsg: ResponseMsgService) 
  
  { this.titleText = 'Select Date & Time'; }


  ngOnInit() {
    this.cab_form = this.fb.group({
      cab_date: ['', [Validators.required]],
      cab_time: ['', [Validators.required]],
      cab_person_num: ['', [Validators.required]],
      cab_pickup: ['', [Validators.required]],
      cab_dropoff: ['', [Validators.required]],
      cab_checkbox: [true, [Validators.required]]
    });

    this.cab_form.controls['cab_date'].setValue(this.bookingDate);
    this.cab_form.controls['cab_time'].setValue(this.bookingTime);
  }



  ionViewWillEnter(){
    this.get_userData();
  }
  


  get_userData(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){             
          this.userToken = data.token;
        }
      }
    }).catch( err => {  });
  }

  
  async dateSelectModal(){
      const modal = await this.modalCtrl.create({
        component : DatePickPage,
        componentProps : {'val': this.bookingDate},
        animated : true,
        backdropDismiss: true,
        cssClass: 'center-modals',
        mode: 'md'
      });
      modal.onDidDismiss().then( (data) => {
        console.log(data);
        if(data){
          let selectedDate = data.data.dateValue;
          let selectedDateB = this.datePipe.transform(selectedDate, 'dd-MM-y');
            this.date_setVal = selectedDate;
            this.cab_form.controls['cab_date'].setValue(selectedDateB);
        }
      });
      return await modal.present();
  }




  async timeSelectModal(type){
    if(type == 'cab_time'){
      const modal = await this.modalCtrl.create({
        component : TimePickPage,
        componentProps : {'type': type, 'val': ''},
        animated : true,
        backdropDismiss: true,
        cssClass: 'center-modals',
        mode: 'md'
      });
      modal.onDidDismiss().then( (data) => {
        console.log(data);
        if(data){
          let selectedDate = data.data.timeValue;
          let selectedDateB = this.datePipe.transform(selectedDate, 'h:mm a');
          if(type == 'cab_time'){
            this.date_setVal = selectedDate;
            this.cab_form.controls['cab_time'].setValue(selectedDateB);
          }
        }
      });
      return await modal.present();
    }
  }


  checkNext(){
    this.formA = false;
  }

  checkBack(){
    this.formA = true;
  }


  bookCabSubmit(){
    if(this.cab_form.value.cab_date && this.cab_form.value.cab_time && this.cab_form.value.cab_person_num){
        this.formA = false;
        this.titleText = 'Select Pick Up & Drop Off';
    }
    if(this.cab_form.value.cab_checkbox === true){
        this.cab_form.controls['cab_dropoff'].setValue(this.cab_form.value.cab_pickup);
    }
    // if(this.cab_form.value.cab_checkbox === false){
    //     this.cab_form.controls['cab_dropoff'].setValue('');
    // }

     console.log(this.cab_form.value);
    if(this.cab_form.status === 'VALID'){
       //  console.log(this.cab_form.value);
       let cabBook = {
        lead_id: this.lead_id, 
        pick_up: this.cab_form.value.cab_pickup,
        drop_off: this.cab_form.value.cab_dropoff,
        date:  this.cab_form.value.cab_date,   //  10/01/2023
        time: this.cab_form.value.cab_time,
        number_of_person: this.cab_form.value.cab_person_num
       };
       this.cabBookingSubmit(cabBook);
    }else if(this.cab_form.status === 'INVALID'){
      this.resMsg.presentToast('Please fill form Correctly!' , 2000, 'bottom');
    }
    
    
  }




  differentCheckbox(ev){
    if(ev.detail.checked === true){
       this.cab_form.controls['cab_dropoff'].setValue(this.cab_form.value.cab_pickup);
    }
    if(ev.detail.checked  === false){
       this.cab_form.controls['cab_dropoff'].setValue('');
    }
  }
  


  cabBookingSubmit(cabData){
    this.ls.showLoader();
    console.log(cabData);    
    this.capHttp.postData('/cab-booking', cabData, this.userToken).then( (res: any) => {
      console.log(res);
      this.ls.hideLoader();
      if(res.status === 'success'){
        this.cabBookSubmit = true;
        this.dismiss();
        this.resMsg.presentToast(res.msg , 2000, 'bottom');
      }
    }).catch( () => {
    });
  }



  filterList() {
    this.searchTerm = this.cab_form.get('cab_pickup').value;
    this.searchSuggestions(this.searchTerm);
  }



  radioSelectedPlace(ev){
    // console.log(ev.detail.value);
    this.searchTerm = ev.detail.value;
    this.cab_form.controls['cab_pickup'].setValue(ev.detail.value);
    this.searchPlaces = this.cab_form.get('cab_pickup').value;
    this.searchPlaces = null;
    console.log(this.searchPlaces);
  }



  searchSuggestions(searchTerm: string){
      this.capHttp.getPlace(searchTerm).then( (res: any) => {
        //  console.log(res);
         this.searchPlaces = res.predictions;
         console.log(this.searchPlaces);
      }).catch((err) => {
         console.log(err);
      });
  }





  filterList2() {
    this.searchTerm2 = this.cab_form.get('cab_dropoff').value;
    this.searchSuggestions2(this.searchTerm2);
  }



  radioSelectedPlace2(ev){
    // console.log(ev.detail.value);
    this.searchTerm2 = ev.detail.value;
    this.cab_form.controls['cab_dropoff'].setValue(ev.detail.value);
    this.searchPlaces2 = this.cab_form.get('cab_dropoff').value;
    this.searchPlaces2 = null;
    console.log(this.searchPlaces2);
  }



  searchSuggestions2(searchTerm2: string){
      this.capHttp.getPlace(searchTerm2).then( (res: any) => {
        //  console.log(res);
         this.searchPlaces2 = res.predictions;
         console.log(this.searchPlaces2);
      }).catch((err) => {
         console.log(err);
      });
  }




  dismiss(){
    this.cab_form.reset();
    this.formA = true;
    this.modalCtrl.dismiss({'cabBooking' : this.cabBookSubmit});
  }


}
