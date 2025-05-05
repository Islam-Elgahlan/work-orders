import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent {

  currentLang = localStorage.getItem('lang')

  constructor(
    public dialogRef: MatDialogRef<AddBuildingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildingForm = new FormGroup({
    name_en: new FormControl(null),
    name_ar: new FormControl(null),
    no_of_floors: new FormControl(null),
  })

}
