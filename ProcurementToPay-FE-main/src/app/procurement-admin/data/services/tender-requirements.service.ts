import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class TenderRequirementsService {
  constructor(private http: HttpClient) { }

 

  addRequirement(data: any): Observable<any> {
    const announceUrl = `${environment.baseUrl}/p2p/tenderrequirements/add`;

    return this.http.post<any>(announceUrl, data);
  }

  getMandatoryRequirements(): Observable<any[]> {
    const requirementsUrl = `${environment.baseUrl}/p2p/tenderrequirements/all/mandatory`;

    return this.http.get<any[]>(requirementsUrl);
  }
  getFinancialRequirements(): Observable<any[]> {
    const requirementsUrl = `${environment.baseUrl}/p2p/tenderrequirements/all/financial`;

    return this.http.get<any[]>(requirementsUrl);
  }
  getTechincalRequirements(): Observable<any[]> {
    const requirementsUrl = `${environment.baseUrl}/p2p/tenderrequirements/all/technical`;

    return this.http.get<any[]>(requirementsUrl);
  }

  getRequirementById(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/Requirement/Requirement/id`, {
      params,
    });
  }

  updateRequirement(data): Observable<{ message: string }> {
    const updateRequirementUrl = `${environment.baseUrl}/p2p/Requirementcategories/update`;

    return this.http.put<{ message: string }>(updateRequirementUrl, data)
  }

  deleteRequirement(dataId: any): Observable<{ message: string }> {
    const deleteRequirementUrl = `${environment.baseUrl}/p2p/tenderrequirements/delete/${dataId}`;

    return this.http.delete<{ message: string }>(deleteRequirementUrl)
  }


}
