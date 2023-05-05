import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class PrequalificationReqService {
  constructor(private http: HttpClient) { }

 

  postRequirements(data: any): Observable<any> {
    const announceUrl = `${environment.baseUrl}/p2p/prequalification/apply/add`;

    return this.http.post<any>(announceUrl, data);
  }

 
}
