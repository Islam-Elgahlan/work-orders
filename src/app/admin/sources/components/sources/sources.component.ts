import { Component, OnInit } from '@angular/core';
import { SourcesService } from '../../services/sources.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AddSourceComponent } from '../add-source/add-source.component';
import { FormGroup } from '@angular/forms';
import { EditSourceComponent } from '../edit-source/edit-source.component';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;

  private subject = new Subject<any>;
  constructor(private _SourcesService: SourcesService, private spinner: NgxSpinnerService,
    private _ToastrService: ToastrService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.onGetAllSources();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.onGetAllSources()
      },
    })
  }

  onGetAllSources() {
    this.spinner.show()
    this._SourcesService.onGetSources().subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        console.log(this.tableData);
        this.spinner.hide()
      }
    });
  }

  openAddSource() {
    const dialogRef = this.dialog.open(AddSourceComponent, {
      data: this.tableData
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.addSource(result)
        this.onGetAllSources()
      }
    });
  }

  addSource(data: FormGroup) {
    this._SourcesService.addSource(data.value).subscribe({
      next: (res) => {
        this.onGetAllSources()
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
  openEditSource(id: number) {
    const dialogRef = this.dialog.open(EditSourceComponent, {
      data: id
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.editSource(result, id)
        this.onGetAllSources()
      }
    });
  }

  editSource(data: FormGroup, id: number) {
    this._SourcesService.editSource(data.value, id).subscribe({
      next: (res) => {
        this.onGetAllSources()
        this._ToastrService.success(res.message, 'Source Update Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Source');
      },
      complete: () => {

      }

    })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.onGetAllSources();
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
        this.onGetAllSources();
      }

    });


  }
  deleteItem(id: number) {
    this._SourcesService.deleteSource(id).subscribe({
      next: (res) => {
        this.onGetAllSources()
      },
      error: (err) => {
        this._ToastrService.error('Delete Source Failed')
      },
      complete: () => {
        this._ToastrService.success('Source Deleted')
      }
    })
  }

}
