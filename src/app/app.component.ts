import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from './service/events.service';
import * as Aos from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  language:any;
  dirSide = 'ltr';

  constructor(
    public translate: TranslateService,
    public events: EventsService,

  ) {
    this.initTranslate();
    events.subscribe('language:languageChanged', (data) => {
      this.changeLanguage();
    });
    events.subscribe('first:launched', (data) => {
    });}

changeLanguage() {
  this.dirSide = this.dirSide === 'ltr' ? 'rtl' : 'ltr';
  this.language = this.dirSide === 'ltr' ? 'en' : 'ar';
  this.translate.setDefaultLang(this.language);
  this.translate.use(this.language);
  localStorage.setItem('lang', this.language);
}

async initTranslate() {
  // Set the default language for translation strings, and the current language.
  this.language = localStorage.getItem('lang') == null ? 'en' : localStorage.getItem('lang');
  this.language = this.language == null ? 'en' : this.language;
  this.translate.setDefaultLang(this.language);
  this.translate.use(this.language);
  localStorage.setItem('lang', this.language);
  const htmlSelect: any  = document.querySelector("html");

  if (this.language === 'en') {
    htmlSelect.setAttribute("dir", "ltr");
    htmlSelect.setAttribute("lang", "en");
    // this.dirSide = 'ltr';
  } else {
    // this.dirSide = 'rtl';
    htmlSelect.setAttribute("dir", "rtl");
    htmlSelect.setAttribute("lang", "ar");

    
  }
}

  ngAfterViewInit(): void {
    Aos.init();

    // setTimeout(() => {
    //   this.loader = false

    // }, 3000);

    }

}
