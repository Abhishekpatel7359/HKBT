import { Component } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-description',
  templateUrl: './blog-description.component.html',
  styleUrls: ['./blog-description.component.scss']
})
export class BlogDescriptionComponent {

  details: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public translate:TranslateService
  ) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.details = this.router.getCurrentNavigation()?.extras.state?.['details']  
      // window.scrollTo(0, 0);
    })
  }


}
