import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-explore-residential',
  templateUrl: './explore-residential.page.html',
  styleUrls: ['./explore-residential.page.scss'],
})
export class ExploreResidentialPage implements OnInit {

  cityData: any;
  cityValue;

  constructor(private router: Router, private capHttp: HttpCapService, private resMsg: ResponseMsgService,
    public ls: LoaderService) { }

  
 
  ionViewWillEnter(){
    // this.getCities();
  }




  radioValueSelect(ev){
    this.cityValue = ev.detail.value;
  }



  getCities(){
    this.ls.showLoader();
    this.capHttp.getData('/cities').then((res:any) => {   console.log(res);  
      this.ls.hideLoader();
      if(res.status === "success"){ 
        this.cityData = res.data;
      }
    }).catch( err => {
      this.ls.hideLoader();
    });
  }





  goto_residentialDetails(){
    if(this.cityValue){
      this.router.navigate(['/residential-details'], {queryParams: {cityId: this.cityValue}});
    }else{
      this.resMsg.presentToast('Please select any city!', 2000, 'bottom');
    }
  }
 

  ngOnInit() {
    this.getCities();
  }

}
