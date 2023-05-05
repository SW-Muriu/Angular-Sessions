import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  
  updateCategoryStatus(params: any): Observable<any> {
    const updateExpenseUrl = `${environment.baseUrl}/api/v1/category/update/status`;
    return this.http.put(updateExpenseUrl,{}, {
      params:params,
      responseType: "text",
    });
  }
  

 
}
