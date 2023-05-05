import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor(private http: HttpClient) { }


  
  // (params: any): Observable<any> {
  //   const mpesaUrl = `${environment.baseUrl}/p2p/mpesa/check`;

  //   return this.http.get<any>(mpesaUrl, params);
  // }

  prequalificationPayementStatus(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/mpesa/fetch/transactiondetails`,
     {
      params});
  }
 
  mpesaPrequalificationPayement(params: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/p2p/mpesa/stk`, {},
     {
      params});
  }
 
  paypalPrequalificationPayement(data: any): Observable<any> {
    const paypalUrl = `${environment.baseUrl}/p2p/paypal/intiate`;
    return this.http.post<any>(paypalUrl, data);
  }
 

}
