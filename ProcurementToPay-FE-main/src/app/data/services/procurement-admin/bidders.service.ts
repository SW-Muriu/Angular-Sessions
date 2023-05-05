import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiddersService {

  constructor(private http: HttpClient) { }

  getAllBidders(): Observable<any> {
    const getAllBiddersUrl = `${environment.baseUrl}/p2p/suppliers/admin/view`;

    return this.http.get<any>(getAllBiddersUrl);
  }

  getAllInactiveAccounts(): Observable<any> {
    const getAllInactiveAccountsUrl = `${environment.baseUrl}/p2p/suppliers/admin/inactiveaccounts`;

    return this.http.get<any>(getAllInactiveAccountsUrl);
  }

  getAllLockedAccounts(): Observable<any>{
    const getAllLockedAccountsUrl = `${environment.baseUrl}/p2p/suppliers/admin/lockedaccounts`;

    return this.http.get<any>(getAllLockedAccountsUrl);
  }

  getDeletedAccounts(): Observable<any>{
    const getDeletedAccountsUrl = `${environment.baseUrl}/p2p/suppliers/admin/deletedaccounts`;

    return this.http.get<any>(getDeletedAccountsUrl);
  }

  getBidderDetailsById(id): Observable<any>{
    const getBidderDetailsByIdUrl = `${environment.baseUrl}/p2p/suppliers/admin/find/${id}`;

    return this.http.get<any>(getBidderDetailsByIdUrl);
  }

  lockAccount(user): Observable<any>{
    const lockAccountUrl = `${environment.baseUrl}/p2p/suppliers/admin/lockaccount`;

    return this.http.put<any>(lockAccountUrl, user);
  }

  deleteAccount(user) {
    const deleteAccountUrl = `${environment.baseUrl}/p2p/suppliers/admin/deleteaccount`;

    return this.http.put<any>(deleteAccountUrl, user);
  }

  activateBidderAccount(user): Observable<any> {
    const activateBidderAccountUrl = `${environment.baseUrl}/p2p/suppliers/admin/activateaccount`;

    return this.http.put<any>(activateBidderAccountUrl, user);
  }

  restoreAccount(user): Observable<any> {
    const restoreAccountUrl = `${environment.baseUrl}/p2p/suppliers/admin/restoreaccount`;

    return this.http.put<any>(restoreAccountUrl, user);
  }

  updateBidderPassword(user) {
    const updateBidderPasswordsUrl = `${environment.baseUrl}/p2p/suppliers/admin/updatepassword`;

    return this.http.put<any>(
      updateBidderPasswordsUrl,
      user
    );
  }
}
