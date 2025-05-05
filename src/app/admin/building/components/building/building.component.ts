import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuildingService } from '../../services/building.service';
import { debounceTime, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';
import { AddBuildingComponent } from '../add-building/add-building.component';
import { EditBuildingComponent } from '../edit-building/edit-building.component';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent {

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;
  buildingData: any

  private subject = new Subject<any>;
  constructor(
    private _BuildingService: BuildingService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private _ToastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.onGetAllBuildings();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.onGetAllBuildings()
      },
    })
  }

  onGetAllBuildings() {
    this.spinner.show()
    this._BuildingService.onGetBuildings().subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        this.spinner.hide()
      }
    });
  }

  // Add Building
  openAddBuilding() {
    const dialogRef = this.dialog.open(AddBuildingComponent, {
      data: this.tableData
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);

      if (result) {
        this.addBuilding(result)
        this.onGetAllBuildings()
      }
    });
  }

  addBuilding(data: FormGroup) {
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }
    this._BuildingService.addBuilding(myData).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Building Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Added Building');
      },
      complete: () => {

      }

    })
  }

  // Edit Building
  openEditBuilding(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(EditBuildingComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      console.log(id);

      if (result) {
        this.editBuilding(result, id)
        this.onGetAllBuildings()
      }
    });
  }

  editBuilding(data: FormGroup, id: number) {
    this._BuildingService.editBuilding(data.value, id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Building Update Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Building');
      },
      complete: () => {

      }
    })

  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.onGetAllBuildings();
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
        this.onGetAllBuildings();
      }

    });


  }
  deleteItem(id: number) {
    this._BuildingService.deleteBuilding(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        this._ToastrService.error('Delete Building Failed')
      },
      complete: () => {
        this._ToastrService.success('Building Deleted')
      }
    })
  }

}

