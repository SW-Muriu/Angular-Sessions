import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  
  updateSubCategoryStatus(params: any): Observable<any> {
    const updateExpenseUrl = `${environment.baseUrl}/api/v1/subcategory/update/status`;
    return this.http.put(updateExpenseUrl,{}, {
      params:params,
      responseType: "text",
    });
  }
  

 
}
