import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  ngOnInit() {
    this.getDepartment()
  }

  constructor(
    private _ReportsService: ReportsService,
    private _LookupsService: LookupsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _HelperService: HelperService
  ) { }

  data: any
  departments: any
  departmentId: any
  supervisor: any
  engineers: any
  technicians: any
  start_date: any
  date: any

  hide: boolean = true;
  confirmHide: boolean = true;
  hideRequiredMarker: boolean = true;

  reportForm = new FormGroup(
    {
      status: new FormControl(0),
      department_id: new FormControl(null),
      engineer_id: new FormControl(null),
      technician_id: new FormControl(null),
      from_date: new FormControl(null),
      to_date: new FormControl(null)
    }
  );

  onSubmit(data: FormGroup) {
    // let myData = new FormData();
    // let myMap = new Map(Object.entries(data.value));
    // for (const [key, value] of myMap) {
    //   myData.append(key, data.value[key]);
    // }
    // myData.append('from_date', data.value.from_date?.toISOString().slice(0, 10));
    // myData.append('to_date', data.value.to_date?.toISOString().slice(0, 10));
    this._ReportsService.addReports(data.value).subscribe({
      next: (res) => {
        this.data = res.data
        console.log(data.value);
        this._ToastrService.success('Report Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(
          err.message,
          'Error in Add  Report'
        );
      },
      complete: () => {

      }


    })
  }
  // Department
  getDepartment() {
    this._LookupsService.getDepartment().subscribe(
      (res) => {
        this.departments = res.data

      }
    )
  }
  onselectDepartment() {
    this.supervisor = 'ssss'
    this.getEngineers(this.departmentId)
    this.getTechnicians(this.departmentId)
  }
  // Engineers
  getEngineers(id: number) {
    this._HelperService.getEngineers(id).subscribe(
      (res) => {
        this.engineers = res.data;
      }
    )
  }
  // Technicians
  getTechnicians(id: number) {
    this._HelperService.getTechnicians(id).subscribe(
      (res) => {
        this.technicians = res.data;
      }
    )
  }

}

