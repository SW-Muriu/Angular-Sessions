import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { NeedRequisitionService } from 'src/app/data/services/need-requisition/need-requisition.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-rfq-applications-widgets',
  templateUrl: './rfq-applications-widgets.component.html',
  styleUrls: ['./rfq-applications-widgets.component.sass']
})
export class RfqApplicationsWidgetsComponent extends BaseComponent implements OnInit {
  pendingNeedsArray: any [] = [];
  allNeedsArray: any [] = [];
  approvedNeedsArray: any [] = [];
  rejectedNeedsArray: any [] = [];
  allNeeds: number = 0;
  pendingNeeds: number = 0;
  approvedNeeds: number = 0;
  rejectedNeeds: number = 0;

  constructor(private needRequisitionService: NeedRequisitionService) {
    super();
   }

  ngOnInit(): void {

  this.fetchPendingNeeds();

  this.fetchApprovedNeeds();

  this.fetchRejectedNeeds();

  

  }

  fetchPendingNeeds(){
    this.needRequisitionService.fetchNeeds().pipe(takeUntil(this.subject)).subscribe(res => {
      this.pendingNeedsArray = res;

      if(this.pendingNeedsArray.length > 0){
        this.pendingNeeds = this.pendingNeedsArray.length;

        console.log("Inside Pending Needs ", this.pendingNeeds)
      }

      this.totalNeeds();
      
    }, err => {
      console.log(err)
    })
  }

  fetchApprovedNeeds(){
    this.needRequisitionService.fetchApprovedNeeds().pipe(takeUntil(this.subject)).subscribe(res => {
      this.approvedNeedsArray = res;

      if(this.approvedNeedsArray.length > 0){
        this.approvedNeeds = this.approvedNeedsArray.length

        console.log("Inside Approved Needs ", this.approvedNeeds)
      }

      this.totalNeeds();
    }, err => {
      console.log(err)
    })
  }


  fetchRejectedNeeds(){
    this.needRequisitionService.fetchRejectedNeeds().pipe(takeUntil(this.subject)).subscribe(res => {
      this.rejectedNeedsArray = res;

      if(this.rejectedNeedsArray.length > 0){
        this.rejectedNeeds = this.rejectedNeedsArray.length

        console.log("Inside Rejected Needs ", this.rejectedNeeds)
      }

      this.totalNeeds();
    }, err => {
      console.log(err)
    })
  }

  totalNeeds(){
    console.log("Approved Needs ", this.approvedNeeds)
    this.allNeeds = this.pendingNeeds + this.rejectedNeeds + this.approvedNeeds;
  }

}
