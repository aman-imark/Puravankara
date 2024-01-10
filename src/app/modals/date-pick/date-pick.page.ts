import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-pick',
  templateUrl: './date-pick.page.html',
  styleUrls: ['./date-pick.page.scss'],
})
export class DatePickPage implements OnInit {

  @Input('val') val;

  

  currentDate = new Date();
  minDate : any;
  maxDate: any;
  selectedDateValue: any;


  constructor(private modalCtrl: ModalController) { }



  ionViewWillEnter(){
   console.log('Val:' + this.val);

    this.selectedDateValue = this.val;
    console.log('defe  ' + this.selectedDateValue);
    
    const minDateVal = new Date(this.val);
    this.minDate = minDateVal.toISOString();
    console.log(this.minDate);

  this.currentDate.setFullYear(this.currentDate.getFullYear() + 5);
  this.maxDate = this.currentDate.toISOString();
  console.log(this.maxDate);


    // this.currentDate.setFullYear(this.currentDate.getFullYear() - 2);

    // this.maxDate  =  this.currentDate.setFullYear(this.currentDate.getFullYear() + 2);
    // this.maxDate = this.maxDate.toISOString();
    // console.log(this.maxDate);
  }



  setDate(){
     this.selectedDateValue;
     console.log(this.selectedDateValue);
     if(this.selectedDateValue){
      this.modalCtrl.dismiss({'dateValue' : this.selectedDateValue});
     }
  }




  dismiss(){
    this.modalCtrl.dismiss();
  }



  ngOnInit() {
  }

}
