import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ParametersService {
  constructor(private http: HttpClient) { }


  addTax(data: any): Observable<any> {
    const TaxUrl = `${environment.baseUrl}/api/v1/tax/tax/add`;
    return this.http.post<any>(TaxUrl, data);
  }

 
  getTaxes(): Observable<any[]> {
    const TaxsUrl = `${environment.baseUrl}/api/v1/tax/taxes`;

    return this.http.get<any[]>(TaxsUrl);
  }

  getTaxById(TaxId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/tax/tax/get/${TaxId}`, {
      
    });
  }
  updateTax(data): Observable<{ message: string }> {
    const updateTaxUrl = `${environment.baseUrl}/api/v1/tax/update`;

    return this.http.put<{ message: string }>(updateTaxUrl, data)
  }

  deleteTax(dataId: any): Observable<{ message: string }> {
    const deleteTaxUrl = `${environment.baseUrl}/p2p/TaxConditions/delete/${dataId}`;

    return this.http.delete<{ message: string }>(deleteTaxUrl)
  }


}
