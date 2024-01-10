import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage.service';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ResponseMsgService } from 'src/app/services/response-msg.service';


@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
  @Input('project_id') project_id ;

  userToken: any;

  shareForm : FormGroup;
  submitted: boolean = false;

  constructor(private modalCtrl: ModalController, private checkStr: StorageService,
              private capHttp: HttpCapService, private fb: FormBuilder, private resMsg: ResponseMsgService) { }

  ngOnInit() {
    this.shareForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
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




  shareBrochure(){
    if(this.shareForm.status == 'VALID'){
       let shareData = {
        project_id: this.project_id, 
        email: this.shareForm.value.email,
       };
       this.capHttp.postData('/share', shareData, this.userToken).then( (res: any) => {
          console.log(res);
          if(res.status == 'success'){
            this.dismiss();
            this.resMsg.presentToast(res.msg , 2000, 'bottom');
          }
       }).catch( (err) => { 
       });
    }else{
       this.resMsg.presentToast('Please fill form Correctly!' , 2000, 'bottom');
    }
  }




  dismiss(){
    this.shareForm.reset();
    this.modalCtrl.dismiss();
  }


}
