import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RfqEvaluationService {

  constructor(private http: HttpClient) { }

  evaluateRfqApplicaction(id): Observable<any> {
    const evaluateRfqApplicactionUrl = `${environment.baseUrl}/p2p/rfqevaluation/evaluate/${id}`;

    return this.http.get<any>(evaluateRfqApplicactionUrl);
  }

  fetchSystemWinner(): Observable<any> {
    const fetchSystemWinnerUrl = `${environment.baseUrl}/p2p/rfqevaluation/evaluation/highestscore`;

    return this.http.get<any>(fetchSystemWinnerUrl);
  }

  getRfqApprovedEvaluations(): Observable<any> {
    const fetchSystemWinnerUrl = `${environment.baseUrl}/p2p/rfqevaluation/rfqapplications/approved`;

    return this.http.get<any>(fetchSystemWinnerUrl);
  }

  getRfqPartialEvaluations(): Observable<any> {
    const fetchSystemWinnerUrl = `${environment.baseUrl}/p2p/rfqevaluation/rfqapplications/partial`;

    return this.http.get<any>(fetchSystemWinnerUrl);
  }

  getRfqPendingEvaluations(): Observable<any> {
    const getRfqPendingEvaluationsUrl = `${environment.baseUrl}/p2p/rfqevaluation/rfqapplications/pending`;

    return this.http.get<any>(getRfqPendingEvaluationsUrl);
  }


  getRejectedRfqEvaluations(): Observable<any> {
    const getRejectedRfqEvaluationsUrl = `${environment.baseUrl}/p2p/rfqevaluation/rfqapplications/rejected`;

    return this.http.get<any>(getRejectedRfqEvaluationsUrl);
  }

  getApprovedFinancialRfqEvaluations(): Observable<any> {
    const getApprovedFinancialRfqEvaluationsUrl = `${environment.baseUrl}/p2p/rfqevaluation/rolefinancial/approved`;

    return this.http.get<any>(getApprovedFinancialRfqEvaluationsUrl);
  }

  getApprovedProcurementRfqEvaluations(): Observable<any> {
    const getApprovedProcurementRfqEvaluationsUrl = `${environment.baseUrl}/p2p/rfqevaluation/roleprocurement/approved`;

    return this.http.get<any>(getApprovedProcurementRfqEvaluationsUrl);
  }

  getApprovedTechnicalRfqEvaluations(): Observable<any> {
    const getApprovedProcurementRfqEvaluationsUrl = `${environment.baseUrl}/p2p/rfqevaluation/roletechnical/approved`;

    return this.http.get<any>(getApprovedProcurementRfqEvaluationsUrl);
  }

  evaluateSystemResults(params): Observable<any> {
    const lockAccountUrl = `${environment.baseUrl}/p2p/rfqevaluation/update/evaluationstatus`;

    return this.http.put<any>(lockAccountUrl, {}, params);
  }

  

  test(): Observable<any> {
    const header = { Accept: "application/octet-stream", responseType: "blob" };
    
    const lockAccountUrl = "http://192.168.100.56:9001/api/v1/reports/export/excel";

    return this.http.get<any>(lockAccountUrl);
  }
}
