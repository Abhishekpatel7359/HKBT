import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/service/email-service';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from 'src/app/service/shared-data.service';

import {
  NavigationExtras,
  ActivatedRoute,
  Router,
  NavigationStart,
} from "@angular/router";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailValid = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,25})$/;
  services: any;
  industries: any 
  siteUrl: any;
  email= '';
  placeholderText: string='';
  language: any;


  jumpSection = [
    { nameEn: 'About', nameAr: ' نبذة عنا', class: 'active', id: 'about' },
    { nameEn: 'Services', nameAr: 'الخدمات', class: '', id: 'services' },
    { nameEn: 'Industries', nameAr: 'الصناعات', class: '', id: 'sector' },
    { nameEn: 'Partner', nameAr: 'الشركاء', class: '', id: 'team' },
    { nameEn: 'News', nameAr: 'الأخبار', class: '', id: 'news'}
  ];
  

  constructor(
    private emailService: EmailService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceProvider: CommonserviceService,
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
    private sharedDataService: SharedDataService,
  ) {
    const url = window.location.href;
    this.siteUrl = url.slice(0, url.lastIndexOf('/'));

    this.translate.onLangChange.subscribe(() => {
      this.setPlaceholderText();
    });

    this.setPlaceholderText();
  }

  ngOnInit() {
    this.language = localStorage.getItem('lang');
    
    // Subscribe to services and industries data from shared service
    this.sharedDataService.services$.subscribe(data => {
      this.services = data;
      console.log("Footer Component - Services:", this.services);
    });

    this.sharedDataService.industries$.subscribe(data => {
      this.industries = data;
      console.log("Footer Component - Industries:", this.industries);
    });

    this.setPlaceholderText();
    this.cdRef.detectChanges();
  }
  

  setPlaceholderText() {
    this.placeholderText = this.translate.getDefaultLang() === 'ar' ? 'أدخل عنوان بريدك الإلكتروني' : 'Enter your email address';
  }
  subscribe(){

    const emailData = {
      to: 'info@hkbt.tech',
      subject: 'Subscribe',
      email: this.email,
      name: '',
      phoneNumber: '',
      message: ''
    };

    this.emailService.sendEmail(emailData).subscribe(response => {
      console.log(response);
      this.email = ''
    });

  }



  async navigate(item: any, id: any, type: any) {
    console.log(item)
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: {type: item.title},
      state: {
        details: item,
      },
    };

    if (type === "I") {
      this.router.navigate(["/industries"], navigationExtras);
    }
    else if(type === "S"){
      this.router.navigate(["/services"], navigationExtras);
    }
  }



 

  // async ngOnInit() {
  //   this.services = await this.serviceProvider.getlocalStorage('Servcies')
  //   this.industries = await this.serviceProvider.getlocalStorage('Industries')

  // }

}
