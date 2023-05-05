import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ApplicationsService {
  constructor(private http: HttpClient) {}


  getApplications(): Observable<any[]> {
    const announcementsUrl = `${environment.baseUrl}/api/v1/po/bills/not_paid`;

    return this.http.get<any[]>(announcementsUrl);
  }

  getApplicationById(applicationId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/prequalification/apply/findbyid/${applicationId}`, {
    });
  }

  getRequirementsByAnnId(jobId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/prequalification/requirements/categories/findby/${jobId}`, {
    });
  }

  getAnnouncementById(id: any): Observable<any>{
    const announcementUrl = `${environment.baseUrl}/p2p/prequalification/admin/findbyid/${id}`;
    return this.http.get<any>(announcementUrl)
  }

  getPendingApplications(): Observable<any[]> {
    const pendingAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/apply/allpending`;

    return this.http.get<any[]>(pendingAnnouncementsUrl);
  }
  getApprovedApplications(): Observable<any[]> {
    const approvedAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/apply/allapproved`;

    return this.http.get<any[]>(approvedAnnouncementsUrl);
  }
  getRejectedApplications(): Observable<any[]> {
    const rejectedAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/apply/allrejected`;

    return this.http.get<any[]>(rejectedAnnouncementsUrl);
  }
  
  deleteApplication(dataId: any): Observable<{ message: string }> {
    const deleteAnnouncementUrl = `${environment.baseUrl}/p2p/announceprequalification/delete/${dataId}`;

    return this.http.delete<{ message: string }>(deleteAnnouncementUrl)
  }
  
  updatePreqApplicationStatusProcAdmin(data): Observable<{ message: string }> {
    const preqParamUrl = `${environment.baseUrl}/p2p/prequalification/apply/verify`;
    return this.http.put<{ message: string }>(preqParamUrl, data)
  }


  }

