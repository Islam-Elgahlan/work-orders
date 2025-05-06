import { Component, Inject, OnInit } from '@angular/core';
import { SourcesComponent } from '../sources/sources.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/admin/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.scss']
})
export class AddSourceComponent implements OnInit{

    currentLang = localStorage.getItem('lang')
    hideRequiredMarker: boolean = true
    tableResponse: any | undefined;
    tableData: any[] | undefined = [];
    pageSize: number | undefined = 100;
    page: number | undefined = 1;
    pageIndex: number = 0;
  
    constructor(
      public dialogRef: MatDialogRef<SourcesComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private _UsersService: UsersService) { }
  
    ngOnInit(): void {
      
    }
  
    onNoClick(): void {
      this.dialogRef.close();
      // console.log(this.materialForm.value)
  
    }
  
    sourcesForm = new FormGroup({
      id: new FormControl(this.data),
      name_en: new FormControl(null,[Validators.required]),
      name_ar: new FormControl(null,[Validators.required]),  
    })
  
}
