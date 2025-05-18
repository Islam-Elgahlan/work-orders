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
  data: any
  status: any
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

  constructor(
    private _ReportsService: ReportsService,
    private _LookupsService: LookupsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _HelperService: HelperService
  ) { }

  ngOnInit() {
    this.getDepartment()
    this.getAllStatus()
    this.getEngineers()
    this.getTechnicians()
  }

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
  // Status
  getAllStatus() {
    this._ReportsService.getStatus().subscribe(
      (res) => {
        this.status = res.data

      }
    )
  }
  // Department
  getDepartment() {
    this._LookupsService.getDepartment().subscribe(
      (res) => {
        this.departments = res.data

      }
    )
  }
  // Engineers
  getEngineers() {
    this._ReportsService.getEngineers().subscribe(
      (res) => {
        this.engineers = res.data;
        console.log(this.engineers);

      }
    )
  }
  // Technicians
  getTechnicians() {
    this._ReportsService.getTechnicians().subscribe(
      (res) => {
        this.technicians = res.data;
        console.log(this.technicians);

      }
    )
  }

}

