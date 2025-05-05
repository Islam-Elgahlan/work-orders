import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/admin/services/users.service';
import { DepartmentsService } from '../../sevices/departments.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  hideRequiredMarker: boolean = true
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 100;
  page: number | undefined = 1;
  pageIndex: number = 0;
  departmentData: any
  constructor(
    public dialogRef: MatDialogRef<EditDepartmentComponent>, private _DepartmentsService: DepartmentsService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _UsersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getDepartmentById(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
    // console.log(this.materialForm.value)

  }

  departmentForm = new FormGroup({
    id: new FormControl(this.data),
    name_en: new FormControl(null),
    name_ar: new FormControl(null),
    maintenance_supervisor_id: new FormControl(null),

  })

  getAllUsers() {
    let params = {
      pageSize: this.pageSize,
      page: this.page
    }
    this._UsersService.getAllUsers(params).subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = this.tableResponse.data;
        console.log(this.tableData);

      }
    })
  }

  getDepartmentById(id: number) {
    this._DepartmentsService.onGetDepartmentById(id).subscribe({
      next: (res) => {
        this.departmentData = res.data;
      }, error: (err) => {

      }, complete: () => {
        this.departmentForm.patchValue({
          name_en: this.departmentData?.name_en,
          name_ar: this.departmentData?.name_ar,
          maintenance_supervisor_id: this.departmentData?.maintenance_supervisor_id
        })
      }
    })
  }

}
