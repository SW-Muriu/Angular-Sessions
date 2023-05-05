import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class TenderService {
  constructor(private http: HttpClient) { }

 

  addTender(data: any): Observable<any> {
    const announceUrl = `${environment.baseUrl}/p2p/tendercategories/add`;

    return this.http.post<any>(announceUrl, data);
  }

  getTenders(): Observable<any[]> {
    const activeBillsUrl = `${environment.baseUrl}/p2p/tendercategories/all`;

    return this.http.get<any[]>(activeBillsUrl);
  }

  getTenderById(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/tender/tender/id`, {
      params,
    });
  }

  updateTender(data): Observable<{ message: string }> {
    const updateTenderUrl = `${environment.baseUrl}/p2p/tendercategories/update`;

    return this.http.put<{ message: string }>(updateTenderUrl, data)
  }

  deleteTender(dataId: any): Observable<{ message: string }> {
    const deleteTenderUrl = `${environment.baseUrl}/p2p/tendercategories/delete/${dataId}`;

    return this.http.delete<{ message: string }>(deleteTenderUrl)
  }


}
