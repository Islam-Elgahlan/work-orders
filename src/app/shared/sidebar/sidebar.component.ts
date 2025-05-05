import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';


interface Imenu {
  title: any,
  icon: string,
  link: string,
  isActive:boolean

}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() isOpenedflag = new EventEmitter<boolean>();
  isOpened: boolean = true;
  constructor(public translate: TranslateService,
    public _HelperService: HelperService,
    private _Router: Router,
    private _AuthService: AuthService) { }

  ngOnInit() {
    // console.log(this.isEngineer())
    
    if (this.isAdmin()) {
      // this._Router.navigate(['/dashboard/admin/home'])
    } else {
      // this._Router.navigate(['/dashboard/engineer/home'])
    }
  }


  toggleSidebar() {
    this.isOpened = !this.isOpened;

    this.isOpenedflag.emit(this.isOpened)
  }
  isAdmin(): boolean {
    if (this._AuthService.title == 'Admin') {
      return this._AuthService.title == 'Admin'
    } else {
      return false
    }
  }
  isEngineer(): boolean {
    if (this._AuthService.title == 'Engineer') {
      return this._AuthService.title == 'Engineer'
    } else {
      return false
    }
  }
  isTechnician(): boolean {
    if (this._AuthService.title == 'Technician') {
      return true
    } else {
      return false
    }
  }

  menu: any[] = [
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/admin/home',
      isActive: this.isAdmin()
    },
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/engineer/home',
      isActive: this.isEngineer()
    },
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/technician/home',
      isActive: this.isTechnician()
    },
    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: this.translate.instant('sidebar.workOrders'),
      link: '/dashboard/admin/work-orders',
      isActive: this.isAdmin()
    },

    {
      icon: 'fa-solid fa-users fs-4',
      title: this.translate.instant('sidebar.users'),
      link: '/dashboard/admin/users',
      isActive: this.isAdmin()
    },
    {
      icon: 'fa-solid fa-list-check fs-4',
      title: this.translate.instant('sidebar.departments'),
      link: '/dashboard/admin/departments',
      isActive: this.isAdmin()
    },
    {
      icon: 'fa-solid fa-building fs-4',
      title: this.translate.instant('sidebar.building'),
      link: '/dashboard/admin/building',
      isActive: this.isAdmin()
    },
    {
      icon: 'fa-brands fa-osi fs-4',
      title: this.translate.instant('sidebar.sources'),
      link: '/dashboard/admin/sources',
      isActive: this.isAdmin()
    },

    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: this.translate.instant('sidebar.myorders'),
      link: '/dashboard/engineer/work-orders',
      isActive: this.isEngineer()
    },
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.myorders'),
      link: '/dashboard/technician/work-orders',
      isActive: this.isTechnician()
    },

  ]
}
