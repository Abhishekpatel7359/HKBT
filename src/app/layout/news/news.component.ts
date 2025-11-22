import { Component, ElementRef, NgZone } from '@angular/core';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import * as flickity from "flickity";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {


  news: any ;

  constructor(
    private elementRef: ElementRef,
    private serviceProvider: CommonserviceService,public translate:TranslateService
  ) {}


  async getNews(){
    const url ='../assets/json/news/news.json'
    this.serviceProvider.getWebService(url).subscribe({
      next: async (response: any) => {
        this.news = response;
        // console.log(response)
      }
      })
  }


  openlink(url: any) {
    window.open(url, "_blank");
  }

  
  loadcarousel() {
    new flickity(this.elementRef.nativeElement.querySelector(".news"), {
      prevNextButtons: true,
      contain: false,
      groupCells: true,
      autoPlay: false,
      adaptiveHeight: true,
      pageDots: false,
    });
  }


  ngAfterViewInit() {
    setTimeout(async() => {
      await this.loadcarousel();
    }, 1000);
  }

  async ngOnInit() {
     await this.getNews()
    }

}
