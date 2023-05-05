



import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class AnnouncementService {
  constructor(private http: HttpClient) { }

 

  addAnnouncement(data: any): Observable<any> {
    const announceUrl = `${environment.baseUrl}/p2p/tendercategories/add`;

    return this.http.post<any>(announceUrl, data);
  }

  getAnnouncements(): Observable<any[]> {
    const activeBillsUrl = `${environment.baseUrl}/p2p/tendercategories/all`;

    return this.http.get<any[]>(activeBillsUrl);
  }

  // getAnnouncementById(id: any): Observable<any> {
  //   return this.http.get(`${environment.baseUrl}/P2PSolution/p2p/prequalification/admin/findbyid/${id}`, {
      
  //   });
  // }

  getAnnouncementById(id: any): Observable<any>{
    const announcementUrl = `${environment.baseUrl}/p2p/prequalification/admin/findbyid/${id}`;
    return this.http.get<any>(announcementUrl)
  }
  
  
}
