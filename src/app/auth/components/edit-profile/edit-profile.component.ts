import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  constructor(
    private _activateRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _HelperService: HelperService,
    private spinner: NgxSpinnerService
  ) {
    this.userId = this._activateRoute.snapshot.paramMap.get('id')
  }
  ngOnInit() {

    this.getCurrentUser()
    this.getUserById(this.userId);
  }
  userId: any;
  user:any
  currentUser: any;
  hide: boolean = true;
  confirmHide: boolean = true;
  hideRequiredMarker: boolean = true;
  editProfileForm = new FormGroup(
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
  onEdit(data: FormGroup) {
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }



    this.spinner.show()
    this._AuthService.onEditProfile(myData).subscribe(
      (res) => {
        this._ToastrService.success('Your Profile Updated', 'Updated');
        // this._Router.navigate([`/dashboard/${this.role}/home`]);
        this.spinner.hide()
      },
      (error) => {
        this._ToastrService.error(error.error.message, 'Error in Update');
      }
    );
  }

  getCurrentUser() {
    this._HelperService.getCurrentUser().subscribe(
      (res) => {
        this.currentUser = res.data
        console.log(this.currentUser)
        this.editProfileForm.patchValue({
          name: this.currentUser?.name,
          email: this.currentUser?.email,
          user_name: this.currentUser?.user_name,
          phoneNumber: this.currentUser?.phoneNumber,
          password_confirmation: this.currentUser?.password_confirmation,
        })
      })
  }
  getUserById(id:number){
    this._AuthService.getUserById(id).subscribe(
      (res)=>{
        this.user = res.data
      }
    )
  }
}
