import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lead-message',
  templateUrl: './lead-message.page.html',
  styleUrls: ['./lead-message.page.scss'],
})
export class LeadMessagePage implements OnInit {

   @Input("message") message;
   @Input("salesforece") salesforece;
   
  //  @Input() message;

  constructor(private modalCtrl: ModalController) { }


  dismiss(){
    this.modalCtrl.dismiss();
  }


  ngOnInit() {
  }

}
