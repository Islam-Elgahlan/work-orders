import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor(private _HttpClient: HttpClient) { }

  getEquipments(): Observable<any> {
    return this._HttpClient.get('equipments');
  }

  getEquipmentById(id: number): Observable<any> {
    return this._HttpClient.get(`equipments/show/${id}`);
  }

  addEquipment(data: any): Observable<any> {
    return this._HttpClient.post("equipments/create", data)
  }

  editEquipment(data: any, id: number): Observable<any> {
    return this._HttpClient.put(`equipments/update/${id}`, data)
  }

  deleteEquipment(id: number): Observable<any> {
    return this._HttpClient.delete(`equipments/delete/${id}`)
  }
}
