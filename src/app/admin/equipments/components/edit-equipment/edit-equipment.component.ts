import { Component, Inject, OnInit } from '@angular/core';
import { EquipmentsComponent } from '../equipments/equipments.component';
import { EquipmentsService } from '../../services/equipments.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.scss']
})
export class EditEquipmentComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  hideRequiredMarker: boolean = true
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 100;
  page: number | undefined = 1;
  pageIndex: number = 0;
  sourcesData: any

  constructor(
    public dialogRef: MatDialogRef<EquipmentsComponent>, private _EquipmentsService: EquipmentsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getDepartmentById(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
    // console.log(this.materialForm.value)

  }

  equipmentForm = new FormGroup({
    id: new FormControl(this.data, [Validators.required]),
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
  })

  getDepartmentById(id: number) {
    this._EquipmentsService.onGetEquipmentById(id).subscribe({
      next: (res) => {
        this.sourcesData = res.data;
      }, error: (err) => {

      }, complete: () => {
        this.equipmentForm.patchValue({
          name_en: this.sourcesData?.name_en,
          name_ar: this.sourcesData?.name_ar,
        })
      }
    })
  }

}
