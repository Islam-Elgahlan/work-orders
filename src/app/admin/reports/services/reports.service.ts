import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private _httpClient: HttpClient) { }

  addReports(data: any): Observable<any> {
    return this._httpClient.post(`work-orders/custom-filter`, data)
  }
  getStatus(): Observable<any> {
    return this._httpClient.get(`work-orders/lookups/statuses`)
  }
  getEngineers(): Observable<any> {
    return this._httpClient.get(`auth/get_engineers/10/1`)
  }
  getTechnicians(): Observable<any> {
    return this._httpClient.get(`auth/get_technicians/10`)
  }
}
