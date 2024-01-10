import { Component, ViewChild, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from "src/app/services/loader.service";

import { ApexAxisChartSeries, ApexChart, ChartComponent, ApexDataLabels, ApexPlotOptions,
         ApexResponsive, ApexXAxis, ApexYAxis, ApexLegend, ApexFill } from "ng-apexcharts";



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;s
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-revenue-generated',
  templateUrl: './revenue-generated.page.html',
  styleUrls: ['./revenue-generated.page.scss'],
})
export class RevenueGeneratedPage implements OnInit {

  @ViewChild("chart", { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  userToken;

  totalRevenue;
  otherRevenue;
  revenueData;

  customPopoverSelect = {
    cssClass: 'custom-select'
  };

  recordPeriod: string = "3months";

  monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  currentDate = new Date();
  currentMonthIndex = this.currentDate.getMonth();
         previousMonthIndex = (this.currentMonthIndex - 1 + 12) % 12;
         twoMonthsAgoIndex = (this.currentMonthIndex - 2 + 12) % 12;
         threeMonthsAgoIndex = (this.currentMonthIndex - 3 + 12) % 12;
         fourMonthsAgoIndex = (this.currentMonthIndex - 4 + 12) % 12;
         fiveMonthsAgoIndex = (this.currentMonthIndex - 5 + 12) % 12;
         sixMonthsAgoIndex = (this.currentMonthIndex - 6 + 12) % 12;
         sevenMonthsAgoIndex = (this.currentMonthIndex - 7 + 12) % 12;
         eightMonthsAgoIndex = (this.currentMonthIndex - 8 + 12) % 12;
         nineMonthsAgoIndex = (this.currentMonthIndex - 9 + 12) % 12;
         tenMonthsAgoIndex = (this.currentMonthIndex - 10 + 12) % 12;
         elevenMonthsAgoIndex = (this.currentMonthIndex - 11 + 12) % 12;
     currentMonth = this.monthNames[this.currentMonthIndex];
     previousMonth = this.monthNames[this.previousMonthIndex];
     twoMonthsAgo = this.monthNames[this.twoMonthsAgoIndex];
     threeMonthsAgo = this.monthNames[this.threeMonthsAgoIndex];
     fourMonthsAgo = this.monthNames[this.fourMonthsAgoIndex];
     fiveMonthsAgo = this.monthNames[this.fiveMonthsAgoIndex];
     sixMonthsAgo = this.monthNames[this.sixMonthsAgoIndex];
     sevenMonthsAgo = this.monthNames[this.sevenMonthsAgoIndex];
     eightMonthsAgo = this.monthNames[this.eightMonthsAgoIndex];
     nineMonthsAgo = this.monthNames[this.nineMonthsAgoIndex];
     tenMonthsAgo = this.monthNames[this.tenMonthsAgoIndex];
     elevenMonthsAgo = this.monthNames[this.elevenMonthsAgoIndex];
  
     monthArrayData: any[] = [this.twoMonthsAgo, this.previousMonth, this.currentMonth];

     threeMonthsSeriesData: any[] = [
      {
        data: [14, 55, 41]
      },
      {
        data: [33, 23, 20]
      },
      {
        data: [21, 17, 15]
      },
      {
        data: [10, 13, 5]
      },
      {
        data: [21, 17, 15]
      }
     ];

     sixMonthsSeriesData: any[] = [
      {
        data: [14, 55, 41, 67, 22, 43]
      },
      {
        data: [33, 23, 20, 8, 13, 27]
      },
      {
        data: [21, 17, 15, 15, 21, 14]
      },
      {
        data: [9, 7, 25, 13, 22, 8]
      },
      {
        data: [12, 35, 5, 24, 12, 18]
      }
     ];

     oneYearMonthsSeriesData: any[] = [
      {
        data: [14, 55, 41, 67, 22, 43, 14, 55, 41, 67, 22, 43]
      },
      {
        data: [33, 23, 20, 8, 13, 27, 33, 23, 20, 8, 13, 27]
      },
      {
        data: [21, 17, 15, 15, 21, 14, 21, 17, 15, 15, 21, 14]
      },
      {
        data: [9, 7, 25, 13, 22, 8, 9, 7, 25, 13, 22, 8]
      },
      {
        data: [12, 35, 5, 24, 12, 18, 12, 35, 5, 24, 12, 18]
      }
     ];

     seriesArrayData: any [] = this.threeMonthsSeriesData;

  constructor(private router: Router, private checkStr: StorageService, private capHttp: HttpCapService, 
              private ls: LoaderService)  { }


  
  ngOnInit() {
    this.loadChart();
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
           this.getRevenueData();
        }
      }
    }).catch( err => {  });
  }


    
  handleChange(ev){
    // console.log(ev);
    this.recordPeriod = ev.detail.value;
    if(this.recordPeriod === '3months'){
      this.monthArrayData = [this.twoMonthsAgo, this.previousMonth, this.currentMonth];
      this.seriesArrayData = this.threeMonthsSeriesData;
    }else if(this.recordPeriod === '6months'){
      this.monthArrayData = [this.fiveMonthsAgo, this.fourMonthsAgo, this.threeMonthsAgo, this.twoMonthsAgo, this.previousMonth, this.currentMonth];
      this.seriesArrayData = this.sixMonthsSeriesData;
    }else if(this.recordPeriod === '1year'){
      this.monthArrayData = [this.elevenMonthsAgo, this.tenMonthsAgo, this.nineMonthsAgo, this.eightMonthsAgo, this.sevenMonthsAgo, this.sixMonthsAgo, this.fiveMonthsAgo, this.fourMonthsAgo, this.threeMonthsAgo, this.twoMonthsAgo, this.previousMonth, this.currentMonth];
      this.seriesArrayData = this.oneYearMonthsSeriesData;
    }
    console.log(this.monthArrayData);
    this.getRevenueData();
  }




  getRevenueData(){
    this.ls.showLoader();
    this.capHttp.postData('/revenue', {months : this.recordPeriod}, this.userToken).then((res:any) => {   console.log(res); 
      this.ls.hideLoader();  
      if(res.status === "success"){ 
          this.loadChart();
          this.totalRevenue = res.total_revenue;
          this.otherRevenue = res.monthly_revenue;
          this.revenueData = res.data;
      }
    }).catch( err => {
    })
  }



  loadChart(){
    this.chartOptions = {
      // series: [
      //   {
      //     data: [14, 55, 41, 67, 22, 43]
      //   },
      //   {
      //     data: [33, 23, 20, 8, 13, 27]
      //   },
      //   {
      //     data: [21, 17, 15, 15, 21, 14]
      //   },
      //   {
      //     data: [9, 7, 25, 13, 22, 8]
      //   },
      //   {
      //     data: [12, 35, 5, 24, 12, 18]
      //   }
      // ],
      series: this.seriesArrayData,
      chart: {
        type: "bar",
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
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: { show: false, position: "bottom", offsetX: -10, offsetY: 0 }
          }
        }
      ],
      plotOptions: {
        bar: { horizontal: false,  columnWidth: '45%' },
      },
      xaxis: {
        type: "category",
        // categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"]
        categories: this.monthArrayData,
      },      
      fill: {
         colors: ['#8F5EE5', '#6FAC46', '#F1C338', '#044584', '#EC7C30'],
         opacity: 1 
      },
    };
  }



  goto_revenueLocation(loc_id, loc_name){
    if(loc_id && loc_name){
      this.router.navigate(['/revenue-location'], {queryParams: {'location_id': loc_id, 
      'location_name': loc_name, 'otherRevenue': this.otherRevenue}});
    }
  }


}
