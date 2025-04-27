import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/admin/services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

interface Account_type {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})

export class ViewUserComponent {
  constructor(
    private _AuthService: AuthService,
    private _UsersService:UsersService,
    private _ToastrService: ToastrService,
    private _activateRoute:ActivatedRoute,
    private _HelperService: HelperService,
    private spinner: NgxSpinnerService
  ) { 
  this.userId=_activateRoute.snapshot.paramMap.get('id')

  }
  ngOnInit() {
    this.getCurrentUserById(this.userId)
    this.getTitles()
  }

  types: Account_type[] = [
    {value: 0, viewValue: 'Admin'},
    {value: 1, viewValue: 'Engineer'},
    {value: 2, viewValue: 'Technician'},
  ];
    currentUser: any;
    userType: any;
    titles:any
    userId:any;
    hide: boolean = true;
    confirmHide: boolean = true;
    hideRequiredMarker: boolean = true;
    editProfileForm = new FormGroup(
      {
        name: new FormControl(null, [Validators.required,]),
        title: new FormControl(null, [Validators.required,]),
        // user_name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-z]{3,10}[0-9]{1,5}$/)]),
        email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
        mobile: new FormControl(null, [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(13),
        ]),
        account_type: new FormControl(null),
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
            this._ToastrService.success('User Profile Updated', 'Updated');
            // this._Router.navigate([`/dashboard/${this.role}/home`]);
            this.spinner.hide()
          },
          (error) => {
            this._ToastrService.error(error.error.message, 'Error in Update');
            this.spinner.hide()
          }
        );
      }
    
      getCurrentUserById(id:number) {
        this._UsersService.getUser(id).subscribe(
          (res) => {
            this.currentUser = res.data
            this.userType = this.currentUser.account_type 
            this.titles = this.currentUser.title
            // console.log(this.currentUser)
            // console.log(this.userType)
            // console.log(this.titles.id)


            this.editProfileForm.patchValue({
              name: this.currentUser?.name,
              title: this.titles.id,
              email: this.currentUser?.email,
              account_type: this.userType,
              // user_name: this.currentUser?.user_name,
              mobile: this.currentUser?.mobile,
              password_confirmation: this.currentUser?.password_confirmation,
            })
            
          })
      }
      getTitles(){
        this._UsersService.onGetAccountType().subscribe(
          (res) => {
            this.titles = res.data
            console.log(this.titles)
          }
        )
      }
}
