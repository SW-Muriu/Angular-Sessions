import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
import { Auth } from "../models/auth";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: "root",
})
// /auth/signin
export class AuthService {
  constructor(private http: HttpClient) { }

  // http://3.13.214.62:1905/urassauth/soa/auth
  ///p2p/auth/signin

  login(user: any): Observable<Auth> {
    return this.http.post<Auth>(
      `${environment.baseUrl}/p2p/auth/signin`,
      user,
      httpOptions
    );
  }

  register(user: any): Observable<{ message: string }> {
    const registerUrl = `${environment.baseUrl}/p2p/auth/signup`;

    return this.http.post<{ message: string }>(registerUrl, user)
  }

  onboardUser(user): Observable<{ message: string }> {
    const onboardUserUrl = `${environment.baseUrl}/p2p/otherusers/signup`;

    return this.http.post<{ message: string }>(onboardUserUrl, user)
  }

  resetPassword(params: any): Observable<{ message: string }> {
    const resetPasswordUrl = `${environment.baseUrl}/p2p/reset/change-password`;

    return this.http.post<{ message: string }>(
      resetPasswordUrl,
      params
    );
  }

  forgotPassword(params: any): Observable<{ message: string }> {
    const resetPasswordUrl = `${environment.baseUrl}/p2p/reset/send-token`;

    return this.http.post<{ message: string }>(resetPasswordUrl, params);
  }
}
