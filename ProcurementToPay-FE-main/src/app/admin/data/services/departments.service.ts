import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  // /p2p/departments/add
  
  addDepartment(data: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}` + "/p2p/departments/add",
      data
    );
  }
  getDepartmentById(id: number): Observable<any> {
    return this.http.get<any[]>(
      `${environment.baseUrl}/p2p/departments/find/${id}`
    );
  }
  updateDepartment(details: any): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}` + `/p2p/departments/edit`,
      details
    );
  }
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/p2p/departments/delete/${id}`,
      { responseType: "text" }
    );
  }
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.baseUrl}/p2p/departments/view`
    );
  }
  

 
}






