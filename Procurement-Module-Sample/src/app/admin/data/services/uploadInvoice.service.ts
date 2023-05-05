import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadInvoiceService {
  
  constructor(private http: HttpClient) { }
  upload(file: File, reference_id: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('reference_id', reference_id);
    const req = new HttpRequest('POST', `${environment.baseUrl}/api/v1/documents/upload/documents`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  addInvoice(invoiceDetails): Observable<{message: string}>{
    const addInvoiceUrl = `${environment.baseUrl}/api/v1/supplier/add`;

    return this.http.post<{message: string}>(addInvoiceUrl, invoiceDetails)
  }

}