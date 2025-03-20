import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { UsersService } from 'src/app/admin/services/users.service';
import { BlockUsersComponent } from './block-users/block-users.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  private subject = new Subject<any>;
  constructor(
    private _UsersService:UsersService ,
    private _ToastrService:ToastrService ,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,

  ){}

  ngOnInit():void{
    this.onGetAllUsers();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.onGetAllUsers()
      },
    })
  }

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5 ;
  page :number | undefined = 1;
  pageIndex: number = 0;
  
  onGetAllUsers() {
    let params = {
      page_size: this.pageSize,
      page: this.page,
      // userName: this.searchValue,
    };
    this.spinner.show()
    this._UsersService.getAllUsers(params).subscribe({
      next: (res) => {

        this.tableResponse = res;
        this.tableData = res?.data;
        // console.log(this.tableResponse.meta.total);
        console.log(this.tableData)
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
    this.onGetAllUsers();
  }

  openBlockDialog(item: any) {
    const dialogRef = this.dialog.open(BlockUsersComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onBlockUser(result);
      }
    });
  }

  onBlockUser(id: number) {
    this._UsersService.onBlockOrUnblockUser(id).subscribe({
      next: (res) => {
        this._ToastrService.success(
          res.isActivated
            ? 'This user was Unblocked Successfully'
            : 'This user was blocked Successfully',
          'Done'
        );

      },
      error: (err) => {
        this._ToastrService.error('Can’tBlock this User', 'Error');
      },
      complete: () => {
        this.onGetAllUsers();
      },
    });
  }
}
