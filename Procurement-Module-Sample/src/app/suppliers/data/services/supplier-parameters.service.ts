import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
import { Auth } from "../models/auth";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: "root",
})
// /auth/signin
export class SupplierParamsService {
  constructor(private http: HttpClient) { }


  addOrganisationPrams(formData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.baseUrl}/p2p/companyprofile/supplier/add`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  // addOrganisationPrams(organization): Observable<{message: string}>{
  //   const addOrganizationUrl = `${environment.baseUrl}/p2p/companyprofile/supplier/add`;
  
  //   return this.http.post<{message: string}>(addOrganizationUrl, organization)
  // }
  
  getOrganisationPrams(): Observable<any[]>{
    const organizationUrl = `${environment.baseUrl}/api/v1/organisation/all`;
  
    return this.http.get<any[]>(organizationUrl)
  }
  
  updateOrganisationPrams(organization): Observable<{message: string}>{
    const updateOrganizationUrl = `${environment.baseUrl}/p2p/companyprofile/supplier/edit`;
  
    return this.http.put<{message: string}>(updateOrganizationUrl, organization)
  }
  
  getOrganisationPramsById(supplierId): Observable<any>{
    const organizationUrl = `${environment.baseUrl}/p2p/companyprofile/supplier/view/${supplierId}`;
    return this.http.get<any>(organizationUrl)
  }
  
  deleteOrganisationPrams(organizationId): Observable<{message: string}>{
    const deleteOrganizationUrl = `${environment.baseUrl}/api/v1/organisation/delete/${organizationId}`;
  
    return this.http.delete<{message: string}>(deleteOrganizationUrl)
  }
}






















