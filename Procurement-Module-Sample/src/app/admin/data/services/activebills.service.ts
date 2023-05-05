import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ActiveBillsService {
  constructor(private http: HttpClient) {}

  getActiveBills(): Observable<any[]> {
    const activeBillsUrl = `${environment.baseUrl}/api/v1/po/bills/not_paid`;

    return this.http.get<any[]>(activeBillsUrl);
  }

  getActiveBillsById(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/po/billed/order`, {
      params,
    });
  }

  
  settleBills(data: any): Observable<{ message: string }> {
    const payBillUrl = `${environment.baseUrl}/api/v1/transaction/add`;

    return this.http.post<{ message: string }>(payBillUrl, data);
  }

  
  payBills(data: any): Observable<any> {
    const payBillUrl = `${environment.baseUrl}/api/v1/payments/add`;

    return this.http.post<any>(payBillUrl, data);
  }

  getPaidBills(): Observable<any[]> {
    const paidBillsUrl = `${environment.baseUrl}/api/v1/payments/payments/approved`;

    return this.http.get<any[]>(paidBillsUrl);
  }

  getPendingBills(): Observable<any[]> {
    const pendingBillsUrl = `${environment.baseUrl}/api/v1/payments/payments`;

    return this.http.get<any[]>(pendingBillsUrl);
  }

  updateBillStatus(params: any): Observable<any> {
    const updateBillUrl = `${environment.baseUrl}/api/v1/payments/update/status`;
    return this.http.put(updateBillUrl,{}, {
      params:params,
      responseType: "text",
    });
  }

  getRejectedBills(): Observable<any[]> {
    const pendingBillsUrl = `${environment.baseUrl}/api/v1/payments/payments/rejected`;

    return this.http.get<any[]>(pendingBillsUrl);
  }


  // /api/v1/documents/by/{reference_id}
}
