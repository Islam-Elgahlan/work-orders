import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }
  // getAllUsers(params: any): Observable<any> {
  //   return this._HttpClient.get('auth/get_all_users', { params: params });
  // }
  getAllUsers(params: any): Observable<any> {
    return this._HttpClient.get('auth/get_all_users', { params: params });
  }
  getUser(id: number): Observable<any> {
    return this._HttpClient.get(`profile/get_user_by_id/${id}`);
  }
  onBlockOrUnblockUser(param: any): Observable<any> {
    return this._HttpClient.post('auth/change_status', {}, { params: param });
  }
  onEditUser(data:any , id:number ):Observable<any>{
    return this._HttpClient.put(`profile/update_user_by_id/${id}`, data);
  }
  // Lookups
  onGetAccountType(): Observable<any> {
    return this._HttpClient.get('work-orders/lookups/titles');
  }
  onGetDepartment(): Observable<any> {
    return this._HttpClient.get('work-orders/lookups/departments');
  }
 
}
