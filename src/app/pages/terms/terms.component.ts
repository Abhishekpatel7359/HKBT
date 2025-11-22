import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public translate:TranslateService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      window.scrollTo(0, 0);
    })
    
   }
   getContactInfo(): string {
    return this.translate.getDefaultLang() === 'ar'
      ? 'إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على <a href="mailto:info@hkbt.tech">info@hkbt.tech</a>'
      : 'If you have any questions about these Terms, please contact us at <a href="mailto:info@hkbt.tech">info@hkbt.tech</a>';
  }

  ngOnInit(): void {
  }

}
