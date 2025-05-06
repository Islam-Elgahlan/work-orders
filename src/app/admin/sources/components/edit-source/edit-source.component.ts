import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SourcesService } from '../../services/sources.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SourcesComponent } from '../sources/sources.component';

@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.scss']
})
export class EditSourceComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  hideRequiredMarker: boolean = true
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 100;
  page: number | undefined = 1;
  pageIndex: number = 0;
  sourcesData: any

  constructor(
    public dialogRef: MatDialogRef<SourcesComponent>, private _SourcesService: SourcesService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getDepartmentById(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
    // console.log(this.materialForm.value)

  }

  sourcesForm = new FormGroup({
    id: new FormControl(this.data),
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
  })

  getDepartmentById(id: number) {
    this._SourcesService.onGetSourceById(id).subscribe({
      next: (res) => {
        this.sourcesData = res.data;
      }, error: (err) => {

      }, complete: () => {
        this.sourcesForm.patchValue({
          name_en: this.sourcesData?.name_en,
          name_ar: this.sourcesData?.name_ar,
        })
      }
    })
  }

}
