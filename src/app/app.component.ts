import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 langu = localStorage.getItem('lang');
  constructor(public translate: TranslateService) {
    if(localStorage.getItem('lang')==null){
    }
    this.onChangeLang(this.langu)
    
}

onChangeLang(lang: any){
  this.translate.setDefaultLang(lang)
  this.translate.use(lang)
  localStorage.setItem('lang',lang)
}
  title = 'work_orders';
}
