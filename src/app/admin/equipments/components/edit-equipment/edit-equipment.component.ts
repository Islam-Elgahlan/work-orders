import { Component, Inject, OnInit } from '@angular/core';
import { EquipmentsComponent } from '../equipments/equipments.component';
import { EquipmentsService } from '../../services/equipments.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.scss']
})
export class EditEquipmentComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  sourcesData: any

  constructor(
    public dialogRef: MatDialogRef<EditEquipmentComponent>, private _EquipmentsService: EquipmentsService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getEquipmentById(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  equipmentForm = new FormGroup({
    id: new FormControl(this.data),
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
  })

  getEquipmentById(id: number) {
    this._EquipmentsService.getEquipmentById(id).subscribe({
      next: (res) => {
        this.sourcesData = res.data;
      }, error: (err) => {
        this._ToastrService.error(err.message, 'Equipment id Failed')
      }, complete: () => {
        this.equipmentForm.patchValue({
          name_en: this.sourcesData?.name_en,
          name_ar: this.sourcesData?.name_ar,
        })
      }
    })
  }

}
