import { Component, OnInit } from '@angular/core';

import { HttpCapService } from 'src/app/services/http-cap.service';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {


  faqData: any;

  constructor(private capHttp: HttpCapService) { }


  getFaqData(){
    this.capHttp.getData('/get-faqs').then((res:any) => {  // console.log(res);
      if(res.status === "success"){ 
         this.faqData = res.data;
         console.log(this.faqData);
      }else{
        //  this.presentToast(res.message);
      }
    }).catch( err => { });
  }




  ngOnInit() {
    this.getFaqData();
  }

}
