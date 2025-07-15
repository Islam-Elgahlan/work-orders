import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { UsersService } from 'src/app/admin/services/users.service';
import { BlockUsersComponent } from './block-users/block-users.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

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
  user_id : number = 0
  
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
      // result = this.user_id
      if (result) {
        this.onBlockUser({user_id:result});
      }
    });
  }

  onBlockUser(id: any) {
    // let params = {user_id:id}
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
        this._ToastrService.error('Can’t Block this User', 'Error');
      },
      complete: () => {
        this.onGetAllUsers();
      },
    });
  }
   // delete User
    deleteDialog(data: any): void {
      console.log(data);
      
      const dialogRef = this.dialog.open(DeleteItemComponent, {
        data: data,
        width: '30%'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteItem(result.id)
        }
      });
    }
    deleteItem(id: number) {
      this._UsersService.deleteUser(id).subscribe({
        next: (res) => {
          this._ToastrService.success('User Deleted')
        },
        error: (err) => {
          this._ToastrService.error('Delete User Failed')
        },
        complete: () => {
        this.onGetAllUsers();
        }
      })
    }
}
