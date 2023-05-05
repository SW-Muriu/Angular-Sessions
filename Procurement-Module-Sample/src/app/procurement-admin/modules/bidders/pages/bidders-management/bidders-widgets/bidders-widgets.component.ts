import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiddersService } from 'src/app/data/services/procurement-admin/bidders.service';

@Component({
  selector: 'app-bidders-widgets',
  templateUrl: './bidders-widgets.component.html',
  styleUrls: ['./bidders-widgets.component.sass']
})
export class BiddersWidgetsComponent implements OnInit {
  activeBidders: number = 0;
  lockedBidders: number = 0;
  deletedBidders: number = 0;
  inactiveBidders: number = 0;

  constructor(
    private router: Router,
    private biddersService: BiddersService
  ) {}

  ngOnInit(): void {
    this.fetchActiveBidders();
    this.fetchLockedBidders();
    this.fetchInactiveBidders();
    this.fetchDeletedAccounts();
  }

  navigateToActiveBidders() {
    this.router.navigateByUrl("/procurement-admin/bidders/all-bidders");
  }
  navugateToLockedBidders() {
    this.router.navigateByUrl("/procurement-admin/bidders/locked-accounts");
  }
  navigateToInactiveBidders() {
    this.router.navigateByUrl("/procurement-admin/bidders/inactive-accounts");
  }
  navigateToDeletedBidders() {
    this.router.navigateByUrl("/procurement-admin/bidders/deleted-accounts");
  }

  fetchActiveBidders() {
    this.biddersService.getAllBidders().subscribe(
      (res) => {
        this.activeBidders = res.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fetchLockedBidders() {
    this.biddersService.getAllLockedAccounts().subscribe(
      (res) => {
        this.lockedBidders = res.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fetchInactiveBidders() {
    this.biddersService.getAllInactiveAccounts().subscribe(
      (res) => {
        this.inactiveBidders = res.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fetchDeletedAccounts() {
    this.biddersService.getDeletedAccounts().subscribe(
      (res) => {
        this.deletedBidders = res.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
