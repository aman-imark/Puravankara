import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/services/storage.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private checkStr: StorageService) { }


  ionViewWillEnter(){
    this.checkLogin();
  }

  checkLogin(){
    this.checkStr.getStore('userData').then((data:any) => {   
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
            this.router.navigate(['main/tabs/tab1']);
        }else{ 
          this.goto_getStarted();
        }
      }else{ 
        this.goto_getStarted();
      }
    }).catch( err => { this.goto_getStarted(); });
  }
 


  goto_getStarted(){
     this.router.navigate(['get-started']);
  }


  ngOnInit() {
    setTimeout( () => {
      this.checkLogin();
    }, 2000);
  }


}
