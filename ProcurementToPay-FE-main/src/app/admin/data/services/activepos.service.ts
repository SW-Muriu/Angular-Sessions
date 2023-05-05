import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ActivePosService {

  constructor(private http: HttpClient) { }

  getActivePos(): Observable<any[]>{
    const activePosUrl = `${environment.baseUrl}/api/v1/po/all/sent`;

    return this.http.get<any[]>(activePosUrl)
  }

  getActivePoById(poId): Observable<any>{
    const activePoUrl = `${environment.baseUrl}/api/v1/po/find/${poId}`;

    return this.http.get<any>(activePoUrl)
  }

  updateModifiable(modifiableDetails): Observable<any>{
    const updateModifiableUrl = `${environment.baseUrl}/api/v1/po/particulars/modifiable/update`;

    return this.http.put<any>(updateModifiableUrl, modifiableDetails)
  }

  movePoToBills(poId, invoiceNo): Observable<any>{
    const updateModifiableUrl = `${environment.baseUrl}/api/v1/po/movettobill/${poId}/${invoiceNo}`;

    return this.http.put<any>(updateModifiableUrl, {})
  }
  

 
}
