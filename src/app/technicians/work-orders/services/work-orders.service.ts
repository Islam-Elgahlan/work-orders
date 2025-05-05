import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  constructor(private _HttpClient:HttpClient) { }
  getOrder(id:number): Observable<any> {
    return this._HttpClient.get(`work-orders/show/${id}`);
  }
  editOrder(data:any , id: number):Observable<any>{
    return this._HttpClient.put(`work-orders/update/${id}`,data)
  }
  getAllOrders(id:number , params:any): Observable<any> {
    return this._HttpClient.get(`work-orders/by_technician/${id}`,{ params: params });
  }
  updateStatus(id:number, data:any):Observable<any>{
    return this._HttpClient.put(`work-orders/${id}/change-status`,data)
   }
   updateOrder(id:number,data:any):Observable<any>{
    return this._HttpClient.put(`work-orders/update-by-engineer/${id}`,data)
   }
   getPartsByOrderId(id:number):Observable<any>{
    return this._HttpClient.get(`work-orders/spare-parts/${id}`)
   }
   getMaterialByOrderId(id:number):Observable<any>{
    return this._HttpClient.get(`work-orders/materials/${id}`)
   }
}
