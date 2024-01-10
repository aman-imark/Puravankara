import { Component, OnInit } from '@angular/core';

import { ViewEncapsulation } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-termsb',
  templateUrl: './termsb.page.html',
  styleUrls: ['./termsb.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsbPage implements OnInit {

  role: string;
  dym_content: any;

  isChecked;

  constructor(private capHttp: HttpCapService, private resMsg: ResponseMsgService, 
              private ls: LoaderService, private router: Router, private activatedRoute: ActivatedRoute) { }




  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (params) => {
      this.role = params.role;
    })
    this.getSignup_TermsData();
  }
                 
    
  getSignup_TermsData(){
    this.ls.showLoader();
    this.capHttp.getData('/signup-terms-condition').then((res:any) => {  // console.log(res);
      this.ls.hideLoader();
      if(res.status === "success"){ 
         this.dym_content = res.data;
      }
    }).catch( err => { });
  }


  goto_next(){
    if(this.isChecked === true){
        this.router.navigate(['/signup'],  {queryParams: {'role': this.role}});
        // this.router.navigate(['/detail-verify'],  {queryParams: {'role': this.role}});
    }else{
        this.resMsg.presentToast('Please accept the Terms & Conditions', 1000, 'bottom');
    }
  }

}
