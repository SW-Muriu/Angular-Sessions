import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RfqApplicationService {

  constructor(private http: HttpClient) { }

  bidRFQ(rfq): Observable<any> {
    const  bidRFQUrl = `${environment.baseUrl}/p2p/rfqapplication/bid`;

    return this.http.post<any>(bidRFQUrl, rfq);
  }

  fetchAllRFQApplications(): Observable<any> {
    const fetchAllRFQApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/fetchAll`;

    return this.http.get<any>(fetchAllRFQApplicationsUrl);
  }

  fetchApplications(id): Observable<any> {
    const fetchApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/applications/${id}`;

    return this.http.get<any>(fetchApplicationsUrl);
  }

  fetchAllRFQApprovedApplications(): Observable<any> {
    const fetchAllRFQApprovedApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/fetchAllApprovedRFQApplications`;

    return this.http.get<any>(fetchAllRFQApprovedApplicationsUrl);
  }

  fetchAllRFQPendingApplications(): Observable<any> {
    const fetchAllRFQPendingApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/fetchAllPendingRFQApplications`;

    return this.http.get<any>(fetchAllRFQPendingApplicationsUrl);
  }

  fetchAllUnverifiedRfqApplications(): Observable<any> {
    const fetchAllRFQPendingApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/fetchallunverifiedrfqs`;

    return this.http.get<any>(fetchAllRFQPendingApplicationsUrl);
  }

  fetchAllVerifiedRfqApplications(): Observable<any> {
    const fetchAllVerifiedRfqApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/fetchallveriifedRFQs`;

    return this.http.get<any>(fetchAllVerifiedRfqApplicationsUrl);
  }

  fetchAllRfqApprovedApplicationsByRfqId(rfqid): Observable<any> {
    const fetchAllRFQPendingApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/approved/approvededapplications/${rfqid}`;

    return this.http.get<any>(fetchAllRFQPendingApplicationsUrl);
  }

  fetchRejectedApplicationsinRfqByRfqId(rfqid): Observable<any> {
    const fetchRejectedApplicationsinRfqByRfqIdUrl = `${environment.baseUrl}/p2p/rfqapplication/approved/rejectedapplications/${rfqid}`;

    return this.http.get<any>(fetchRejectedApplicationsinRfqByRfqIdUrl);
  }

  fetchAllVerifedRfqsWithApprovedApplications(): Observable<any> {
    const ffetchAllVerifedRfqsWithApprovedApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/verified/approvedRFQs`;

    return this.http.get<any>(ffetchAllVerifedRfqsWithApprovedApplicationsUrl);
  }

  fetchAllVerifedRfqsWithRejectedApplications(): Observable<any> {
    const fetchAllVerifedRfqsWithRejectedApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/verified/rejectedRFQs`;

    return this.http.get<any>(fetchAllVerifedRfqsWithRejectedApplicationsUrl);
  }



  fetchAllRFQRejectedApplications(): Observable<any> {
    const fetchAllRFQRejectedApplicationsUrl = `${environment.baseUrl}/p2p/rfqapplication/fetchAllRejectedRFQsApplications`;

    return this.http.get<any>(fetchAllRFQRejectedApplicationsUrl);
  }

  fetchRFQApplicationBySupplierId(id): Observable<any> {
    const fetchRFQApplicationByIdUrl = `${environment.baseUrl}/p2p/rfqapplication/fetchSuppliersApplications/${id}`;

    return this.http.get<any>(fetchRFQApplicationByIdUrl);
  }


  reviewRFQApplication(rfq): Observable<any> {
    const reviewRFQApplicationUrl = `${environment.baseUrl}/p2p/rfqapplication/review`;

    return this.http.put<any>(reviewRFQApplicationUrl, rfq);
  }


  sendAprovedRFQApplicationsEmail(rfq): Observable<any> {
    const sendAprovedRFQApplicationsEmailUrl = `${environment.baseUrl}/p2p/rfqapplication/sendApprovedRFQApplicationsEmail`;

    return this.http.put<any>(sendAprovedRFQApplicationsEmailUrl, rfq);
  }

  updateRFQBidApplication(rfqBid): Observable<any> {
    const updateRFQBidApplicationUrl = `${environment.baseUrl}/p2p/rfqapplication/sendApprovedRFQApplicationsEmail`;

    return this.http.put<any>(updateRFQBidApplicationUrl, rfqBid);
  }

  deleteRFQApplication(id): Observable<any> {
    const deleteRFQApplicationUrl = `${environment.baseUrl}/p2p/rfqapplication/delete/${id}`;

    return this.http.delete<any>(deleteRFQApplicationUrl);
  }

  sendRejectedRFQApplication(): Observable<any> {
    const sendRejectedRFQApplicationUrl = `${environment.baseUrl}/p2p/rfqapplication/sendApprovedRFQApplicationsEmail`;

    return this.http.put<any>(sendRejectedRFQApplicationUrl, {});
  }

}
