import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, Subject } from 'rxjs';
import { DepartmentsService } from '../../sevices/departments.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {

  private subject = new Subject<any>;
  constructor(
    private _DepartmentsService: DepartmentsService,
    private spinner: NgxSpinnerService,
    private _ToastrService: ToastrService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.onGetAllDepartments();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.onGetAllDepartments()
      },
    })
  }

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 100;
  page: number | undefined = 1;
  pageIndex: number = 0;
  user_id: number = 0

  onGetAllDepartments() {
    this.spinner.show()
    this._DepartmentsService.onGetDepartment().subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        console.log(this.tableData);

        this.spinner.hide()
      }
    });
  }

  openAddDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      data: this.tableData
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.addDepartment(result)
        this.onGetAllDepartments()
      }
    });
  }

  addDepartment(data: FormGroup) {
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }
    this._DepartmentsService.addDepartment(myData).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Department Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Department');
      },
      complete: () => {

      }

    })
  }

  // Edit Department
  openEditDepartment(id:number) {
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      data: id
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.editDepartment(result,id)
        this.onGetAllDepartments()
      }
    });
  }

  editDepartment(data: FormGroup,id:number) {
    // let myData = new FormData();
    // let myMap = new Map(Object.entries(data.value));
    // for (const [key, value] of myMap) {
    //   myData.append(key, data.value[key]);
    // }
    this._DepartmentsService.editDepartment(data.value,id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Department Update Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Department');
      },
      complete: () => {

      }

    })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.onGetAllDepartments();
  }

  // Delete Department
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
        this.onGetAllDepartments();
      }

    });


  }
  deleteItem(id: number) {
    this._DepartmentsService.deleteDepartment(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        this._ToastrService.error('Delete Department Failed')
      },
      complete: () => {
        this._ToastrService.success('Department Deleted')
      }
    })
  }

}
