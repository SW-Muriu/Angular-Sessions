import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class AnnouncementService {
  constructor(private http: HttpClient) { }


  addAnnouncement(data: any): Observable<{ message: string }> {
    const announceUrl = `${environment.baseUrl}/p2p/prequalification/admin/add`;

    return this.http.post<{ message: string }>(announceUrl, data);
  }
  updateAnnouncement(data): Observable<{ message: string }> {
    const updateAnnouncementUrl = `${environment.baseUrl}/p2p/prequalification/admin/update`;
    return this.http.put<{ message: string }>(updateAnnouncementUrl, data)
  }
  getPendingAnnouncements(): Observable<any[]> {
    const pendingAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/admin/allpending`;

    return this.http.get<any[]>(pendingAnnouncementsUrl);
  }
  getPartialAnnouncements(): Observable<any[]> {
    const partialAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/admin/allpartitallyapproved`;

    return this.http.get<any[]>(partialAnnouncementsUrl);
  }
  getApprovedAnnouncements(): Observable<any[]> {
    const approvedAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/admin/allapproved`;

    return this.http.get<any[]>(approvedAnnouncementsUrl);
  }
  getApprovedPostedAnnouncements(): Observable<any[]> {
    const approvedAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/admin/allposted`;

    return this.http.get<any[]>(approvedAnnouncementsUrl);
  }
  getApprovedNotPostedAnnouncements(): Observable<any[]> {
    const approvedAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/admin/allnotposted`;

    return this.http.get<any[]>(approvedAnnouncementsUrl);
  }
  getRejectedAnnouncements(): Observable<any[]> {
    const rejectedAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/admin/allrejected`;

    return this.http.get<any[]>(rejectedAnnouncementsUrl);
  }
  getDeletedAnnouncements(): Observable<any[]> {
    const rejectedAnnouncementsUrl = `${environment.baseUrl}/p2p/prequalification/admin/alldeleted`;

    return this.http.get<any[]>(rejectedAnnouncementsUrl);
  }
  postAnnouncement(params: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/p2p/prequalification/admin/post`,{}, {
      params,
    });
  }

  getAnnouncementById(id: any): Observable<any>{
    const announcementUrl = `${environment.baseUrl}/p2p/prequalification/admin/findbyid/${id}`;
    return this.http.get<any>(announcementUrl)
  }

  getApplicationsBySupplierId(supplierid: any): Observable<any>{
    const announcementUrl = `${environment.baseUrl}/p2p/prequalification/apply/foronesupplier/${supplierid}`;
    return this.http.get<any>(announcementUrl)
  }
  
  // postAnnouncement(data: any): Observable<{ message: string }> {
  //   const announceUrl = `${environment.baseUrl}/p2p/prequalification/admin/post`;
  //   return this.http.post<{ message: string }>(announceUrl, data);
  // }











  getAnnouncements(): Observable<any[]> {
    const announcementsUrl = `${environment.baseUrl}/api/v1/po/bills/not_paid`;

    return this.http.get<any[]>(announcementsUrl);
  }


  getRequirementsByAnnId(jobId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/P2PSolution/p2p/prequalification/requirements/categories/findby/${jobId}`, {
    });
  }






  // updateAnnouncementStatus(params: any): Observable<any> {
  //   const updateAnnouncementUrl = `${environment.baseUrl}/p2p/prequalification/admin/procadmin/verify`;
  //   return this.http.post(updateAnnouncementUrl,{}, {
  //     params:params,
  //     responseType: "text",
  //   });
  // }
  updateAnnouncementStatusProcAdmin(data): Observable<{ message: string }> {
    const preqParamUrl = `${environment.baseUrl}/p2p/prequalification/admin/procadmin/verify`;
    return this.http.put<{ message: string }>(preqParamUrl, data)
  }
  updateAnnouncementStatusDesk(data): Observable<{ message: string }> {
    const preqParamUrl = `${environment.baseUrl}/p2p/prequalification/admin/desk/verify`;
    return this.http.put<{ message: string }>(preqParamUrl, data)
  }


  deleteAnnouncement(dataId: any, username: any): Observable<{ message: string }> {
    const deleteAnnouncementUrl = `${environment.baseUrl}/p2p/prequalification/admin/delete/${dataId}/${username}`;

    return this.http.delete<{ message: string }>(deleteAnnouncementUrl)
  }

  getTenderCategoryById(categoryId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/tendercategories/find/${categoryId}`, {
    });
  }

}
