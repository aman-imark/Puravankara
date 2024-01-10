import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  userRole: any;
  userToken: any;

  constructor(private checkStr: StorageService) {}


  ionViewWillEnter(){
    this.get_userData();
  }


  
  get_userData(){
    this.checkStr.getStore('userData').then((data: any) => {
      // console.log(data);
      if(data !== null || data !== '' || typeof(data) !== 'undefined'){
        if(data.token){
          this.userRole = data.role;
          this.userToken = data.token;
        }
      }else{
      }
    }).catch( err => {  });
  }


}
