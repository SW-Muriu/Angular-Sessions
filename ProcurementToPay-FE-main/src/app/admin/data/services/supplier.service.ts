import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  addSupplier(supplier): Observable<{message: string}>{
    const addSupplierUrl = `${environment.baseUrl}/api/v1/supplier/add`;

    return this.http.post<{message: string}>(addSupplierUrl, supplier)
  }

  getSuppliers(): Observable<any[]>{
    const suppliersUrl = `${environment.baseUrl}/api/v1/supplier/all`;

    return this.http.get<any[]>(suppliersUrl)
  }

  updateSupplier(suppplierDetails): Observable<{message: string}>{
    const updateSupplierUrl = `${environment.baseUrl}/api/v1/supplier/update`;

    return this.http.put<{message: string}>(updateSupplierUrl, suppplierDetails)
  }

  getSupplierById(supplierId): Observable<any>{
    const supplierUrl = `${environment.baseUrl}/api/v1/supplier/find/${supplierId}`;

    return this.http.get<any>(supplierUrl)
  }

  deleteSupplier(supplierId): Observable<{message: string}>{
    const deleteSupplierUrl = `${environment.baseUrl}/api/v1/supplier/delete/${supplierId}`;

    return this.http.delete<{message: string}>(deleteSupplierUrl)
  }

  

updateSupplierStatus(params: any): Observable<any> {
  const updateSupplierUrl = `${environment.baseUrl}/api/v1/supplier/update/status`;
  return this.http.put(updateSupplierUrl,{}, {
    params:params,
    responseType: "text",
  });
}


}
