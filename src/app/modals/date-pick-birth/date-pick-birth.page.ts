import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-pick-birth',
  templateUrl: './date-pick-birth.page.html',
  styleUrls: ['./date-pick-birth.page.scss'],
})
export class DatePickBirthPage implements OnInit {

  @Input('val') val;

  currentDate = new Date();
  maxDate: any;

  selectedDateValue: any;


  constructor(private modalCtrl: ModalController) { }



  ionViewWillEnter(){
    this.selectedDateValue = this.val;
    this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
    this.maxDate = this.currentDate.toISOString();
    console.log(this.maxDate);
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
