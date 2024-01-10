import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpCapService } from 'src/app/services/http-cap.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-residential-details',
  templateUrl: './residential-details.page.html',
  styleUrls: ['./residential-details.page.scss'],
})
export class ResidentialDetailsPage implements OnInit {

  cityId: string;
  userToken;

  cityData;
  projectsData;



  constructor(private router: Router, private activatedRoute : ActivatedRoute, 
              private capHttp: HttpCapService, private checkStr: StorageService, private ls: LoaderService) { }



  ionViewWillEnter(){
    // this.getUser();
  }



  getUser(){
    this.checkStr.getStore('userData').then((data:any) => {   
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.token){          
           this.userToken = data.token;
           this.getProjects(this.userToken);
        }
      }
    }).catch( err => {  });
  }




  getProjects(token){
    this.ls.showLoader();
    this.capHttp.postData('/residental-projects', {city_id : this.cityId}, token).then((res:any) => {   console.log(res);   
      if(res.status === "success"){ 
        this.ls.hideLoader();
        this.cityData = res.city;
        this.projectsData = res.data;
      }
    }).catch( err => {
      this.ls.hideLoader();
    })
  }



  goto_residentialFlats(project_id){
    if(project_id){
      this.router.navigate(['/residential-details-flats'], {queryParams: {projectId: project_id}});
    }
  }


  ngOnInit() {
    this.cityId = this.activatedRoute.snapshot.queryParamMap.get('cityId');
    this.getUser();
  }

}
