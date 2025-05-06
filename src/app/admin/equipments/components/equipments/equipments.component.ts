import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { EquipmentsService } from '../../services/equipments.service';
import { AddEquipmentComponent } from '../add-equipment/add-equipment.component';
import { EditEquipmentComponent } from '../edit-equipment/edit-equipment.component';
import { PageEvent } from '@angular/material/paginator';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;

  private subject = new Subject<any>;
  constructor(private _EquipmentsService: EquipmentsService, private spinner: NgxSpinnerService,
    private _ToastrService: ToastrService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.onGetAllEquipments();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.onGetAllEquipments()
      },
    })
  }

  onGetAllEquipments() {
    this.spinner.show()
    this._EquipmentsService.onGetEquipments().subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        console.log(this.tableData);
        this.spinner.hide()
      }
    });
  }

  openAddSource() {
    const dialogRef = this.dialog.open(AddEquipmentComponent, {
      data: this.tableData
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.addDepartment(result)
        this.onGetAllEquipments()
      }
    });
  }

  addDepartment(data: FormGroup) {
    this._EquipmentsService.addEquipment(data.value).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Equipment Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Added Equipment');
      },
      complete: () => {

      }

    })
  }

  // Edit Department
  openEditSource(id: number) {
    const dialogRef = this.dialog.open(EditEquipmentComponent, {
      data: id
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.editSource(result, id)
        this.onGetAllEquipments()
      }
    });
  }

  editSource(data: FormGroup, id: number) {
    this._EquipmentsService.editEquipment(data.value, id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Equipment Update Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Equipment');
      },
      complete: () => {

      }

    })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.onGetAllEquipments();
  }

  // Delete Source
  deleteDialog(data: any): void {
    console.log(data);

    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      if (result) {
        this.deleteItem(result.id)
        this.onGetAllEquipments();
      }

    });
  }

  deleteItem(id: number) {
    this._EquipmentsService.deleteEquipment(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        this._ToastrService.error('Delete Equipment Failed')
      },
      complete: () => {
        this._ToastrService.success('Equipment Deleted')
      }
    })
  }

}
