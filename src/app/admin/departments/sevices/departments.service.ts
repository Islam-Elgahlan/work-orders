import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private _HttpClient: HttpClient) { }

  onGetDepartment(): Observable<any> {
    return this._HttpClient.get('departments');
  }

  onGetDepartmentById(id:number): Observable<any> {
    return this._HttpClient.get(`departments/show/${id}`);
  }

  addDepartment(data: any): Observable<any> {
    return this._HttpClient.post("departments/create", data)
  }

  editDepartment(data: any, id: number): Observable<any> {
    return this._HttpClient.put(`departments/update/${id}`, data)
  }
  
  deleteDepartment(id: number): Observable<any> {
    return this._HttpClient.delete(`departments/delete/${id}`)
  }

}
