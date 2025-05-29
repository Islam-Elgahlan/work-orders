import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WorkOrdersService } from '../../services/work-orders.service';
import { debounceTime, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';
import { BuildingService } from 'src/app/admin/building/services/building.service';
import { ReportsService } from 'src/app/admin/reports/services/reports.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LookupsService } from 'src/app/services/lookups.service';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss']
})
export class WorkOrdersComponent implements OnInit {
  hideRequiredMarker: boolean = true;
  buildingList: any
  data: any
  workTypeList: any
  status: any
  departments: any
  engineers: any
  technicians: any
  filterList: any
  buildingId: any
  workTypeId: any
  searchValue: any
  currentLang = localStorage.getItem('lang')

  private subject = new Subject<any>;

  constructor(
    private _WorkOrdersService: WorkOrdersService,
    private _LookupsService: LookupsService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private _Toastr: ToastrService,
    private _buildingService: BuildingService,
    private _ReportsService: ReportsService,

  ) { }

  ngOnInit(): void {
    this.allOrders();
    this.getAllStatus()
    this.getDepartment()
    this.getEngineers()
    this.getTechnicians()
    this.allWorkType()
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.allOrders()
        this.getAllStatus()
        this.getDepartment()
        this.getEngineers()
        this.getTechnicians()
        this.allWorkType()
      },
    })
  }

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;

  allOrders() {
    let params = {
      page_size: this.pageSize,
      page: this.page,
      // building_id: this.buildingId,
      work_type_id: this.workTypeId,
      userName: this.searchValue,
    };
    this.spinner.show()
    this._ReportsService.addReports(params).subscribe({
      next: (res) => {

        this.tableResponse = res;
        this.tableData = res?.data;
        // console.log(this.tableResponse.meta.total);
        console.log(res)
        this.spinner.hide()
      },
      error: (err) => { },
      complete: () => { },
    });
  }


  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.allOrders();
  }

  deleteDialog(data: any): void {
    // console.log(data);
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      if (result) {
        this.deleteItem(result.id)
        this.allOrders();
      }
    });
  }
  deleteItem(id: number) {
    this._WorkOrdersService.deleteOrder(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        this._Toastr.error('delete order failed')
      },
      complete: () => {
        this._Toastr.success('Order Deleted')
      }
    })
  }

  allWorkType() {
    this._ReportsService.getWorkType().subscribe({
      next: (res) => {
        this.workTypeList = res.data
        console.log(res);

      }
    })
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
      }
    )
  }
  // Technicians
  getTechnicians() {
    this._ReportsService.getTechnicians().subscribe(
      (res) => {
        this.technicians = res.data;
      }
    )
  }

}
