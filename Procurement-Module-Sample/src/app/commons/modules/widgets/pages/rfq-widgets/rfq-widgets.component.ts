import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { RfqsService } from 'src/app/data/services/financial-evaluator/rfqs.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-rfq-widgets',
  templateUrl: './rfq-widgets.component.html',
  styleUrls: ['./rfq-widgets.component.sass']
})
export class RfqWidgetsComponent extends BaseComponent implements OnInit {
  pendingRfqArrays: any [] = [];
  approvedRfqsArray: any [] = [];
  postedRfqsArray: any [] = [];
  allRfqsArray: any[] = [];
  rejectedRfqsArray: any[] = [];
  rfqs: any[] = [];
  postedRfqs: number = 0;
  pendingRfqs: number = 0;
  allRfqs: number = 0;
  approvedRfqs: number = 0;
  rejectedRfqs: number = 0;

  constructor(private rfqService: RfqsService) {
    super();
   }

  ngOnInit(): void {

  this.getTenders();

  this.fetchPostedRfqs();

  this.fetchAllRfqs();

  }

  getTenders() {
    this.rfqService
      .fetchAllRFQs()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.rfqs = result;

          if (this.rfqs.length > 0) {
            this.pendingRfqArrays = [];

            this.rfqs.forEach((rfq) => {
              if (rfq.status == "Pending") {
                this.pendingRfqArrays.push(rfq);
              }

              if (rfq.status == "Approved") {
                this.approvedRfqsArray.push(rfq);
              }

              if (rfq.status == "Rejected") {
                this.rejectedRfqsArray.push(rfq);
              }
            });


            if (this.pendingRfqArrays.length > 0) {
              this.pendingRfqs =this.pendingRfqArrays.length
            }

            if (this.approvedRfqsArray.length > 0) {
              this.approvedRfqs =this.approvedRfqsArray.length
            }

            if (this.rejectedRfqsArray.length > 0) {
              this.rejectedRfqs =this.rejectedRfqsArray.length
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchPostedRfqs(){
    this.rfqService.fetchPostedRFQs().pipe(takeUntil(this.subject)).subscribe(res => {
      this.postedRfqsArray = res;

      if(this.postedRfqsArray.length > 0){
        this.postedRfqs = this.postedRfqsArray.length

      
      }

    }, err => {
      console.log(err)
    })
  }

  fetchAllRfqs(){
    this.rfqService.fetchPostedRFQs().pipe(takeUntil(this.subject)).subscribe(res => {
      this.allRfqsArray = res;

      if(this.allRfqsArray.length > 0){
        this.allRfqs = this.allRfqsArray.length
      }

    }, err => {
      console.log(err)
    })
  }


}
