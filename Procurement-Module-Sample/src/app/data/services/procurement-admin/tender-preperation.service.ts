import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TenderPreperationService {
  constructor(private http: HttpClient) {}

  addTender(tender): Observable<any> {
    const addTenderUrl = `${environment.baseUrl}/api/v1/tender/tender/add`;

    return this.http.post<any>(addTenderUrl, tender);
  }

  fetchApprovedTenders(): Observable<any[]> {
    const approvedAnnouncementsUrl = `${environment.baseUrl}/api/v1/tender/tender/approved`;

    return this.http.get<any[]>(approvedAnnouncementsUrl);
  }

  getNeedsPercategory(category_code): Observable<any> {
    const getNeedsPercategoryUrl = `${environment.baseUrl}/api/v1/tender/tender/category`;

    return this.http.get<any>(getNeedsPercategoryUrl, {
      params: { category_code: category_code },
    });
  }

  getTenderNeeds(tenderIds): Observable<any> {
    const getTenderNeedsUrl = `${environment.baseUrl}/api/v1/tender/tender/needs`;

    return this.http.post<any>(getTenderNeedsUrl, tenderIds);
  }

  postTender(tenderId): Observable<any> {
    const postTenderUrl = `${environment.baseUrl}/api/v1/tender/tender/post`;

    return this.http.put<any>(postTenderUrl, {}, { params: { id: tenderId } });
  }

  fetchPostedTenders(): Observable<any> {
    const fetchPostedTendersUrl = `${environment.baseUrl}/api/v1/tender/tender/posted`;

    return this.http.get<any>(fetchPostedTendersUrl);
  }

  fetchRejectedTenders(): Observable<any> {
    const fetchPostedtendersUrl = `${environment.baseUrl}/api/v1/tender/tender/rejected`;

    return this.http.get<any>(fetchPostedtendersUrl);
  }

  fetchTenders(): Observable<any> {
    const fetchTendersUrl = `${environment.baseUrl}/api/v1/tender/tenders/get`;

    return this.http.get<any>(fetchTendersUrl);
  }

  updaTender(tender): Observable<any> {
    const updaTenderUrl = `${environment.baseUrl}/api/v1/tender/update/`;

    return this.http.put<any>(updaTenderUrl, tender);
  }

  updateTenderStatus(params): Observable<any> {
    const updateTenderStatusUrl = `${environment.baseUrl}/api/v1/tender/update/status/`;

    return this.http.put<any>(updateTenderStatusUrl, {}, { params });
  }

  getTenderById(id): Observable<any> {
    const getTenderByIdUrl = `${environment.baseUrl}/api/v1/tender/tender/id`;

    return this.http.get<any>(getTenderByIdUrl, { params: { id: id } });
  }

  deleteTenderById(id): Observable<any> {
    const deleteTenderByIdUrl = `${environment.baseUrl}/api/v1/tender/tender/id`;

    return this.http.delete<any>(deleteTenderByIdUrl, { params: { id: id } });
  }

  getRoleDeskApproved(): Observable<any> {
    const getRoleDeskApprovedUrl = `${environment.baseUrl}/api/v1/tender/roledesk/approved`;

    return this.http.get<any>(getRoleDeskApprovedUrl);
  }

  getRoleFinanceApproved(): Observable<any> {
    const getRoleFinanceApprovedUrl = `${environment.baseUrl}/api/v1/tender/rolefinance/approved`;

    return this.http.get<any>(getRoleFinanceApprovedUrl);
  }

  getRoleTechApproved(): Observable<any> {
    const getRoleTechApprovedUrl = `${environment.baseUrl}/api/v1/tender/roletechnical/approved`;

    return this.http.get<any>(getRoleTechApprovedUrl);
  }

  getPartialTenders(): Observable<any> {
    const getPartialTendersUrl = `${environment.baseUrl}/api/v1/tender/tender/partial`;

    return this.http.get<any>(getPartialTendersUrl);
  }

  getTermsAndConditions(): Observable<any> {
    const getTermsAndConditionsUrl = `${environment.baseUrl}/p2p/termsConditions/fetchAll`;

    return this.http.get<any>(getTermsAndConditionsUrl);
  }

  fetchTenderByTenderType(tenderType){
    const fetchTenderByTenderTypeUrl = `${environment.baseUrl}/api/v1/tender/fetchByTenderType/${tenderType}`;

    return this.http.get<any>(fetchTenderByTenderTypeUrl);
  }
}
