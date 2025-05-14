import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent {
  notifications: any[] = [];
  title = localStorage.getItem('title')?.toLowerCase();
  constructor(private _HelperService: HelperService, private _Router: Router) {}
  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this._HelperService.getAllNotifications().subscribe(
      (response) => {
        if (response.success) {
          this.notifications = response.data.map((item: any) => ({
            orderId: item.id,
            icon: item.is_read ? 'assignment_turned_in' : 'assignment',
            title: item.title,
            message: item.body,
            time: this.formatTime(item.created_at),
          }));
        }
      },
      (error) => {
        console.error('Error fetching all notifications:', error);
      }
    );
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'الآن';
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
    return `منذ ${Math.floor(diff / 86400)} يوم`;
  }

  openNotification(orderId: number) {
    this._Router.navigate([
      `dashboard/${this.title}/work-orders/edit-order/${orderId}`,
    ]);
  }
}
