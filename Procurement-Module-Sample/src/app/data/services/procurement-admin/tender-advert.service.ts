import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenderAdvertService {

  constructor(private http: HttpClient) { }

  addTenderAdvert(tender): Observable<any> {
    const  addTenderAdvertUrl = `${environment.baseUrl}/p2p/tenderAdvert/add`;

    return this.http.post<any>(addTenderAdvertUrl, tender);
  }

  fetchAllTenderAdverts(): Observable<any> {
    const fetchAllTenderAdvertsUrl = `${environment.baseUrl}/p2p/tenderAdvert/fetchAll`;

    return this.http.get<any>(fetchAllTenderAdvertsUrl);
  }

  fetchTenderAdvertById(id): Observable<any> {
    const fetchTenderAdvertByIdUrl = `${environment.baseUrl}/p2p/tenderAdvert/fetchBy/${id}`;

    return this.http.get<any>(fetchTenderAdvertByIdUrl);
  }

  updateTenderAdvert(tender): Observable<any> {
    const updateTenderAdvertUrl = `${environment.baseUrl}/p2p/tenderAdvert/update`;

    return this.http.put<any>(updateTenderAdvertUrl, tender);
  }

  updateTenderAdvertStatus(params): Observable<any> {
    const updateTenderAdvertStatusUrl = `${environment.baseUrl}/p2p/tenderAdvert/update/status/`;

    return this.http.put<any>(updateTenderAdvertStatusUrl, {}, { params});
  }

  deleteTenderAdvert(id): Observable<any> {
    const deleteTenderAdvertUrl = `${environment.baseUrl}/p2p/tenderAdvert/delete/${id}`;

    return this.http.delete<any>(deleteTenderAdvertUrl);
  }

  getAllPrequalifiedSuppliers(): Observable<any> {
    const getAllPrequalifiedSuppliersUrl = `${environment.baseUrl}/p2p/prequalifiedsuppliers/all`;

    return this.http.get<any>(getAllPrequalifiedSuppliersUrl);
  }

  getSupplierDetails(id): Observable<any> {
    const getSupplierDetailsUrl = `${environment.baseUrl}/p2p/prequalifiedsuppliers/supplierdetails/${id}`;

    return this.http.get<any>(getSupplierDetailsUrl);
  }


  getPrequalifiedSuppliersByCode(categoryCode): Observable<any> {
    const getPrequalifiedSuppliersByCodeUrl = `${environment.baseUrl}/p2p/prequalifiedsuppliers/all/categorycode`;

    return this.http.get<any>(getPrequalifiedSuppliersByCodeUrl, {params: { categorycode: categoryCode }});
  }

  postAdvert(ids, params){
    const postAdvertUrl = `${environment.baseUrl}/p2p/tenderAdvert/post`;

    return this.http.post<any>(postAdvertUrl, ids, { params });
  }

 

}
