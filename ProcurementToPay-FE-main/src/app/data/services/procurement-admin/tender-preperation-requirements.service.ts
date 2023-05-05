import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenderPreperationRequirementsService {

  constructor(private http: HttpClient) { }


  listAllFinacialTenderRequirements(): Observable<any[]> {
    const listAllFinacialTenderRequirementsUrl = `${environment.baseUrl}/p2p/tenderrequirements/all/financial`;

    return this.http.get<any[]>(listAllFinacialTenderRequirementsUrl);
  }

  listTenderMandatoryRequirements(): Observable<any> {
    const listTenderMandatoryRequirementsUrl = `${environment.baseUrl}/p2p/tenderrequirements/all/mandatory`;

    return this.http.get<any>(listTenderMandatoryRequirementsUrl);
  }

  listAllTechnicalTenderRequirements(): Observable<any> {
    const listAllTechnicalTenderRequirementsUrl = `${environment.baseUrl}/p2p/tenderrequirements/all/technical`;

    return this.http.get<any>(listAllTechnicalTenderRequirementsUrl);
  }
}
