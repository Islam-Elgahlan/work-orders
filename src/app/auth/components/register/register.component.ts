import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide: boolean = true;
  confirmHide: boolean = true;
  hideRequiredMarker: boolean = true;

  data: any
  ress: any


  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    public _MatDialog: MatDialog,
  ) { }



  registerForm = new FormGroup(
    {
      name: new FormControl(null, [Validators.required,]),
      user_name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-z]{3,10}[0-9]{1,5}$/)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(13),
      ]),
      // profileImage: new FormControl(null),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password_confirmation: new FormControl(null, [Validators.required])
    },
    {
      validators: this.matchValidator('password', 'password_confirmation'),
    }
  );

  matchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (
        matchingControl!.errors &&
        !matchingControl!.errors?.['confirmedValidator']
      ) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }


  onRegister(data: FormGroup) {
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }



    this._AuthService.onRegister(myData).subscribe({

      next: (res) => {
        this.data = res
        this._ToastrService.success(
          res.data.email,
          'Check yor Email to Verify'
        );
      },
      error: (err) => {
        this._ToastrService.error(
          err.message,
          'Error in Registeration'
        );
      },
      complete: () => {
        this._Router.navigate(['/auth']);
      }
    });
  }
}
