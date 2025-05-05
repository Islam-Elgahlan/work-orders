import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TranslateService } from '@ngx-translate/core';
import { WorkOrdersService } from '../../work-orders/services/work-orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: any = localStorage.getItem('name');
  userId: any = localStorage.getItem('id');

  totalDepartments: any = 15;
  totalWorkOrders: any = 30;
  totalOrders: number | undefined
  activatedUsers = 0;
  page_size = 5;
  page = 1;


  constructor(
    private _WorkOrdersService: WorkOrdersService,
    public translate: TranslateService) {
     }

  ngOnInit(): void {
    this.getAllOrders();
    // this.charts()
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: [this.translate.instant('home.totalDepartments'), this.translate.instant('home.totalWorkOrders'), this.translate.instant('users.users')],
        datasets: [
          {
            label: 'Number',
            data: [300, 200, 100
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


  charts() {
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

  getAllOrders() {
    let params = {
      page_size: this.page_size,
      page: this.page

    }
    this._WorkOrdersService.getAllOrders(this.userId, params).subscribe(
      (res) => {
        this.totalOrders = res.total
        console.log(this.totalOrders)
      }
    )
  }
}
