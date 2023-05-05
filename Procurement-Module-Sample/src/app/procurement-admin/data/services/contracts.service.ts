import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ContractsService {
  constructor(private http: HttpClient) { }


  addContract(data: any): Observable<any> {
    const ContractUrl = `${environment.baseUrl}/p2p/contract/create`;
    return this.http.post<any>(ContractUrl, data);
  }

  getPendingContracts(): Observable<any[]> {
    const pendingContractsUrl = `${environment.baseUrl}/p2p/contract/pending`;

    return this.http.get<any[]>(pendingContractsUrl);
  }
  
  getApprovedContracts(): Observable<any[]> {
    const pendingContractsUrl = `${environment.baseUrl}/p2p/contract/approved`;

    return this.http.get<any[]>(pendingContractsUrl);
  }
  
  getRejectedContracts(): Observable<any[]> {
    const pendingContractsUrl = `${environment.baseUrl}/p2p/contract/rejected`;

    return this.http.get<any[]>(pendingContractsUrl);
  }

  getContractById(ContractId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/p2p/ContractConditions/fetchBy/${ContractId}`, {
      
    });
  }
  updateContract(data): Observable<{ message: string }> {
    const updateContractUrl = `${environment.baseUrl}/p2p/contract/update`;

    return this.http.put<{ message: string }>(updateContractUrl, data)
  }

  updateContractStatus(data): Observable<{ message: string }> {
    const updateContractUrl = `${environment.baseUrl}/p2p/contract/verify`;

    return this.http.put<{ message: string }>(updateContractUrl, data)
  }

  deleteContract(dataId: any): Observable<{ message: string }> {
    const deleteContractUrl = `${environment.baseUrl}/p2p/ContractConditions/delete/${dataId}`;

    return this.http.delete<{ message: string }>(deleteContractUrl)
  }


}
