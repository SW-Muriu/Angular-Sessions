import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RfqsService {
  constructor(private http: HttpClient) {}

  createRFQ(rfq): Observable<any> {
    const createRFQUrl = `${environment.baseUrl}/p2p/rfque/create`;

    return this.http.post<any>(createRFQUrl, rfq);
  }

  deleteRFQ(id): Observable<any> {
    const createRFQUrl = `${environment.baseUrl}/p2p/rfque/delete/${id}`;

    return this.http.delete<any>(createRFQUrl);
  }

  fetchAllRFQs(): Observable<any> {
    const fetchAllRFQsUrl = `${environment.baseUrl}/p2p/rfque/fetchAll`;

    return this.http.get<any>(fetchAllRFQsUrl);
  }

  fetchAllClosedRFQs(): Observable<any> {
    const fetchAllClosedRFQsUrl = `${environment.baseUrl}/p2p/rfque/fetchAllClosedRFQs`;

    return this.http.get<any>(fetchAllClosedRFQsUrl);
  }

  fetchAllOpenedRFQs(): Observable<any> {
    const fetchAllOpenedRFQsUrl = `${environment.baseUrl}/p2p/rfque/fetchAllOpenedRFQs`;

    return this.http.get<any>(fetchAllOpenedRFQsUrl);
  }

  fetchRFQById(id): Observable<any> {
    const fetchRFQByIdUrl = `${environment.baseUrl}/p2p/rfque/fetchBy/${id}`;

    return this.http.get<any>(fetchRFQByIdUrl);
  }

  fetchRFQByProgress(progress): Observable<any> {
    const fetchRFQByProgressUrl = `${environment.baseUrl}/p2p/rfque/fetchByDeadlineStatus/${progress}`;

    return this.http.get<any>(fetchRFQByProgressUrl);
  }

  fetchRFQByStatus(status): Observable<any> {
    const fetchRFQByStatusUrl = `${environment.baseUrl}/p2p/rfque/fetchByStatus/${status}`;

    return this.http.get<any>(fetchRFQByStatusUrl);
  }

  updateRFQ(rfq): Observable<any> {
    const lockAccountUrl = `${environment.baseUrl}/p2p/rfque/update`;

    return this.http.put<any>(lockAccountUrl, rfq);
  }

  updateRFQProgress(params): Observable<any> {
    const updateRFQProgressUrl = `${environment.baseUrl}/p2p/rfque/updateProgress`;

    return this.http.put<any>(updateRFQProgressUrl, {}, params);
  }

  updateRFQStatus(params, id): Observable<any> {
    const updateRFQStatusUrl = `${environment.baseUrl}/p2p/rfque/updateStatus/${id}`;

    return this.http.put<any>(
      updateRFQStatusUrl,
      {},
      {
        params: {
          id,
          roleFinancial: params.status,
          reason: params.reason,
          modifiedBy: params.modifiedBy,
        },
      }
    );
  }

  postRFQ(ids, params): Observable<any> {
    const postRFQUrl = `${environment.baseUrl}/p2p/rfque/post`;

    return this.http.post<any>(postRFQUrl, ids, { params });
  }

  fetchPostedRFQs(): Observable<any> {
    const fetchPostedRFQsUrl = `${environment.baseUrl}/p2p/rfque/fetch/posted`;

    return this.http.get<any>(fetchPostedRFQsUrl);
  }
}
