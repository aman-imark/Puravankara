import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ResponseMsgService } from 'src/app/services/response-msg.service';



@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.page.html',
  styleUrls: ['./select-role.page.scss'],
})
export class SelectRolePage implements OnInit {

  role: string;    // [{1= proprietor,  2=sales member}]


  constructor(private router: Router, private resMsg: ResponseMsgService) { }


  signupRoleValue(ev){
     this.role = ev.detail.value;
  }


  goto_signupForm(){
    if(this.role){
      this.router.navigate(['/termsb'],  {queryParams: {'role': this.role}});
      // this.router.navigate(['/declarations'],  {queryParams: {'role': this.role}});

      // this.router.navigate(['/signup'],  {queryParams: {'role': this.role}});

    }else{
      this.resMsg.presentToast('Required : Please select any one role!', 2000, 'bottom');
    }
  }


  ngOnInit() {
  }

}
