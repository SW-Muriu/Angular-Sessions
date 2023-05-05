import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/admin/modules/users/data/types/account';
import { Role } from 'src/app/core/models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {

  constructor(private http: HttpClient) { }

  public addMemberToCommittee(userDetails): Observable<any>{
    const addMemberToCommitteeUrl = `${environment.baseUrl}/p2p/committee/addmember`;

    return this.http.put<any>(addMemberToCommitteeUrl,  userDetails);
  }

  public listAllCommitteeMembers(): Observable<any> {
    const rlistAllCommitteeMembersUrl = `${environment.baseUrl}/p2p/committee/allmembers`;

    return this.http.get<any>(rlistAllCommitteeMembersUrl);
  }

  public getAllCommitteeRoles(): Observable<any> {
    const getAllCommitteeRolesUrl = `${environment.baseUrl}/p2p/committee/allroles`;

    return this.http.get<any>(getAllCommitteeRolesUrl);
  }

  public updateRole(roleDetails): Observable<{ message: string }> {
    const updateRoleUrl = `${environment.baseUrl}/p2p/users/updaterole`;

    return this.http.put<{ message: string }>(updateRoleUrl, roleDetails);
  }


  public removeMemberFromCommittee(userId): Observable<any> {
    const removeMemberFromCommitteeUrl = `${environment.baseUrl}/p2p/committee/removemember/${userId}`;

    return this.http.put<any>(removeMemberFromCommitteeUrl, {});
  }

  public getAllUsers(): Observable<any> {
    const getAllUsersUrl = `${environment.baseUrl}/p2p/committee/allusers`;

    return this.http.get<any>(getAllUsersUrl);
  }

  public getuserDetailsById(userId): Observable<any> {
    const getuserDetailsByIdUrl = `${environment.baseUrl}/p2p/committee/finduser/${userId}`;

    return this.http.get<any>(getuserDetailsByIdUrl);
  }
}
