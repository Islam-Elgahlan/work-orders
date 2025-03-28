import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient:HttpClient) { }
  // getAllUsers(params: any): Observable<any> {
  //   return this._HttpClient.get('auth/get_all_users', { params: params });
  // }
  getAllUsers(params:any): Observable<any> {
    return this._HttpClient.get('auth/get_all_users',{ params: params });
  }
  getUser(id:number): Observable<any> {
    return this._HttpClient.get(`profile/get_user_by_id/${id}`);
  }
  onBlockOrUnblockUser(id: number): Observable<any> {
    return this._HttpClient.put(`auth/change_status/${id}`,{})
  }
}
