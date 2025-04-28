import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

   constructor(private _HttpClient:HttpClient) { }
   getAllOrders(params:any): Observable<any> {
     return this._HttpClient.get('work-orders',{ params: params });
   }
   getOrder(id:number): Observable<any> {
    return this._HttpClient.get(`work-orders/show/${id}`);
  }
  editOrder(data:any , id: number):Observable<any>{
    return this._HttpClient.put(`work-orders/update/${id}`,data)
  }
}
