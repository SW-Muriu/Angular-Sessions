import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CostCentersService {

  constructor(private http: HttpClient) { }
  
  updateCostCenterStatus(params: any): Observable<any> {
    const updateCostCenterUrl = `${environment.baseUrl}/api/v1/costcenters/update/status`;
    return this.http.put(updateCostCenterUrl,{}, {
      params:params,
      responseType: "text",
    });
  }
  

 
}
