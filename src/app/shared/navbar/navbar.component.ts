import { Component, ViewEncapsulation } from '@angular/core';
import { LogoutComponent } from './logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  title = localStorage.getItem('title')?.toLowerCase();
  name: string | null = '';
  email: string | null = '';
  hidden = true;
  notifications: any[] = [];
  notificationTotal: number = 0;
  displayedNotifications: any[] = [];
  notificationId: any;
  lang = localStorage.getItem('lang');

  ngOnInit() {
    this.getCurrentUser();
    this.getNotifications();
  }

  constructor(
    private _Router: Router,
    public dialog: MatDialog,
    public _HelperService: HelperService
  ) {}

  toggleLang() {
    const currentLang = this._HelperService.translate.currentLang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    this.onChangeLang(newLang);
  }

  onChangeLang(lang: string) {
    this._HelperService.onChangeLang(lang);
    window.location.reload();
  }

  getCurrentUser() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  logOut() {
    const dialogRef = this.dialog.open(LogoutComponent);
  }
  getNotifications() {
    this._HelperService.getNotifications(1).subscribe(
      (response) => {
        if (response.success) {
          this.notifications = response.data
            // this.notificationId=response.data.id
            .filter((item: any) => item.is_read)
            .map((item: any) => ({
              orderId: item.id,
              icon: item.is_read ? 'assignment_turned_in' : 'assignment',
              title: item.title,
              message: item.body,
              time: this.formatTime(item.created_at),
            }));
          this.notificationTotal = this.notifications.length;
          this.displayedNotifications = this.notifications.slice(0, 5);
        }
      },
      (error) => {
        console.error('Error fetching notifications:', error);
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

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;

    // إذا كانت هذه أول مرة يظهر فيها الدروب داون
    if (!this.hidden) {
      // اعتبر أن جميع الإشعارات قد تمت قراءتها
      this.notificationTotal = 0;
    }
  }

  viewAllNotifications() {
    this._Router.navigate(['/notifications']);
  }

  navigateToOrder(orderId: number) {
    console.log('Go to order with ID:', orderId);
  }

  OpenNotification(id: number) {
    this._Router.navigate([
      `dashboard/${this.title}/work-orders/edit-order/${id}`,
    ]);
  }

  UpdateNotification() {
    this._HelperService.getNotifications(1).subscribe((res) => {});
  }
}

