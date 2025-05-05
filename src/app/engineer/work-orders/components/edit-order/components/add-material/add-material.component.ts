import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUsersComponent } from 'src/app/admin/admin-users/components/users/block-users/block-users.component';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent {
  currentLang  = localStorage.getItem('lang')

  constructor(
    public dialogRef: MatDialogRef<BlockUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
    // console.log(this.materialForm.value)

  }

  materialForm = new FormGroup({
    order_id: new FormControl(this.data),
    name: new FormControl(null),
    description: new FormControl(null),
    quantity: new FormControl(null),

  })
}
