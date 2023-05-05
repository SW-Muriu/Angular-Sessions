import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class PreqParametersService {
  constructor(private http: HttpClient) { }

 

  addPreqParameter(data: any): Observable<any> {
    const preqParamUrl = `${environment.baseUrl}/p2p/prequalification/requirements/categories/add`;

    return this.http.post<any>(preqParamUrl, data);
  }

  getPreqParameters(): Observable<any[]> {
    const preqParamUrl = `${environment.baseUrl}/p2p/prequalification/requirements/categories/all`;

    return this.http.get<any[]>(preqParamUrl);
  }

  getPreqParameterById(tenderId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/tendercategories/find/${tenderId}`, {
      
    });
  }
  updatePreqParameter(data): Observable<{ message: string }> {
    const preqParamUrl = `${environment.baseUrl}/p2p/tendercategories/update`;

    return this.http.put<{ message: string }>(preqParamUrl, data)
  }

  deletePreqParameter(dataId: any): Observable<{ message: string }> {
    const deletePreqParamUrlUrl = `${environment.baseUrl}/p2p/tendercategories/delete/${dataId}`;

    return this.http.delete<{ message: string }>(deletePreqParamUrlUrl)
  }


}
