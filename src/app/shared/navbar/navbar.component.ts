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
    name: string | null = '';
    email: string | null = '';
    hidden = false;
    notifications: any[] = [];
    notificationTotal: number = 0;
    displayedNotifications: any[] = [];

    ngOnInit() {
      this.getCurrentUser();
      this.getNotifications();
    }

    constructor(
      private _Router: Router,
      public dialog: MatDialog,
      public _HelperService: HelperService
    ) {}

    logOut() {
      const dialogRef = this.dialog.open(LogoutComponent);
    }

    onChangeLang(lang: string) {
      this._HelperService.onChangeLang(lang);
      window.location.reload();
    }

    getCurrentUser() {
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
    }

    getNotifications() {
      this._HelperService.getNotifications().subscribe(
        (response) => {
          if (response.success) {
            // استخراج البيانات من response.data
            this.notifications = response.data.map((item: any) => ({
              orderId: item.id,
              icon: item.is_read ? 'assignment_turned_in' : 'assignment',
              title: item.title,
              message: item.body,
              time: this.formatTime(item.created_at),
            }));
            this.notificationTotal = this.notifications.length;
            this.displayedNotifications = this.notifications.slice(0, 5); // عرض أول 5 إشعارات
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
      const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // الفرق بالثواني

      if (diff < 60) return 'الآن';
      if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
      if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
      return `منذ ${Math.floor(diff / 86400)} يوم`;
    }

    toggleBadgeVisibility() {
      this.hidden = !this.hidden;
    }

    viewAllNotifications() {
      this._Router.navigate(['/notifications']);
    }

    navigateToOrder(orderId: number) {
      console.log('Go to order with ID:', orderId);
    }
  }
