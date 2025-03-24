import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/services/helper.service';


interface Imenu{
  title:any,
  icon:string,
  link:string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(public translate: TranslateService , public _HelperService:HelperService){}
  @Output() isOpenedflag = new EventEmitter<boolean>();
  isOpened:boolean=true;

  toggleSidebar(){
    this.isOpened=!this.isOpened;
  
    this.isOpenedflag.emit(this.isOpened)
  }


  menu:any[]=[
    { icon:'fa-solid fa-house fs-4',
    title:this.translate.instant('sidebar.home'),
    link:'/dashboard/admin/home',
    // isActive: this.isManager()
  },
    { icon:'fa-solid fa-house fs-4',
    title:this.translate.instant('sidebar.home'),
    link:'/dashboard/employee/home',
    // isActive: this.isEmployee()
  },
    { icon:'fa-solid fa-layer-group fs-4',
    title:this.translate.instant('sidebar.workOrders'),
    link:'/dashboard/admin/work-orders',
    // isActive:this.isManager()
  },
  
    { icon:'fa-solid fa-users fs-4',
    title:this.translate.instant('sidebar.users'),
    link:'/dashboard/admin/users',
    // isActive:this.isManager()
  },
  { icon:'fa-solid fa-users fs-4',
    title:this.translate.instant('sidebar.departments'),
    link:'/dashboard/admin/departments',
    // isActive:this.isManager()
  },
   
    { icon:'fa-solid fa-layer-group fs-4',
    title:this.translate.instant('sidebar.myorders'),
    link:'/dashboard/employee/projects',
    // isActive:this.isEmployee()
  },
  
  
  ]
}
