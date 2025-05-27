import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WorkOrdersService } from '../../services/work-orders.service';
import { debounceTime, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';
import { BuildingService } from 'src/app/admin/building/services/building.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportsService } from 'src/app/admin/reports/services/reports.service';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss']
})
export class WorkOrdersComponent implements OnInit {
  hideRequiredMarker: boolean = true;
  buildingList: any
  filterList: any
  buildingId!:number

  private subject = new Subject<any>;

  constructor(
    private _WorkOrdersService: WorkOrdersService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private _Toastr: ToastrService,
    private _buildingService: BuildingService,
    private _ReportsService: ReportsService,

  ) { }
  ngOnInit(): void {
    this.onGetAllOrders();
    this.onGetAllBuilding();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.onGetAllOrders()
        this.onGetAllBuilding();
      },
    })
  }

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;

  // orderForm = new FormGroup(
  //   {
  //     building_id: new FormControl(null),
  //   }
  // );

  //  onSubmit(data: FormGroup) {
  //   this._ReportsService.addReports(data.value).subscribe({
  //     next: (res) => {
  //       this.filterList = res.data
        
  //       this._ToastrService.success('Order Added Succesfuly');
  //     },
  //     error: (err) => {
  //       this._ToastrService.error(
  //         err.message,
  //         'Error in Add  Order'
  //       );
  //     },
  //     complete: () => {

  //     }


  //   })
  // }

  onGetAllOrders() {
    let params = {
      page_size: this.pageSize,
      page: this.page,
      buildingId:this.buildingId
      // userName: this.searchValue,
    };
    this.spinner.show()
    this._WorkOrdersService.getAllOrders(params).subscribe({
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
        this.onGetAllOrders();
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

  onGetAllBuilding() {
    this._buildingService.getBuildings().subscribe({
      next: (res) => {
        this.buildingList = res.data
        console.log(this.buildingList);

      }
    })
  }

}
