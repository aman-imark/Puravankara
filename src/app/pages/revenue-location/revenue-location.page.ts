import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from "src/app/services/loader.service";


@Component({
  selector: 'app-revenue-location',
  templateUrl: './revenue-location.page.html',
  styleUrls: ['./revenue-location.page.scss'],
})
export class RevenueLocationPage implements OnInit {

  userToken;

  location_id: string;
  location_name: string;
  otherRevenue: string;

  public show: boolean = false;

  revenueData: any;

  // revenueData = [
  //   {
  //     sn: "1",
  //     invoiceNo: "BEPL/03-22-002",
  //     customerName: "Deep Biwas",
  //     userData: {
  //        avatarImg: "https://ionicframework.com/docs/img/demos/avatar.svg",
  //        name: "David Smith", 
  //        city: "Bangalore",
  //        email: "david@info.com",
  //        phone: "+91 9655667023",
  //        otherA: "Purva Atmosphere",
  //        otherB: "Tivoli/T/205",
  //        revenue: "INR 16,31,25,000",
  //        leadBy: "Lead by: The Property Investors Alliance",
  //        brandName: "Brand Name: Purva Land"
  //     },
  //     show: false
  //   },
  //   {
  //     sn: "2",
  //     invoiceNo: "BEPL/03-22-002",
  //     customerName: "Deep Biwas",
  //     userData: {
  //        avatarImg: "https://ionicframework.com/docs/img/demos/avatar.svg",
  //        name: "Peter Smith", 
  //        city: "Bangalore",
  //        email: "david@info.com",
  //        phone: "+91 9655667023",
  //        otherA: "Purva Atmosphere",
  //        otherB: "Tivoli/T/205",
  //        revenue: "INR 16,31,25,000",
  //        leadBy: "Lead by: The Property Investors Alliance",
  //        brandName: "Brand Name: Purva Land"
  //     },
  //     show: false
  //   },
  //   {
  //     sn: "3",
  //     invoiceNo: "BEPL/03-22-002",
  //     customerName: "Deep Biwas",
  //     userData: {
  //        avatarImg: "https://ionicframework.com/docs/img/demos/avatar.svg",
  //        name: "David Smith", 
  //        city: "Bangalore",
  //        email: "david@info.com",
  //        phone: "+91 9655667023",
  //        otherA: "Purva Atmosphere",
  //        otherB: "Tivoli/T/205",
  //        revenue: "INR 16,31,25,000",
  //        leadBy: "Lead by: The Property Investors Alliance",
  //        brandName: "Brand Name: Purva Land"
  //     },
  //     show: false
  //   },
  //   {
  //     sn: "4",
  //     invoiceNo: "BEPL/03-22-002",
  //     customerName: "Deep Biwas",
  //     userData: {
  //        avatarImg: "https://ionicframework.com/docs/img/demos/avatar.svg",
  //        name: "David Smith", 
  //        city: "Bangalore",
  //        email: "david@info.com",
  //        phone: "+91 9655667023",
  //        otherA: "Purva Atmosphere",
  //        otherB: "Tivoli/T/205",
  //        revenue: "INR 16,31,25,000",
  //        leadBy: "Lead by: The Property Investors Alliance",
  //        brandName: "Brand Name: Purva Land"
  //     },
  //     show: false
  //   },
  //   {
  //     sn: "5",
  //     invoiceNo: "BEPL/03-22-002",
  //     customerName: "Deep Biwas",
  //     userData: {
  //        avatarImg: "https://ionicframework.com/docs/img/demos/avatar.svg",
  //        name: "Joe Smith", 
  //        city: "Bangalore",
  //        email: "david@info.com",
  //        phone: "+91 9655667023",
  //        otherA: "Purva Atmosphere",
  //        otherB: "Tivoli/T/205",
  //        revenue: "INR 16,31,25,000",
  //        leadBy: "Lead by: The Property Investors Alliance",
  //        brandName: "Brand Name: Purva Land"
  //     },
  //     show: false
  //   },
  //   {
  //     sn: "6",
  //     invoiceNo: "BEPL/03-22-002",
  //     customerName: "Deep Biwas",
  //     userData: {
  //        avatarImg: "https://ionicframework.com/docs/img/demos/avatar.svg",
  //        name: "David Smith", 
  //        city: "Bangalore",
  //        email: "david@info.com",
  //        phone: "+91 9655667023",
  //        otherA: "Purva Atmosphere",
  //        otherB: "Tivoli/T/205",
  //        revenue: "INR 16,31,25,000",
  //        leadBy: "Lead by: The Property Investors Alliance",
  //        brandName: "Brand Name: Purva Land"
  //     },
  //     show: false
  //   },
  //   {
  //     sn: "7",
  //     invoiceNo: "BEPL/03-22-002",
  //     customerName: "Deep Biwas",
  //     userData: {
  //        avatarImg: "https://ionicframework.com/docs/img/demos/avatar.svg",
  //        name: "Robart Jr.", 
  //        city: "Bangalore",
  //        email: "david@info.com",
  //        phone: "+91 9655667023",
  //        otherA: "Purva Atmosphere",
  //        otherB: "Tivoli/T/205",
  //        revenue: "INR 16,31,25,000",
  //        leadBy: "Lead by: The Property Investors Alliance",
  //        brandName: "Brand Name: Purva Land"
  //     },
  //     show: false
  //   },
  //   {
  //     sn: "8",
  //     invoiceNo: "BEPL/03-22-002",
  //     customerName: "Deep Biwas",
  //     userData: {
  //        avatarImg: "https://ionicframework.com/docs/img/demos/avatar.svg",
  //        name: "David Smith", 
  //        city: "Bangalore",
  //        email: "david@info.com",
  //        phone: "+91 9655667023",
  //        otherA: "Purva Atmosphere",
  //        otherB: "Tivoli/T/205",
  //        revenue: "INR 16,31,25,000",
  //        leadBy: "Lead by: The Property Investors Alliance",
  //        brandName: "Brand Name: Purva Land"
  //     },
  //     show: false
  //   }]


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private checkStr: StorageService, private capHttp: HttpCapService, 
    private ls: LoaderService) { }




  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params.location_name);
      this.location_id = params.location_id;
      this.location_name = params.location_name;
      this.otherRevenue = params.otherRevenue;
    });
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
           this.getRevenueDataDetails();
        }
      }
    }).catch( err => {  });
  }



  getRevenueDataDetails(){
    this.ls.showLoader();
    this.capHttp.postData('/revenue-list', {city_id : this.location_id}, this.userToken).then((res:any) => {   console.log(res); 
      this.ls.hideLoader();  
      if(res.status === "success"){ 
        this.revenueData = res.data;
        this.revenueData.forEach(object => {
          object['show'] = false;
        });
      }
    }).catch( err => {
    })
  }



  viewClicked(index) {
    for (let i = 0; i < this.revenueData.length; i++) {
      this.revenueData[i].show = false;
    }
    console.log(this.revenueData[index]);
    this.revenueData[index].show = true;
  }

  closeClicked(index){
    for (let i = 0; i < this.revenueData.length; i++) {
      this.revenueData[i].show = false;
    }
    console.log(this.revenueData[index]);
    this.revenueData[index].show = false;
  }
  





}
