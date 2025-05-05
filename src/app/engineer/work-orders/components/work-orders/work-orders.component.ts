import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { WorkOrdersService } from '../../services/work-orders.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss']
})
export class WorkOrdersComponent {
  private subject = new Subject<any>;

  constructor(
    private _WorkOrdersService: WorkOrdersService,
    private _activateRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private _Toastr: ToastrService

  ) {
    // this.orderId = this._activateRoute.snapshot.paramMap.get('id')
    this.userId = localStorage.getItem('id')

  }

  ngOnInit(): void {
    this.onGetAllOrders();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.onGetAllOrders()
      },
    })
  }
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;
  userId:any
  onGetAllOrders() {
    let params = {
      page_size: this.pageSize,
      page: this.page,
      // userName: this.searchValue,
    };
    this.spinner.show()
    this._WorkOrdersService.getAllOrders(this.userId, params).subscribe({
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
    this.onGetAllOrders();
  }
}
