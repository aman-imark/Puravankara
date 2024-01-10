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
  selector: 'app-book-site-visit',
  templateUrl: './book-site-visit.page.html',
  styleUrls: ['./book-site-visit.page.scss'],
})
export class BookSiteVisitPage implements OnInit {

  @Input('name') name;
  @Input('lead_id') lead_id;
  @Input('createDate') createDate;


  userToken: any;
  formA: boolean = true;

  titleText: string;


  site_visit_form : FormGroup;
  date_setVal;
  selectedTimeValue;

  siteVisitData: boolean = false;



  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private datePipe: DatePipe, private ls: LoaderService,
              private capHttp: HttpCapService, private checkStr: StorageService, private resMsg: ResponseMsgService) 
  
  { this.titleText = 'Select Date & Time'; }


  ngOnInit() {
    this.site_visit_form = this.fb.group({
      lead_id: [this.lead_id, [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
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
        componentProps : {'val': this.createDate},
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
            this.site_visit_form.controls['date'].setValue(selectedDateB);
        }
      });
      return await modal.present();
  }




  async timeSelectModal(){
      const modal = await this.modalCtrl.create({
        component : TimePickPage,
        componentProps : {'val': ''},
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
            this.date_setVal = selectedDate;
            this.site_visit_form.controls['time'].setValue(selectedDateB);
        }
      });
      return await modal.present();
  }
  






  siteVisitSubmit(){
    console.log(this.site_visit_form.value);
    this.ls.showLoader();
  
    if(this.site_visit_form.status == 'VALID'){
    this.capHttp.postData('/site-visit', this.site_visit_form.value, this.userToken).then( (res: any) => {
      console.log(res);
      this.ls.hideLoader();
      if(res.status == 'success'){
        this.siteVisitData = true;
        this.dismiss();
        this.resMsg.presentToast(res.msg , 2000, 'bottom');
      }
    }).catch( (err) => {
      this.resMsg.presentToast(err , 2000, 'bottom');
    });
    }else{
       this.resMsg.presentToast('Please fill form Correctly!' , 2000, 'bottom');
    }


  }





  dismiss(){
    this.site_visit_form.reset();
    this.formA = true;
    this.modalCtrl.dismiss({'siteVistData' : this.siteVisitData});
  }


}
