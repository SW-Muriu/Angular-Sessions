import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class PrequalifiedService {
  constructor(private http: HttpClient) { }

  getPrequalifiedSuppliers(): Observable<any[]> {
    const activeBillsUrl = `${environment.baseUrl}/p2p/prequalifiedsuppliers/all`;

    return this.http.get<any[]>(activeBillsUrl);
  }

  getPrequalifiedById(dataId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/prequalifiedsuppliers/prequalificationdetails/${dataId}`);
  }

 
  deletePrequalified(dataId: any): Observable<{ message: string }> {
    const deleteTenderUrl = `${environment.baseUrl}/p2p/******/delete/${dataId}`;

    return this.http.delete<{ message: string }>(deleteTenderUrl)
  }

  getPrequalifiedByCategoryCode(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/prequalifiedsuppliers/all/categorycode`,{params});
  }

}
