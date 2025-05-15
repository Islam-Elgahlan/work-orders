import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent {
  notifications: any[] = [];
  constructor(private _HelperService: HelperService) {}
  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this._HelperService.getNotifications().subscribe(
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
}
