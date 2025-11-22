import { Component, Input } from '@angular/core';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { TranslateService } from '@ngx-translate/core';
import {
  NavigationExtras,
  ActivatedRoute,
  Router,
  NavigationStart,
} from "@angular/router";

@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent {

  @Input() casestudyPageParent: any;
  caseStudy: any;

  constructor(
    private serviceProvider:  CommonserviceService,
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router 
    ) {}



    async getcaseStudy(page:any){
      const url = page === 'SMARTCITY' ? '../assets/json/smart-city/casestudy-SmartCity.json' : '../assets/json/conversational-ai/casestudy-ai.json'

      this.serviceProvider.getWebService(url).subscribe({
        next: async (response: any) => {
          this.caseStudy = response
        }

        })
    }

    
  async ngOnInit() {
    await this.getcaseStudy(this.casestudyPageParent)
  }


    async navigate(item: any) {
      window.open(item.url, "_blank");
    }

}
