import { Component, ElementRef } from '@angular/core';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { TranslateService } from '@ngx-translate/core';
import {
  NavigationExtras,
  ActivatedRoute,
  Router,
  NavigationStart,
} from "@angular/router";
import * as flickity from "flickity";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent {
  blogs: any;

  constructor(
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceProvider: CommonserviceService,
    public translate:TranslateService
    ) {}


      
  loadcarousel() {
    new flickity(this.elementRef.nativeElement.querySelector(".blog"), {
      prevNextButtons: true,
      contain: false,
      groupCells: true,
      autoPlay: false,
      adaptiveHeight: true,
      pageDots: false,
    });
  }

    
  async getBlog(){
    const url ='../assets/json/blog/blogs.json'
    this.serviceProvider.getWebService(url).subscribe({
      next: async (response: any) => {
        this.blogs = response;
      }
      })
  }


    async navigate(item: any, id: any, type: any) {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.activatedRoute,
        queryParams: {type: item.title},
        state: {
          details: item,
        },
      };
      this.router.navigate(["/blog-description"], navigationExtras);

    
    }


    ngAfterViewInit() {
      setTimeout(async() => {
        await this.loadcarousel();
      }, 1000);
    }


    async ngOnInit() {
      await this.getBlog()
     }


}
