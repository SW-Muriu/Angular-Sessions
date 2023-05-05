import { Injectable } from '@angular/core';

const PURCHASE_ORDER_DETAILS = 'bank-and-customer-details';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderSessionService {

  constructor() { }


  savePurchaseOrderDetails(purchaseOrderDetails) {
    sessionStorage.removeItem(PURCHASE_ORDER_DETAILS);
    sessionStorage.setItem(
      PURCHASE_ORDER_DETAILS,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getPurcahseOrderDetails() {
    return sessionStorage.getItem(PURCHASE_ORDER_DETAILS);
  }

  removePurchaseOrderDetails() {
    sessionStorage.removeItem(PURCHASE_ORDER_DETAILS);
  }

}
