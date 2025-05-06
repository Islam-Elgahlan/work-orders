import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentsService } from '../../services/equipments.service';
import { EquipmentsComponent } from '../equipments/equipments.component';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  hideRequiredMarker: boolean = true
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 100;
  page: number | undefined = 1;
  pageIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EquipmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _EquipmentsService: EquipmentsService) { }

  ngOnInit(): void {

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


}
