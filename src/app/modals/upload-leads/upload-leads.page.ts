import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { HttpCapService } from 'src/app/services/http-cap.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

import { HttpClient } from '@angular/common/http';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Browser } from '@capacitor/browser';

import { Http } from '@capacitor-community/http';

import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { LoaderService } from 'src/app/services/loader.service';
import { FileUplaodService } from 'src/app/services/file-uplaod.service';


@Component({
  selector: 'app-upload-leads',
  templateUrl: './upload-leads.page.html',
  styleUrls: ['./upload-leads.page.scss'],
})

export class UploadLeadsPage implements OnInit {

 isCsvFile : boolean = false;
 csvFileName: string;
 csvFileSize: string;

 csvFileData: any;

 selectedFile;

  constructor(private modalCtrl: ModalController, private capHttp: HttpCapService, 
              private http: HttpClient, private resMsgServ: ResponseMsgService, private ls: LoaderService,
              private fileUploadService: FileUplaodService) { }



  ngOnInit() {
  }


  ionViewWillEnter(){
    const selectFileButton = document.getElementById('select-file');
    // const fileInput = document.getElementById('file-input');
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    selectFileButton.addEventListener('click', function() {
      console.log(fileInput)
      fileInput.click();

      // this.uploadFile(fileInput)
    });
  }



  dismiss(){
    this.modalCtrl.dismiss()
  }




  async csvFormatDownload(){ 
    this.ls.showLoader();
    const csvURL = 'https://cp.purvaconnect.com/files/purvankara_csv.csv';
    
    await Browser.open({ url: csvURL });
    this.ls.hideLoader();


    // Http.downloadFile({
    //   url: csvURL,
    //   filePath: 'sample.csv',
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'text/csv',   //  for csv file download        
    //   }
    // }).then(data => {
    //    this.ls.hideLoader();
    //    if(data.path){
    //      console.log(data);

    //      this.ls.hideLoader();
    //      alert('Success:  '+JSON.stringify(data));
    //      //  if(data.path){
    //      //    console.log(data);
    //      this.resMsgServ.presentToast('File Successfully Download.', 2000, 'bottom');        
    //      // { "path": "/storage/emulated/0/Documents/dummy.pdf" }
    //    }
    // }).catch(error => {
    //    console.log(error);
    //    this.ls.hideLoader();
    //    //  alert('error');
    //     alert(JSON.stringify(error));  
    // });

  }





  // async onFileSelected(event) {
  //   const file: File = event.target.files[0];
  //   // console.log(event.target.files[0].name);
  //   // console.log(event.target.files[0].type);
  //   console.log(file);

  //   if(event.target.files[0].type === 'text/csv'){
  //      this.isCsvFile = true;
  //      this.csvFileName = event.target.files[0].name;
  //      this.csvFileSize = event.target.files[0].size;
  //   }else{
  //      this.resMsgServ.presentToast('File type not supported!', 2000, 'bottom')
  //   }


  //   Filesystem.readFile({ 
  //     path: event.target.files[0].name,
  //     directory: Directory.Documents,
  //     encoding: Encoding.UTF8

  //   }).then( (data: any) => {
  //      console.log(data);
  //      this.csvFileData = data.data;
       
  //      this.csvFileDataUpload(data.data);
  //   });
  //   // Upload the file to the server
  //   // this.csvFileDataUpload(event.target.files[0].name, fileContents);
  // }



  // async csvFileDataUpload(data){
  //   console.log(data);
  //   this.ls.showLoader();
  //   const url = 'https://cp.purvaconnect.com/api/upload-csv';
  //   const headers = { 'Content-Type': 'text/csv' };

  //   Http.post({ url, headers, data }).then( (res: any) => {
  //      console.log(res);
  //      this.ls.hideLoader();
  //      alert('File uploaded successfully. '+JSON.stringify(res));
  //   }).catch(error => {
  //      console.log('Failed to upload file. ', error);
  //      this.ls.hideLoader();
  //      alert('Failed to upload file. '+ JSON.stringify(error));
  //   });
  // }



  onFileSelected2(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log()
  }

  async csvFileDataUpload2(): Promise<void> {
    if (this.selectedFile) {
      await this.fileUploadService.uploadCSVFile(this.selectedFile);
    } else {
      console.error('Please select a file to upload.');
    }
  }

  onFileSelectedJJ(event: any): void {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      this.readCSVFile(file);
    } else {
      console.error('Please select a file to convert.');
    }
  }

  async readCSVFile(file: File): Promise<void> {
    try {
      const result = await Filesystem.readFile({
        path: file.name,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      console.log(result);
       
      const csvData = result.data;
      const jsonArray = this.csvToJson(csvData);

      console.log(jsonArray); // This will log the converted JSON array to the console.
    } catch (error) {
      console.error('Error while reading the CSV file:', error);
    }
  }

  csvToJson(csvData: string): any[] {
    const lines = csvData.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      result.push(obj);
    }

    return result;
  }

  // convertCSVToJson(file: File): void {
  //   console.log(file);
  //   const reader = new FileReader();
  //   console.log(reader);
  //   reader.onload = (event) => {
  //     const csvData: any = event.target.result;
  //     console.log(csvData);
  //     const jsonArray = this.csvToJson(csvData);
  //     console.log(jsonArray); // This will log the converted JSON array to the console.
  //   };

  //   reader.readAsText(file);
  // }

  // csvToJson(csvData: string): any[] {
  //   const lines = csvData.split('\n');
  //   const result = [];
  //   const headers = lines[0].split(',');

  //   for (let i = 1; i < lines.length; i++) {
  //     const obj = {};
  //     const currentLine = lines[i].split(',');

  //     for (let j = 0; j < headers.length; j++) {
  //       obj[headers[j]] = currentLine[j];
  //     }

  //     result.push(obj);
  //   }

  //   return result;
  // }




  async uploadFile(file: File) {
    const fileName = file.name;
    const fileContents = await this.readFile(file);
    const path = `${Directory.Data}/${fileName}`;
  
    await Filesystem.writeFile({
      path,
      data: fileContents,
      directory: Directory.Data
    });
  
    // Do something with the uploaded file
  }
  
  async readFile(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result as string);
      };
  
      reader.onerror = reject;
  
      reader.readAsText(file);
    });
  }
  
}
