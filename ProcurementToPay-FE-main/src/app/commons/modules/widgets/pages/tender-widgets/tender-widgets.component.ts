import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-tender-widgets',
  templateUrl: './tender-widgets.component.html',
  styleUrls: ['./tender-widgets.component.sass']
})
export class TenderWidgetsComponent extends BaseComponent implements OnInit {
  pendingTendersArray: any [] = [];
  postedTendersArray: any [] = [];
  approvedTendersArray: any [] = [];
  rejectedTendersArray: any [] = [];
  postedTenders: number = 0;
  pendingTenders: number = 0;
  approvedTenders: number = 0;
  rejectedTenders: number = 0;

  constructor(private tenderPreperationService: TenderPreperationService) {
    super();
   }

  ngOnInit(): void {

  this.fetchPendingTenders();

  this.fetchApprovedTenders();

  this.fetchRejectedTenders();

  this.fetchPostedTenders();
  }

  fetchPendingTenders(){
    this.tenderPreperationService.fetchTenders().pipe(takeUntil(this.subject)).subscribe(res => {
      this.pendingTendersArray = res;

      if(this.pendingTendersArray.length > 0){
        this.pendingTenders = this.pendingTendersArray.length;

        console.log("Inside Pending Needs ", this.pendingTenders)
      }
      
    }, err => {
      console.log(err)
    })
  }


  fetchPostedTenders(){
    this.tenderPreperationService.fetchPostedTenders().pipe(takeUntil(this.subject)).subscribe(res => {
      this.postedTendersArray = res;

      if(this.postedTendersArray.length > 0){
        this.postedTenders = this.postedTendersArray.length;

        console.log("Inside Pending Needs ", this.postedTenders)
      }
      
    }, err => {
      console.log(err)
    })
  }


  fetchApprovedTenders(){
    this.tenderPreperationService.fetchApprovedTenders().pipe(takeUntil(this.subject)).subscribe(res => {
      this.approvedTendersArray = res;

      if(this.approvedTendersArray.length > 0){
        this.approvedTenders = this.approvedTendersArray.length

        console.log("Inside Approved Needs ", this.approvedTenders)
      }

    }, err => {
      console.log(err)
    })
  }


  fetchRejectedTenders(){
    this.tenderPreperationService.fetchRejectedTenders().pipe(takeUntil(this.subject)).subscribe(res => {
      this.rejectedTendersArray = res;

      if(this.approvedTendersArray.length > 0){
        this.rejectedTenders = this.rejectedTendersArray.length

        console.log("Inside Rejected Needs ", this.rejectedTenders)
      }

    }, err => {
      console.log(err)
    })
  }

}
