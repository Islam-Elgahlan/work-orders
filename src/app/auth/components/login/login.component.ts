import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  ngOnInit(){
    localStorage.setItem('lang' , 'en')
  }
  hide: boolean = true;
  hideRequiredMarker: boolean = true;
  data:any
  ress:any
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Route: Router
  ) { }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl(null, [
      Validators.required,
      // Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
    ]),
  })

  onSubmit(data: FormGroup) {
    console.log(data.value)
    this._AuthService.onLogin(data.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.data.token)

        this.ress=res
        this.data = res.data
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Error!');

      },
      complete: () => {
        this._AuthService.getProfile();
        this._Route.navigate(['/dashboard/admin/home']); 
        localStorage.setItem('name', this.data.name)
        localStorage.setItem('email', this.data.email)


        this._ToastrService.success(this.ress.message,`hello ${this.data.name}`)
      }
    })
  }
}
