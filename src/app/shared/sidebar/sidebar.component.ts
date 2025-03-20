import { Component, EventEmitter, Output } from '@angular/core';


interface Imenu{
  title:string,
  icon:string,
  link:string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() isOpenedflag = new EventEmitter<boolean>();
  isOpened:boolean=true;

  toggleSidebar(){
    this.isOpened=!this.isOpened;
  
    this.isOpenedflag.emit(this.isOpened)
  }


  menu:Imenu[]=[
    { icon:'fa-solid fa-house fs-4',
    title:'home',
    link:'/dashboard/admin/home',
    // isActive: this.isManager()
  },
    { icon:'fa-solid fa-house fs-4',
    title:'home',
    link:'/dashboard/employee/home',
    // isActive: this.isEmployee()
  },
    { icon:'fa-solid fa-layer-group fs-4',
    title:'Work Orders',
    link:'/dashboard/admin/work-orders',
    // isActive:this.isManager()
  },
  
    { icon:'fa-solid fa-users fs-4',
    title:'users',
    link:'/dashboard/admin/users',
    // isActive:this.isManager()
  },
  { icon:'fa-solid fa-users fs-4',
    title:'Department',
    link:'/dashboard/admin/departments',
    // isActive:this.isManager()
  },
   
    { icon:'fa-solid fa-layer-group fs-4',
    title:'My Work Orders',
    link:'/dashboard/employee/projects',
    // isActive:this.isEmployee()
  },
  
  
  ]
}
