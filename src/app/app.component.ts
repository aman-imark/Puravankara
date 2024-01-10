import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { MenuController, AlertController, ToastController } from '@ionic/angular';

import { NotificationsService } from './services/notifications.service';
import { StorageService } from './services/storage.service';
import { EventService } from './services/event.service';
import { Device } from '@capacitor/device';
import { LoaderService } from './services/loader.service';
import { Http, HttpDownloadFileResult } from '@capacitor-community/http';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';

import { HttpCapService } from 'src/app/services/http-cap.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  userRole;
  userRoleText;
  userEmail;
  userName;

  
 
  constructor(private router: Router, private menuCtrl: MenuController, private alertCtrl: AlertController, 
              private checkStr: StorageService, private toastCtrl: ToastController, private events: EventService,
              public pushNoti: NotificationsService, private ls: LoaderService,  private resMsgServ: ResponseMsgService,
              private capHttp: HttpCapService, private resMsg : ResponseMsgService, private platform: Platform) 
       
              
  {
    this.platform.ready().then(() => {
      // SplashScreen.show({
      //   showDuration: 2000,
      //   autoHide: true,
      // });
    
      // iOS only
      window.addEventListener('statusTap', function () {
        console.log('statusbar tapped');
      });

      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: '#ffffff' }); // Change to your desired color
      StatusBar.show();
      
      this.checkLogin();
      this.eventPublish(); 
      this.pushNoti.initPush();
    });
  }


  checkLogin(){
    this.checkStr.getStore('userData').then((data:any) => {   
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){  
          this.userRole = data.role;
          this.userRoleText = data.role_name;
          this.userEmail = data.email;   
          this.userName = data.name;

          this.checkUserTokenStatus(data.token);
          this.router.navigate(['main/tabs/tab1']);
          
          // if(data.role == '1'){
          //   this.userRoleText = "Proprietor/Organization"; // Admin(Organization)
          // }
          // if(data.role == '2'){
          //   this.userRoleText = "CP Representative"; // Sales Member 
          // }
          // if(data.role == '3'){
          //   this.userRoleText = "Administrator";   // Super Admin(Main)
          // }
        }else{ 
          this.goto_getStarted();
        }
      }else{ 
        this.goto_getStarted();
      }
    }).catch( err => { this.goto_getStarted(); });
  }




  eventPublish(){
    this.events.currentEvent.subscribe((data: any) => {
      console.log(data);
      if(data.token){   
        this.userRole = data.role;
        this.userRoleText = data.role_name;
        this.userEmail = data.email; 
        this.userName = data.name;

        this.router.navigate(['main/tabs/tab1']);
        
        // if(data.role == '1'){
        //   this.userRoleText = "Proprietor/Organization"; // Admin(Organization)
        // }
        // if(data.role == '2'){
        //   this.userRoleText = "CP Representative"; // Sales Member 
        // }
        // if(data.role == '3'){
        //   this.userRoleText = "Administrator";   // Super Admin(Main)
        // }
      }else{ 
        this.goto_getStarted();
      }
    }); 
  }



  checkUserTokenStatus(token){
    // console.log(token);
    this.capHttp.postData('/check-token', '', token).then((res:any) => {  
      // console.log(res); 
      if(res.status === "success"){ 
        if(res.msg === "true"){
           this.router.navigate(['main/tabs/tab1']);
        }else if(res.msg === "false"){
          this.deleteAlert();
        }
      }else{
        this.resMsg.presentToast(res.status+': '+res.msg , 2000, 'bottom');
      }
    }).catch( err => {
      this.resMsg.presentToast(err , 2000, 'bottom');
    });
  }



  async deleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'User Deleted!',
      message: '<p>Your account is deleted by Admin, please contact admin for more info.</p>',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.logout();
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }





  goto_getStarted(){
    this.router.navigate(['get-started']);
  } 


  goto_faqs(){
    this.router.navigate(['/faq']);
    this.menuCtrl.close('guest');
  }


  goto_support(){
    this.router.navigate(['support']);
    this.menuCtrl.close('guest');
  }


  goto_terms(){
    this.downloadTermsDoc();
    // this.router.navigate(['/terms']);
    this.menuCtrl.close('guest');
  }

  goto_termsB(){
    this.router.navigate(['/termsb']);
    this.menuCtrl.close('guest');
  }

  goto_detailVerify(){
    this.router.navigate(['/detail-verify']);
    this.menuCtrl.close('guest');
  }
  
  goto_memberList(){
    this.router.navigate(['/members-list']);
    this.menuCtrl.close('guest');
  }

  goto_memberListB(){
    this.router.navigate(['/members-list-b']);
    this.menuCtrl.close('guest');
  }

  goto_cabBookingList(){
    this.router.navigate(['/cab-booking-list']);
    this.menuCtrl.close('guest');
  }



  async downloadTermsDoc(){
    this.ls.showLoader();
    // const docUrl = 'https://cp.purvaconnect.com/files/Channel%20Partner%20Agreements%20-%20PHL%2007%2002%202023%20(1).docx';
    // const docUrl = 'https://cp.purvaconnect.com/files/terms-and-condition.docx';
    // const docUrl = 'https://cp.purvaconnect.com/files/terms-and-condition.docx';
    const docUrl = 'https://cp.purvaconnect.com/files/terms-and-condition.docx';

    
    await Browser.open({ url: docUrl });
    this.ls.hideLoader();
  }





  async ask_logoutConfirm(){
    this.menuCtrl.close('guest');
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }, {
          text: 'Logout',
          id: 'confirm-button',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    await alert.present();  
  }




  logout() {
    this.checkStr.removeStore('userData');
    // this.checkStr.clear();
    setTimeout(() => {
      this.checkLogin();
      this.presentToast('Logout successfull.')
    }, 1000);
  };


  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });

    await toast.present();
  }

}
