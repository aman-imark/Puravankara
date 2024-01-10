import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  forgotForm: FormGroup;
  submitted: boolean = false;

  resetPasswordLink: string;

  constructor(private router: Router, private capHttp: HttpCapService, private formBuilder: FormBuilder, 
    private resMsg : ResponseMsgService, private checkStr: StorageService, public ls: LoaderService) { }


  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],    
    });
  }



  
  get f() {
    return this.forgotForm.controls;
  }


  forgotPassword(){
    this.submitted = true;
    if(this.forgotForm.status == "INVALID"){
      this.resMsg.presentToast('Please fill all the details Correctly!' , 2000, 'bottom');
    }else if(this.forgotForm.status == "VALID"){
      this.ls.showLoader();
      this.capHttp.postFormData('/forgot-password', this.forgotForm.value).then((res:any) => {   console.log(res);  
        this.ls.hideLoader();
        if(res.status === "success"){ 
          // setTimeout( () => {
          //   this.router.navigate(['login']);
          // }, 2000)
          this.forgotForm.reset();
      
          this.resetPasswordLink = res.link;
          this.resMsg.presentToast('Success : '+res.msg , 2000, 'bottom');
        }else{
          this.resMsg.presentToast(res.status+': '+res.msg , 2000, 'bottom');
        }        
      }).catch( err => {
      });
    }else{
    }
}



}
