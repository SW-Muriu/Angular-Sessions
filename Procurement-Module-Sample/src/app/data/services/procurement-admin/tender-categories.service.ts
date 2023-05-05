import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenderCategoriesService {

  constructor(private http: HttpClient) { }

  getTenderCategories(): Observable<any> {
    const getTenderCategoriesUrl = `${environment.baseUrl}/p2p/tendercategories/all`;

    return this.http.get<any>(getTenderCategoriesUrl);
  }


  listAllCapexTendercategories(): Observable<any> {
    const listAllCapexTendercategoriesUrl = `${environment.baseUrl}/p2p/tendercategories/all/capex`;

    return this.http.get<any>(listAllCapexTendercategoriesUrl);
  }

  listAllOpexCategories(): Observable<any> {
    const getTenderCategoriesUrl = `${environment.baseUrl}/p2p/tendercategories/all/opex`;

    return this.http.get<any>(getTenderCategoriesUrl);
  }


}
