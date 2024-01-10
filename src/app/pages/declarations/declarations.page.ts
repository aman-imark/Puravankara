import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ResponseMsgService } from 'src/app/services/response-msg.service';
import { Http, HttpResponse, HttpOptions } from '@capacitor-community/http';

import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.page.html',
  styleUrls: ['./declarations.page.scss'],
})
export class DeclarationsPage implements OnInit {


  isAnswer : boolean = false;
  isPdfFile : boolean = false;
  pdfFileName: string;
  pdfFileSize: string;
 
  pdfFileData: any;


  gstTitle = "You need to select any one option.";

  inputValue = '';
  predictions: any[] = [];


  constructor(private resMsgServ: ResponseMsgService, private ls: LoaderService) { }


  search(event: any) {
    this.inputValue = event.target.value;

    if (this.inputValue.length > 2) {
      this.getPredictions();
    } else {
      this.predictions = [];
    }
  }

  getPredictions() {
    const proxyUrl = 'http://localhost:8100'; // Replace with your proxy server URL

    const apiKey = 'AIzaSyCtZNVT318F-HYweBrZWJBM5k0KgSiMDKc';
    const input = encodeURIComponent(this.inputValue);
    console.log(input)
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${apiKey}`;
    const url = `${proxyUrl}/${apiUrl}`;



      // let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query + '&types=geocode&components=country:IN&key=AIzaSyCtZNVT318F-HYweBrZWJBM5k0KgSiMDKc';

      let nativeHeaders = {
             'Content-Type': 'multipart/form-data', 
             'Access-Control-Allow-Origin': '*', 
          };
     
      return new Promise(resolve => { 
        Http.request({url: apiUrl,  method: 'GET', headers: nativeHeaders }).then(data => {
            console.log(data);
        if (data.data.status === 'OK' && data.data.predictions) {
          this.predictions = data.data.predictions;
        }
            resolve(data.data);  
        }).catch(error => {
            console.log(error);
            resolve(error);
        });
      })
    


    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.status === 'OK' && data.predictions) {
    //       this.predictions = data.predictions;
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  selectPlace(prediction: any) {
    console.log(prediction);
    // Handle the selected place (e.g., use its details)
  }



  ngOnInit() {
  }

}
