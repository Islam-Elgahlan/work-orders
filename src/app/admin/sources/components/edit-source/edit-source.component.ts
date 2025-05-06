import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SourcesService } from '../../services/sources.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.scss']
})
export class EditSourceComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  sourcesData: any

  constructor(
    public dialogRef: MatDialogRef<EditSourceComponent>, private _SourcesService: SourcesService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSourceById(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sourcesForm = new FormGroup({
    id: new FormControl(this.data),
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
  })

  getSourceById(id: number) {
    this._SourcesService.getSourceById(id).subscribe({
      next: (res) => {
        this.sourcesData = res.data;
      }, error: (err) => {
        this._ToastrService.error(err.message, 'Source id Failed')
      }, complete: () => {
        this.sourcesForm.patchValue({
          name_en: this.sourcesData?.name_en,
          name_ar: this.sourcesData?.name_ar,
        })
      }
    })
  }

}
