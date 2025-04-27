import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UsersService } from '../../services/users.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  userName:any = localStorage.getItem('name');
  totalDepartments:any=15;
  totalWorkOrders:any = 30;
  totalusers : number | undefined
  activatedUsers = 0;
  page_size = 5 ;
  page = 1;
  

  constructor(private _UsersService:UsersService , public translate: TranslateService){}

  ngOnInit(): void{
    this.getAllUsers();
    // this.charts()
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: [this.translate.instant('home.totalDepartments'), this.translate.instant('home.totalWorkOrders'), this.translate.instant('users.users')],
        datasets: [
          {
            label: 'Number',
            data: [ 300 , 200 ,100
              // this.totalDepartments,
              // this.totalWorkOrders,
              // this.userName,
            ],
            backgroundColor: ['gray', '#EAB56D', '#009247'],
            hoverOffset: 4,
          },
        ],
      },
    });
    
  }


charts(){
  this.chart = new Chart('canvas', {
    type: 'doughnut',
    data: {
      labels: ['ToDo', 'InProgress', 'Done'],
      datasets: [
        {
          label: 'Number',
          data: [
            this.totalDepartments,
            this.totalWorkOrders,
            this.userName,
          ],
          backgroundColor: ['gray', '#EAB56D', '#009247'],
          hoverOffset: 4,
        },
      ],
    },
  });
}

chart: any = [];

getAllUsers(){
  let params = {
    page_size :this.page_size ,
    page : this.page

  }
  this._UsersService.getAllUsers(params).subscribe(
    (res)=>{
      this.totalusers = res.total
      console.log(this.totalusers)
    }
  )
}
}
