import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { HttpCapService } from 'src/app/services/http-cap.service';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsPage implements OnInit {

  dym_content: any;

  constructor(private capHttp: HttpCapService) { }


    
  getTermsData(){
    this.capHttp.getData('/terms-condition').then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === "success"){ 
         this.dym_content = res.data;
         console.log(this.dym_content);
      }else{
        //  this.presentToast(res.message);
      }
    }).catch( err => { });
  }




  ngOnInit() {
    this.getTermsData();
  }

}
