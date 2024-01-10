import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, HttpResponse, HttpOptions } from '@capacitor-community/http';



@Injectable({
  providedIn: 'root'
})
export class HttpCapService {

    // public yourSiteUrl =  'https://www.purvankara.customerdevsites.com';
    // public yourSiteUrl =  'http://purva.customerdevsites.com';
    // public yourSiteUrl =  'https://schangler.in';
    public yourSiteUrl =  'https://cp.purvaconnect.com';
    public Baseurl: string = this.yourSiteUrl + '/api';
    // public Baseurl: string = this.yourSiteUrl;
  
    constructor(private platform: Platform) { }
  
  
    postData(Url, payload, token = '') {
  
      let nativeHeaders;
      if(token === '') {
          nativeHeaders = {
             'Content-Type': 'application/json', 
             'Access-Control-Allow-Origin': '*', 
          };
      }else {
          nativeHeaders = {
             'Content-Type': 'application/json', 
             'Access-Control-Allow-Origin': '*',
             'Authorization': `Bearer ${token}`
          };
      }
  
  
       console.log('BaseURL' +this.Baseurl+Url);
        return new Promise(resolve => {
            if(this.platform.is('ios') || this.platform.is('android')) {
              Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, 
                            headers: nativeHeaders }).then(data => {
                  console.log(data);
                  resolve(data.data);              
              }, (er) => {
                  console.log(er);
                  resolve(er);
              }).catch(err => {
                  console.log(err);
                  resolve(err);
              });            
            } else {
              Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, 
                            headers: nativeHeaders }).then(data => {
                  resolve(data.data);
              }, (er) => {
                   console.log(er);
                   resolve(er);
              }).catch(err => {
                  console.log(err);
                  resolve(err);
              });
            }
        });
    }
  
  
    postFormData(Url, payload, token = '') {
      // CROS isssue comes when we using 'Content-Type': 'application/json' or 'enctype': 'multipart/form-data' 
      console.log('BaseURL' +this.Baseurl+Url);
      let nativeHeaders;
      if(token === '') {
          nativeHeaders = {
             'Content-Type': 'multipart/form-data', 
             'Access-Control-Allow-Origin': '*', 
          };
      }else {
          nativeHeaders = {
             'Content-Type': 'multipart/form-data', 
             'Access-Control-Allow-Origin': '*',
             'Authorization': `Bearer ${token}`
          };
      }
  
        return new Promise(resolve => {  
            if(this.platform.is('ios') || this.platform.is('android')) {
              Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, 
                            headers: nativeHeaders }).then(data => {
                  console.log(data);
                  resolve(data.data);              
              }, (er) => {
                  // console.log(er);
                  resolve(er);
              }).catch(err => {
                  console.log(err);
                  resolve(err);
              });              
            } else {
              Http.request({url: this.Baseurl+Url,  method: 'POST', data: payload, 
                            headers: nativeHeaders }).then(data => {
                              console.log(data)
                  // resolve(data.data);
              }, (er) => {
                   console.log(er);
                   resolve(er);
              }).catch(err => {
                console.log(err)
                  console.log(err);
                  resolve(err);
              });
            }
        });
    }
    


  async register(payload) {
    
      let nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'mode': 'no-cors'
      };

      // 'Content-Type': 'multipart/form-data', 
      // 'Content-Type': 'application/json', 
  
      // console.log(payload);
      // console.log(JSON.stringify(payload));

      const res = await fetch(this.Baseurl+ "/register", {method: 'POST', headers: nativeHeaders, body: JSON.stringify(payload)});
      console.log(res);
      const finalRes = await res.json();
      console.log(finalRes);
      return finalRes;
  }


  
    getData(Url,token = '') {
      
      let nativeHeaders;
  
      if(token === '') {
          nativeHeaders = {
             'Content-Type': 'multipart/form-data', 
             'Access-Control-Allow-Origin': '*', 
          };
      }else {
          nativeHeaders = {
             'Content-Type': 'multipart/form-data', 
             'Access-Control-Allow-Origin': '*',
             'Authorization': `Bearer ${token}`
          };
      }
  
      return new Promise(resolve => { 
        Http.request({url: this.Baseurl+Url,  method: 'GET', headers: nativeHeaders }).then(data => {
            // console.log(data);
            // const d = JSON.parse(data.data);
            resolve(data.data);
  
        }).catch(error => {
            console.log(error);
            // const er = JSON.parse(error.error);
            resolve(error);
        });
      })
    }
  

    getPlace(query: string) {
    
      let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query + '&types=geocode&components=country:IN&key=AIzaSyCtZNVT318F-HYweBrZWJBM5k0KgSiMDKc';

      let nativeHeaders = {
             'Content-Type': 'multipart/form-data', 
             'Access-Control-Allow-Origin': '*', 
          };
     
      return new Promise(resolve => { 
        Http.request({url: url,  method: 'GET', headers: nativeHeaders }).then(data => {
            // console.log(data);
            resolve(data.data);  
        }).catch(error => {
            // console.log(error);
            resolve(error);
        });
      })
    }
}
