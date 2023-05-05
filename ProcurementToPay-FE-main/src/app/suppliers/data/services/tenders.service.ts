import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class TenderService {
  constructor(private http: HttpClient) { }

  getPrequalifiedByCategoryCode(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/prequalifiedsuppliers/all/categorycode`, { params });
  }

  getTenders(): Observable<any[]> {
    const activeBillsUrl = `${environment.baseUrl}/p2p/tendercategories/all`;

    return this.http.get<any[]>(activeBillsUrl);
  }
  getTenderRequirementsViaId(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/tender/requirements`, { params });
  }
  getPostedTenders(): Observable<any[]> {
    const activeBillsUrl = `${environment.baseUrl}/api/v1/tender/tender/posted`;

    return this.http.get<any[]>(activeBillsUrl);
  }



  postTenderApplication(data: any): Observable<any> {
    const tenderUrl = `${environment.baseUrl}/p2p/tenderapplications/submitapplication`;
    return this.http.post<any>(tenderUrl, data);
  }


}
