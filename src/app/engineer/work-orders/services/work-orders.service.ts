import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  constructor(private _HttpClient:HttpClient) { }
  getAllOrders(id:number , params:any): Observable<any> {
    return this._HttpClient.get(`work-orders/by_engineer/${id}`,{ params: params });
  }
  getOrder(id:number): Observable<any> {
   return this._HttpClient.get(`work-orders/show/${id}`);
 }
 editOrder(data:any , id: number):Observable<any>{
   return this._HttpClient.put(`work-orders/update/${id}`,data)
 }
//  Add Matrial APIs
 getMaterialByOrderId(id:number):Observable<any>{
  return this._HttpClient.get(`work-orders/materials/${id}`)
 }
 addMaterial(data:any):Observable<any>{
  return this._HttpClient.post("work-orders/add-materials",data)
 }
 deleteMaterial(id:any):Observable<any>{
  return this._HttpClient.delete(`work-orders/materials/${id}/delete`)
 }
//  Add Parts APIs
getPartsByOrderId(id:number):Observable<any>{
  return this._HttpClient.get(`work-orders/spare-parts/${id}`)
 }
 addParts(data:any):Observable<any>{
  return this._HttpClient.post("work-orders/add-spare-parts",data)
 }
 deleteParts(id:any):Observable<any>{
  return this._HttpClient.delete(`work-orders/spare-parts/${id}/delete`)
 }
 updateStatus(id:number, data:any):Observable<any>{
  return this._HttpClient.put(`work-orders/${id}/change-status`,data)
 }
 updateOrder(id:number,data:any):Observable<any>{
  return this._HttpClient.put(`work-orders/update-by-engineer/${id}`,data)
 }
}
