import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services//storage.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  supportForm: FormGroup;
  thankuCard: boolean = false;

  constructor(private router: Router, private capHttp: HttpCapService, private checkStr: StorageService,
    private resMsg: ResponseMsgService, public ls: LoaderService,
    private formBuilder: FormBuilder, private toastController: ToastController)

    {  
      this.supportForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required],
      });
    }





  async supportDataSubmit(){
    console.log(this.supportForm);

    if(this.supportForm.status === "INVALID"){
      this.resMsg.presentToast('Incomplete: Please fill all the required fields!' , 2000, 'bottom');
    }else if(this.supportForm.valid){
      this.ls.showLoader();
      this.capHttp.postData('/support', this.supportForm.value, '').then((res:any) => {   console.log(res);   
        this.ls.hideLoader();
        if(res.status === "success"){
          this.resMsg.presentToast(res.msg, 2000, 'bottom');
          this.supportForm.reset();
          this.thankuCard = true;
        }
      }).catch( err => {
      })

    }else{
      this.resMsg.presentToast('Error: Something is Wrong!' , 2000, 'bottom');
    }
  }


  ngOnInit() {
  }

}
