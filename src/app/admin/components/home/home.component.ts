import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UsersService } from '../../services/users.service';
import { TranslateService } from '@ngx-translate/core';
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        query('.chart-item', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(200, [
            animate(
              '800ms ease-out',
              keyframes([
                style({ opacity: 0, transform: 'scale(0.8)', offset: 0 }),
                style({ opacity: 0.5, transform: 'scale(1.05)', offset: 0.7 }),
                style({ opacity: 1, transform: 'scale(1)', offset: 1.0 }),
              ])
            ),
          ]),
        ]),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  userName: any = localStorage.getItem('name');
  totalDepartments: any = 15;
  totalWorkOrders: any = 30;
  totalusers: number | undefined;
  activatedUsers = 0;
  page_size = 5;
  page = 1;
  chart: any;

  constructor(
    private _UsersService: UsersService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef // إضافة ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.createChart();
  }

  createChart() {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: [
          this.translate.instant('home.totalDepartments'),
          this.translate.instant('home.totalWorkOrders'),
          this.translate.instant('users.users'),
        ],
        datasets: [
          {
            label: 'Number',
            data: [
              this.totalDepartments,
              this.totalWorkOrders,
              this.totalusers || 0,
            ],
            backgroundColor: ['gray', '#EAB56D', '#009247'],
            hoverOffset: 4,
            borderWidth: 2,
            borderColor: '#fff',
          },
        ],
      },
      options: {
        animation: {
          duration: 2500,
          easing: 'easeInOutCubic',
          animateRotate: true,
          animateScale: true,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#333', font: { size: 14 } },
          },
        },
      },
    });
  }

  getAllUsers() {
    let params = {
      page_size: this.page_size,
      page: this.page,
    };
    this._UsersService.getAllUsers(params).subscribe((res) => {
      this.totalusers = res.total;
      console.log(this.totalusers);
      this.createChart(); // تحديث الـ chart
      this.cdr.markForCheck(); // إجبار الكشف عن التغييرات
    });
  }
}
