import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NeedRequisitionService {
  constructor(private http: HttpClient) {}

  getUserDetailsById(userId): Observable<any> {
    const getUserDetailsById = `${environment.baseUrl}/p2p/otherusers/find/${userId}`;

    return this.http.get<any>(getUserDetailsById);
  }

  fetchNeeds(): Observable<any> {
    const fetchNeedsUrl = `${environment.baseUrl}/api/v1/requisition/needs/get`;

    return this.http.get<any>(fetchNeedsUrl);
  }

  fetchApprovedNeeds(): Observable<any>{
    const fetchNeedsUrl = `${environment.baseUrl}/api/v1/requisition/requisitions/approved/`;

    return this.http.get<any>(fetchNeedsUrl);
  }

  fetchRejectedNeeds(): Observable<any>{
    const fetchNeedsUrl = `${environment.baseUrl}/api/v1/requisition/requisitions/rejected/`;

    return this.http.get<any>(fetchNeedsUrl);
  }

  fetchFullFilledNeeds(): Observable<any>{
    const fetchFullFilledNeedsUrl = `${environment.baseUrl}/api/v1/requisition/`;

    return this.http.get<any>(fetchFullFilledNeedsUrl);
  }

  deleteNeed(needId): Observable<any>{
    const deleteNeedUrl = `${environment.baseUrl}/api/v1/requisition/`;

    return this.http.delete<any>(deleteNeedUrl);
  }

  fetchNeedById(needId) {
    const fetchNeedByIdUrl = `${environment.baseUrl}/api/v1/requisition/needs/get/`;

    return this.http.get<any>(fetchNeedByIdUrl, { params: { id: needId } });
  }

  requestNeed(need): Observable<any> {
    const requestNeedUrl = `${environment.baseUrl}/api/v1/requisition/need/add`;

    return this.http.post<any>(requestNeedUrl, need);
  }

  updateNeed(need): Observable<any> {
    const updateNeedUrl = `${environment.baseUrl}/api/v1/requisition/update/`;

    return this.http.put<any>(updateNeedUrl, need);
  }

  updateNeedStatus(params) {
    const updateNeedStatusUrl = `${environment.baseUrl}/api/v1/requisition/update/status/`;

    return this.http.put<any>(
      updateNeedStatusUrl,
      {}, { params }
    );
  }
}
