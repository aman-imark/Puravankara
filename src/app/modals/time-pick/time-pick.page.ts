import { Component, OnInit, Input, Type } from '@angular/core';

import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-time-pick',
  templateUrl: './time-pick.page.html',
  styleUrls: ['./time-pick.page.scss'],
})
export class TimePickPage implements OnInit {

  @Input('type') type;
  @Input('val') val;

  date: Date = new Date();
  minDate : any;
  maxDate: any;
  selectedTimeValue: any;

  constructor(private modalCtrl: ModalController) { }



  ionViewWillEnter(){
    console.log(this.type + this.val);   
    this.selectedTimeValue = this.val;
  }


  setTime(){
     this.selectedTimeValue;
     console.log(this.selectedTimeValue);
     if(this.selectedTimeValue){
      this.modalCtrl.dismiss({'timeValue' : this.selectedTimeValue});
     }
  }


  

  dismiss(){
    this.modalCtrl.dismiss();
  }



  ngOnInit() {
  }

}
