import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/models/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  title :string |null = ''
  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem('token')!==null){
      // console.log(localStorage.getItem('token'))
      this.getProfile()
    }
   }

   getProfile(){
    let encoded: any = localStorage.getItem('token');
    let decoded: any = jwtDecode(encoded);
    // localStorage.setItem('title', da)
    console.log(decoded.name)
   
    this.getRole()
   }

   getRole() {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('title')
    ) {
      this.title = localStorage.getItem('title');
    }
  }


  onLogin(data: ILogin): Observable<any> {
    return this._HttpClient.post('auth/login', data);
  }


  onRegister(data:any):Observable<any>{
    return this._HttpClient.post('auth/register' , data)
  }
  onEditProfile(data:any):Observable<any>{
    return this._HttpClient.post(`profile/update` , data)
  }
  onEditUer(data:any , id:any):Observable<any>{
    return this._HttpClient.post(`profile/update_user_by_id/${id}` , data)
  }
  getUserById(id:number):Observable<any>{
    return this._HttpClient.get(`profile/get_user_by_id/${id}`)
  }
}
