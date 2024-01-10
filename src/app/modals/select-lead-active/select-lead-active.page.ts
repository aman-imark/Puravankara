import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-select-lead-active',
  templateUrl: './select-lead-active.page.html',
  styleUrls: ['./select-lead-active.page.scss'],
})
export class SelectLeadActivePage implements OnInit {
  @Input('lead_id') lead_id;

  userToken: any;

  daysForm : FormGroup;
  submitted: boolean = false;

  res_lead: boolean = false;
  res_message : string;


  constructor(private modalCtrl: ModalController, private checkStr: StorageService,
              private capHttp: HttpCapService, private fb: FormBuilder, private router: Router) { }



  ngOnInit() {
    this.daysForm = this.fb.group({
      days: ['', [Validators.required, Validators.pattern(/^(60|[1-5]?[0-9])$/)]]
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




  activeLeadSubmit(){
    if(this.daysForm.status == 'VALID'){
       let activeLeadData = {
        lead_id: this.lead_id, 
        days: this.daysForm.value.days,
       };
       this.capHttp.postData('/active-lead', activeLeadData, this.userToken).then( (res: any) => {
          console.log(res);
          if(res.status == 'success'){
            this.res_lead = true;
            this.res_message = res.msg;
            this.router.navigate(['/members-list']);
          }
       }).catch( (err) => { 
       });
    }else{
    }
  }




  dismiss(){
    this.res_lead = false;
    this.daysForm.reset();
    this.modalCtrl.dismiss();
  }


}
