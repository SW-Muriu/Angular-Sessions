import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Account } from "../types/account";
import { Log } from "../types/log";
import { Role } from "../types/role";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}

  //http://52.15.152.26:1905/urassauth/

  public listActiveAccounts(): Observable<Account[]> {
    const activeAccountsUrl = `${environment.baseUrl}/p2p/users/view`;

    return this.http.get<Account[]>(activeAccountsUrl);
  }

  public addUser(account: any): Observable<{ message: string }> {
    const registerUrl = `${environment.baseUrl}/p2p/users/signup`;

    return this.http.post<{ message: string }>(registerUrl, account);
  }

  public getRoles(): Observable<Role[]> {
    const rolesUrl = `${environment.baseUrl}/p2p/roles/view`;

    return this.http.get<Role[]>(rolesUrl);
  }

  public updateRole(roleDetails): Observable<{ message: string }> {
    const updateRoleUrl = `${environment.baseUrl}/p2p/users/updaterole`;

    return this.http.put<{ message: string }>(updateRoleUrl, roleDetails);
  }

  public activateUserAccount(userDetails): Observable<{ message: string }> {
    const activateUserAccountUrl = `${environment.baseUrl}/p2p/users/activateaccount`;

    return this.http.put<{ message: string }>(
      activateUserAccountUrl,
      userDetails
    );
  }

  deactivateUserAccount(userDetails): Observable<{ message: string }> {
    const deactivateUserAccountUrl = `${environment.baseUrl}/p2p/users/activateaccount`;

    return this.http.put<{ message: string }>(
      deactivateUserAccountUrl,
      userDetails
    );
  }

  public lockUserAccount(userDetails): Observable<{ message: string }> {
    const lockUserUrl = `${environment.baseUrl}/p2p/users/lockaccount`;

    return this.http.put<{ message: string }>(lockUserUrl, userDetails);
  }

  public unlockUserAccount(userDetails): Observable<{ message: string }> {
    const lockUserUrl = `${environment.baseUrl}/p2p/users/lockaccount`;

    return this.http.put<{ message: string }>(lockUserUrl, userDetails);
  }

  public deleteUser(username): Observable<{ message: string }> {
    const deleteUrl = `${environment.baseUrl}/p2p/users/deleteaccount`;

    return this.http.put<{ message: string }>(deleteUrl, username);
  }

  public restoreDeletedAccount(username): Observable<{ message: string }> {
    const restoreDeletedaccountUrl = `${environment.baseUrl}/p2p/users/restoreaccount`;

    return this.http.put<{ message: string }>(
      restoreDeletedaccountUrl,
      username
    );
  }

  public getUserById(userId): Observable<Account> {
    const usersUrl = `${environment.baseUrl}/p2p/users/find/${userId}`;

    return this.http.get<Account>(usersUrl);
  }
  public getDeletedAccounts(): Observable<Account[]> {
    const deletedAccountsUrl = `${environment.baseUrl}/p2p/users/deletedaccounts`;

    return this.http.get<Account[]>(deletedAccountsUrl);
  }

  public getLockedAccounts(): Observable<Account[]> {
    const lockedAccountsUrl = `${environment.baseUrl}/p2p/users/lockedaccounts`;

    return this.http.get<Account[]>(lockedAccountsUrl);
  }

  public getInactiveAccounts(): Observable<Account[]> {
    const inactiveAccountsUrl = `${environment.baseUrl}/p2p/users/inactiveaccounts`;

    return this.http.get<Account[]>(inactiveAccountsUrl);
  }

  public logoutUser(username): Observable<{ message: string }> {
    const logoutUrl = `${environment.baseUrl}/p2p/auth/logout`;

    return this.http.post<{ message: string }>(logoutUrl, username);
  }

  public updateDepartment(userDetails): Observable<{ message: string }> {
    const updateDepartmentsUrl = `${environment.baseUrl}/p2p/users/updatedepartment`;

    return this.http.put<{ message: string }>(
      updateDepartmentsUrl,
      userDetails
    );
  }

  public updateUserPassword(passwordDetails): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.baseUrl}/p2p/users/updatepassword`;

    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }

  public updateFirstTimePassword(passwordDetails): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.baseUrl}/ebm/auth/resetpassword`;

    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }


  public updateUser(user): Observable<{ message: string }> {
    const updateUserUrl = `${environment.baseUrl}/p2p/users/update`;

    return this.http.put<{ message: string }>(updateUserUrl, user);
  }

  public getAccountLogs(username): Observable<Log[]> {
    const accountLogsUrl = `${environment.baseUrl}/p2p/audit/alllogs/${username}`;

    return this.http.get<Log[]>(accountLogsUrl);
  }

  public getDailyAccountLogs(uname, stime): Observable<Log[]> {
    const dailyAccountLogsUrl = `${environment.baseUrl}/p2p/audit/todaylogs`;

    return this.http.get<Log[]>(dailyAccountLogsUrl, {
      params: { uname, stime },
    });
  }

  addLimit(limitConfig: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/emtbulksmsapi/ebs/smslimits/add`,
      limitConfig
    );
  }

  public getLimitByUsername(userName): Observable<any> {
    const usersUrl = `${environment.baseUrl}/ebs/smslimits/list/${userName}`;

    return this.http.get<any>(usersUrl);
  }

  addEmailLimit(limitConfig: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/p2p/limits/add`,
      limitConfig
    );
  }

  public updateUserDepartment(user): Observable<{ message: string }> {
    const updateUserUrl = `${environment.baseUrl}/p2p/users/updatedepartment`;

    return this.http.put<{ message: string }>(updateUserUrl, user);
  }

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.baseUrl}/p2p/departments/view`
    );
  }
}
