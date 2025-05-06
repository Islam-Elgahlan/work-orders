import { Component, Inject, OnInit } from '@angular/core';
import { BuildingComponent } from '../building/building.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingService } from '../../services/building.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.scss']
})
export class EditBuildingComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  buildingData: any

  constructor(
    public dialogRef: MatDialogRef<BuildingComponent>, private _BuildingService: BuildingService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getBuildingById(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildingForm = new FormGroup({
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
    no_of_floors: new FormControl(null, [Validators.required]),
  })

  getBuildingById(id: number) {
    this._BuildingService.onGetBuildingById(id).subscribe({
      next: (res) => {
        this.buildingData = res.data;
      }, error: (err) => {

      }, complete: () => {
        this.buildingForm.patchValue({
          name_en: this.buildingData?.name_en,
          name_ar: this.buildingData?.name_ar,
          no_of_floors: this.buildingData?.no_of_floors
        })
      }
    })
  }


}
