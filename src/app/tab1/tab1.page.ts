import { Component, ViewChild, OnInit} from '@angular/core';

import { HttpCapService } from '../services/http-cap.service';
import { StorageService } from '../services/storage.service';
import { ResponseMsgService } from '../services/response-msg.service';
import { LoaderService } from '../services/loader.service';
import { MenuController } from '@ionic/angular';
import { ChartComponent, ApexAxisChartSeries, ApexNonAxisChartSeries, ApexLegend,
         ApexChart, ApexResponsive, ApexDataLabels, ApexFill, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
  colors: any[]
  legend: ApexLegend;
  fill: ApexFill;
};


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild("chart", { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  location :string;
  slider: any;

  userToken;
  userRole;
  cityData;

  today = new Date();

  warm_lead_Data: number = 0;
  commercial_discussion_Data: number = 0;
  site_visit_conducted_Data: number = 0;
  expired_lead_Data: number = 0;



  customPopoverSelect = {
    cssClass: 'custom-select'
  };

  public pieChartLabels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  public pieChartData: number[] = [300, 500, 200];
  public pieChartType: string = 'pie';

  // Optional: You can customize the chart options
  public pieChartOptions: any = {
    responsive: true,
  };
  

  constructor(private menuCtrl: MenuController, private capHttp: HttpCapService, private ls: LoaderService,
              private checkStr: StorageService, private resMsg: ResponseMsgService) 
  
  { this.loadChart();  this.get_userData();}


  ngOnInit() {
    // this.get_userData();
    // this.loadChart();
  }


  ionViewWillEnter(){
    this.loadChart();  
    // this.get_userData();
  }

  ionViewDidLeave(){
    // this.loadChart();  
    // this.get_userData();
  }
  

  downloadThis(){
    
  }

  get_userData(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){             
          this.userRole = data.role;
          this.userToken = data.token;
          this.getSliderData();
          this.getCities(); 
        }
      }else{        
      }
    }).catch( err => {  });
  }




  getSliderData(){
    // console.log('role' + this.userRole);

    this.capHttp.getData('/header').then((res:any) => {   console.log(res);
      // console.log(res.data);
      if(res.status === "success"){ 
          this.slider = res.data;
          console.log(this.slider);
      }else{
        //  this.presentToast(res.message);
      }
    }).catch( err => { });
  }



  getCities(){
    this.capHttp.getData('/cities').then((res:any) => {   console.log(res);   
      if(res.status === "success"){ 
        this.cityData = res.data;
        this.location = res.data[0].id;
        console.log('UserRole: '+ this.userRole);
        if(this.userRole == '3' || this.userRole == '1'){
          this.getPieChartData(this.location);
        }     
      }
    }).catch( err => {
    });
  }




  handleChange(ev){
    // console.log(ev.detail);
    const cityVal = ev.detail.value;
    this.getPieChartData(cityVal);
  }




  getPieChartData(cityVal){
    // this.ls.showLoader();
    this.capHttp.postData('/admin-pie-chart', {city_id : cityVal}, this.userToken).then((res:any) => {   console.log(res);   
      // this.ls.hideLoader();
      if(res.status === "success"){
        if(res.data){
          this.warm_lead_Data = res.data.warmleads;
          this.commercial_discussion_Data = res.data.commercialleads;
          this.site_visit_conducted_Data = res.data.sitevisiteleads;
          this.expired_lead_Data = res.data.expiredleads;
          this.loadChart(); 
        }
      }
    }).catch( err => {
    });
  }



  async loadChart(){
    this.chartOptions = {
      // series: [1, 1, 1, 1],
      series: [this.warm_lead_Data , this.commercial_discussion_Data, this.site_visit_conducted_Data, this.expired_lead_Data],
      chart: {
        type: "pie",
        height: 340,
        // width: 300,
        width: '100%',
        // background: '#d3d3d3',
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }      
      },
      dataLabels: {
        enabled: false,
      },
      labels: ["Warm Lead", "Commercial Discussion", "Site Visit Conducted", "Expired Lead"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: { show: false, position: "bottom", offsetX: -10, offsetY: 0 }
          }
        }
      ],     
      fill: {
         colors: ['#8F5EE5', '#F1C338', '#044584', '#EC343B'],
         opacity: 1 
      },
    };
  }


}
