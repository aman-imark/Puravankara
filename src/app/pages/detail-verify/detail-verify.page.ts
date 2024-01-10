import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';

import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

import { removeSpaces } from 'src/app/customValidator';
import { SpaceValidator } from 'src/app/customValidator';


@Component({
  selector: 'app-detail-verify',
  templateUrl: './detail-verify.page.html',
  styleUrls: ['./detail-verify.page.scss'],
})
export class DetailVerifyPage implements OnInit {

  role: string;

  reraForm: FormGroup;
  submitted: boolean = false;



  constructor(private router: Router, private capHttp: HttpCapService, private formBuilder: FormBuilder, 
    private resMsg : ResponseMsgService, private checkStr: StorageService, private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.role = params.role;
    });

    this.reraForm = this.formBuilder.group({
      rera_num: ["PRM/KA/RERA/1251/446/AG/171201/001619", [Validators.required, 
        SpaceValidator.cannotContainSpace, 
        Validators.pattern(/^[A-Z]{3}\/[A-Z]{2}\/RERA\/[0-9]{4}\/[0-9]{3}\/[A-Z]{2}\/[0-9]{6}\/[0-9]{6}$/),
        // Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
      ]]
    });
  }



  
  get f() {
    return this.reraForm.controls;
  }

  

  reraContinue(){
      this.submitted = true;

      console.log(this.reraForm.status);
      if(this.reraForm.status == "INVALID"){
        // this.resMsg.presentToast('Please fill the Rera Number' , 2000, 'bottom');
      }else if(this.reraForm.status == "VALID"){
        this.router.navigate(['/signup'],  {queryParams: {'role': this.role, 'rera_number': this.reraForm.value.rera_num}});
      }else{
        // this.resMsg.presentToast('Please fill the Rera Number' , 2000, 'bottom');
      }
  }



}
