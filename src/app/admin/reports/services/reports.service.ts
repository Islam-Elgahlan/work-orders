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
}
