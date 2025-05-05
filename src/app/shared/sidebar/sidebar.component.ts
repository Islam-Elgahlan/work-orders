import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

interface Imenu {
  title: any;
  icon: string;
  link: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() isOpenedflag = new EventEmitter<boolean>();
  isOpened: boolean = true;

  // المتغيرات الخاصة باليوزر
  name: string | null = '';
  email: string | null = '';
  role: string | null = '';
  image: string = '../../../assets/images/admin-img.webp';

  constructor(
    public translate: TranslateService,
    public _HelperService: HelperService,
    private _Router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit() {
<<<<<<< HEAD
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.role = this._AuthService.title || localStorage.getItem('role');

    if (this.isAdmin()) {
      this._Router.navigate(['/dashboard/admin/home']);
    } else if (this.isEngineer()) {
      this._Router.navigate(['/dashboard/engineer/home']);
    } else {
      this._Router.navigate(['/dashboard/technicians/home']);
=======


    if (this.isAdmin()) {
      this._Router.navigate(['/dashboard/admin/home'])
    } else if(this.isEngineer()) {
      this._Router.navigate(['/dashboard/engineer/home'])
    } else{
      this._Router.navigate(['/dashboard/technicians/home'])
>>>>>>> c2bb48a72b039a165a7fb03845b19df609a971e9
    }
  }

  toggleSidebar() {
    this.isOpened = !this.isOpened;
    this.isOpenedflag.emit(this.isOpened);
  }

  isAdmin(): boolean {
<<<<<<< HEAD
    return this._AuthService.title === 'Admin';
=======
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
    if (this._AuthService.title == 'Worker') {
      return true
    } else {
      return false
    }
>>>>>>> c2bb48a72b039a165a7fb03845b19df609a971e9
  }

  isEngineer(): boolean {
    return this._AuthService.title === 'Engineer';
  }

  isTechnician(): boolean {
    return (
      this._AuthService.title === 'Technician' ||
      this._AuthService.title === 'Worker'
    );
  }

  menu: Imenu[] = [
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/admin/home',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/engineer/home',
      isActive: this.isEngineer(),
    },
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.home'),
      link: '/dashboard/technicians/home',
<<<<<<< HEAD
      isActive: this.isTechnician(),
=======
      isActive: this.isTechnician()
>>>>>>> c2bb48a72b039a165a7fb03845b19df609a971e9
    },
    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: this.translate.instant('sidebar.workOrders'),
      link: '/dashboard/admin/work-orders',
      isActive: this.isAdmin(),
    },
    {
      icon: 'fa-solid fa-users fs-4',
      title: this.translate.instant('sidebar.users'),
      link: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
<<<<<<< HEAD
      icon: 'fa-solid fa-sitemap fs-4',
=======
      icon: 'fa-solid fa-list-check fs-4',
>>>>>>> c2bb48a72b039a165a7fb03845b19df609a971e9
      title: this.translate.instant('sidebar.departments'),
      link: '/dashboard/admin/departments',
      isActive: this.isAdmin(),
    },
<<<<<<< HEAD
=======
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
      icon: 'fa-solid fa-toolbox fs-4',
      title: this.translate.instant('sidebar.equipments'),
      link: '/dashboard/admin/equipments',
      isActive: this.isAdmin()
    },

>>>>>>> c2bb48a72b039a165a7fb03845b19df609a971e9
    {
      icon: 'fa-solid fa-layer-group fs-4',
      title: this.translate.instant('sidebar.myorders'),
      link: '/dashboard/engineer/work-orders',
      isActive: this.isEngineer(),
    },
    {
      icon: 'fa-solid fa-house fs-4',
      title: this.translate.instant('sidebar.myorders'),
      link: '/dashboard/technicians/work-orders',
<<<<<<< HEAD
      isActive: this.isTechnician(),
=======
      isActive: this.isTechnician()
>>>>>>> c2bb48a72b039a165a7fb03845b19df609a971e9
    },
  ];
}
