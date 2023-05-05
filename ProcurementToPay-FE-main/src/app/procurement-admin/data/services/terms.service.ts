import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class TermsService {
  constructor(private http: HttpClient) { }

 

  addTerms(data: any): Observable<any> {
    const termUrl = `${environment.baseUrl}/p2p/termsConditions/add`;

    return this.http.post<any>(termUrl, data);
  }

  getTerms(): Observable<any[]> {
    const activeBillsUrl = `${environment.baseUrl}/p2p/termsConditions/fetchAll`;

    return this.http.get<any[]>(activeBillsUrl);
  }

  getTermById(termId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/termsConditions/fetchBy/${termId}`, {
      
    });
  }
  updateTerm(data): Observable<{ message: string }> {
    const updateTermUrl = `${environment.baseUrl}/p2p/termsConditions/update`;

    return this.http.put<{ message: string }>(updateTermUrl, data)
  }

  deleteTerm(dataId: any): Observable<{ message: string }> {
    const deleteTermUrl = `${environment.baseUrl}/p2p/termsConditions/delete/${dataId}`;

    return this.http.delete<{ message: string }>(deleteTermUrl)
  }


}
