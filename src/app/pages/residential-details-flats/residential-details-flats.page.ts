import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { SharePage } from 'src/app/modals/share/share.page';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';

import { Http, HttpDownloadFileResult } from '@capacitor-community/http';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loader.service';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-residential-details-flats',
  templateUrl: './residential-details-flats.page.html',
  styleUrls: ['./residential-details-flats.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResidentialDetailsFlatsPage implements OnInit {

  segmentPlan;
  segmentAmenities: string;

  userToken;
  projectId: string;

  projectData;
  planData: any[];
  planDataA: any[];
  planDataB: any[];
  galleryData: any[];
  videosData: any[];
  indoorData: any[];
  outdoorData: any[];

  brouchreUrl: string;


  constructor(private router: Router, private activatedRoute : ActivatedRoute, public domSanitizer: DomSanitizer, private resMsgServ: ResponseMsgService,
    private capHttp: HttpCapService, private checkStr: StorageService, private modalCtrl: ModalController, private ls: LoaderService) 
    
  { 
    this.segmentPlan = "1";
    this.segmentAmenities = "1";
  }


  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.queryParamMap.get('projectId');
  }


  ionViewWillEnter(){
    this.getUser();
  }



  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getProjectsDetails(this.userToken);
           this.getBrouchreFile(this.userToken);
        }
      }
    }).catch( err => {  });
  }




  getProjectsDetails(token){
    this.ls.showLoader();
    this.capHttp.postData('/project-details', {project_id : this.projectId}, token).then((res:any) => {   console.log(res);   
      this.ls.hideLoader();
      if(res.status === "success"){ 
        this.projectData = res.data;
        this.planData = res.data.floorplan;
          this.planDataA = Object.keys(this.planData);
          this.planDataB = Object.values(this.planData);
        this.galleryData = res.data.gallery_image;
        this.videosData = res.data.videos;
        this.indoorData = res.data.indoor_amenities;
        this.outdoorData = res.data.outdoor_amenities;
      }
    }).catch( err => {
      this.ls.hideLoader();
    })
  }



  getBrouchreFile(token){
    this.capHttp.postData('/download-brochure', {project_id : this.projectId}, token).then((res:any) => {  
      console.log(res);  
      // {
      //   file: "https://cp.purvaconnect.com/files/brochure/1673346494_Park Hill E-Brochure.pdf"
      //   status: "success"
      // } 

      if(res.status === "success"){ 
        if(res.file){
            this.brouchreUrl = res.file;
        }else{
            this.resMsgServ.presentToast('File not found on server!', 2000, 'bottom');
        }
      }
    }).catch( err => {
    })
  }



  onSegmentChanged(event){
    // console.log(event.detail.value);
    // console.log(this.segmentPlan);
  }



  amenitiesSegment(event){
    // console.log(event);
  }
  
  async  downloadBrochure2(): Promise<void> {
    let url: string = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    let filename: string = 'dummy.pdf';
    try {
      // Download the file
      const response = await Http.downloadFile({
        url: url,
        filePath: filename
      });
      console.log(response);
  
      // Get the file data
      // const data = response.data;
      // console.log(data);
  
      // Save the file to the device's Downloads directory
      // const savedFile = await Filesystem.writeFile({
      //   path: filename,
      //   data: data,
      //   directory: Directory.Downloads
      // });
  
      // console.log(savedFile);
      // console.log('File saved at:', savedFile.uri);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }





  
  async downloadBrochure(){
    // const url = 'https://example.com/myfile.pdf'; // replace with your PDF file URL
    // const response = await HTTP.downloadFile({ url });
    // const blob = new Blob([response.data], { type: 'application/pdf' });
    // const fileName = 'myfile.pdf'; // replace with the desired file name

    // const savedFile = await Filesystem.writeFile({
    //   path: fileName,
    //   data: blob,
    //   directory: Directory.Downloads
    // });
    // console.log('File saved at:', savedFile.uri);

    // this.ls.showLoader();
    // await Http.downloadFile({
    //   url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    //   filePath: 'dummy.pdf',
    //   fileDirectory: Directory.Documents,
    //   responseType: 'blob',
    //   progress: true,
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/pdf', //  for pdf file download   
       
    //   }
    // }).then(async res => {
    //   console.log(res)

    //   const savedFile = await Filesystem.writeFile({
    //     path: 'dummy.pdf',
    //     data: res.path,
    //     directory: Directory.Documents
    //   });

    //   console.log(savedFile);
    //   //  alert('data');
    //   //  alert(JSON.stringify(data));
    //   //  this.ls.hideLoader();
    //   //  if(data.path){
    //   //    console.log(data);
    //   //    this.resMsgServ.presentToast('File Successfully Download.', 2000, 'bottom');
    //   //    // { "path": "/storage/emulated/0/Documents/dummy.pdf" }
    //   //  }
    // }).catch(error => {
    //   //  alert('error');
    //   //  alert(JSON.stringify(error));
    //   //  this.ls.hideLoader();
    //    console.log(error);
    // });




    this.ls.showLoader();
    await Http.downloadFile({
      url: this.brouchreUrl,
      filePath: 'brochure.pdf',
      fileDirectory: Directory.Documents,
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf', //  for pdf file download        
      }
    }).then(data => {
      //  alert('data');
      //  alert(JSON.stringify(data));
       this.ls.hideLoader();
       if(data.path){
         console.log(data);
         this.resMsgServ.presentToast('File Successfully Download.', 2000, 'bottom');
         // { "path": "/storage/emulated/0/Documents/dummy.pdf" }
       }
    }).catch(error => {
       alert('error');
       alert(JSON.stringify(error));
       this.ls.hideLoader();
       console.log(error);
    });

    this.ls.showLoader();
    // const docUrl = 'https://cp.purvaconnect.com/files/Channel%20Partner%20Agreements%20-%20PHL%2007%2002%202023%20(1).docx';
    // const docUrl = 'https://cp.purvaconnect.com/files/terms-and-condition.docx';
    const docUrl = 'https://cp.purvaconnect.com/files/terms-and-condition.docx';

    
    await Browser.open({ url: docUrl });
    this.ls.hideLoader();
  }




  async openShare(){
    const modal = await this.modalCtrl.create({  
      component: SharePage,
      componentProps: {project_id: this.projectId},
      animated: true,
      backdropDismiss: false,
      cssClass: 'center-modals',
      mode: 'md'
    });  
    return await modal.present();  
  }



}
