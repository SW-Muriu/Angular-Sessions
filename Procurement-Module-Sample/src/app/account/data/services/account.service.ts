import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../types/user";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}

 

  getUserById(userId): Observable<User> {
    const getUserByIdUrl = `${environment.baseUrl}/p2p/otherusers/find/${userId}`;

    return this.http.get<User>(getUserByIdUrl);
  }


  updatePassword(user): Observable<{ message: string }> {
    const updatePasswordUrl = `${environment.baseUrl}/p2p/otherusers/changepassword`;

    return this.http.put<{ message: string }>(updatePasswordUrl, user);
  }

  updateProfile(profileBody):Observable<{message:string}>{
    const updatePasswordUrl = `${environment.baseUrl}/p2p/otherusers/updateprofile`;

    return this.http.put<{message: string}>(updatePasswordUrl, profileBody)
  }
}
