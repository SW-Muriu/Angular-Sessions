import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http: HttpClient) { }

  public getTaxes(): Observable<any> {
    const getTaxesUrl = `${environment.baseUrl}/api/v1/tax/taxes`;

    return this.http.get<any>(getTaxesUrl);
  }
}
