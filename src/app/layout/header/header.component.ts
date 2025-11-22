import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { EventsService } from 'src/app/service/events.service';
import {
  NavigationExtras,
  ActivatedRoute,
  Router,
  NavigationStart,
} from "@angular/router";
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  language: any = null;


  services: any;
  industries: any
  product: any;
  MenuItems = [
    { name: 'ABOUT US', id: 'about' },
    { name: 'SERVICES', class: '', id: 'services' },
    { name: 'INDUSTRIES', class: '', id: 'sector' },

    { name: 'BLOGS', class: '', id: 'blog' },
    { name: 'CONTACT US', class: '', id: 'contact' },
    { name: 'Smart City', class: '', id: 'contact' },
    { name: 'OUR PRODUCTS', class: '', id: 'products' },

  ]



  constructor(
    public events: EventsService,
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceProvider: CommonserviceService,
    private cdRef: ChangeDetectorRef,
    private sharedDataService: SharedDataService
  ) { }

 


  closeNavbar() {
    const navbarToggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
    const navbarCollapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
      // Check if the mobile navbar collapse is open
      if (navbarCollapse.classList.contains('show')) {
        // Click the navbar toggler to close the collapse
        navbarToggler.click();
      }
    }

  }
  


  // async navigate(item: any, id: any, type: any) {
  //   console.log(item)
  //   const navbarToggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
  //   navbarToggler.click();

  //   const navigationExtras: NavigationExtras = {
  //     relativeTo: this.activatedRoute,
  //     queryParams: { type: item.title },
  //     state: {
  //       details: item,
  //     },
  //   };

  //   if (type === "B") {
  //     this.router.navigate(["/blog"], navigationExtras);
  //   } else if (type === "I") {
  //     this.router.navigate(["/industries"], navigationExtras);
  //   }
  //   else if (type === "S") {
  //   if (item.Dpage === true) {
  //       this.router.navigate(["/conversational-ai"], navigationExtras);
  //     }
  //     else {
  //       this.router.navigate(["/services"], navigationExtras);
  //     }


  //   }

  //   else if (type === "C") {
  //     this.router.navigate(["/smart-city"]);
  //   }

  //   else if (type === "P") {
  //     this.router.navigate(["/our-products"], navigationExtras);
  //   }

  // }
  async navigate(item: any, id: any, type: any) {
    console.log(item)
    const navbarToggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
    navbarToggler.click();

    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { type: item.title },
      state: {
        details: item,
      },
    };

    if (type === "B") {
      this.router.navigate(["/blog"], navigationExtras);
    } else if (type === "I") {
      this.router.navigate(["/industries"], navigationExtras);
    }
    else if (type === "S") {
    if (item.Dpage === true) {
        this.router.navigate(["/conversational-ai"], navigationExtras);
      }
      else {
        this.router.navigate(["/services"], navigationExtras);
      }


    }

    else if (type === "C") {
      this.router.navigate(["/smart-city"]);
    }

    else if (type === "P") {
      this.router.navigate(["/our-products"], navigationExtras);
    }
    else if(type == "A"){
      this.router.navigate(["/about-us"]);
    }

  }


  switchlang(lang: any) {
    this.router.navigate(['/']).then(() => {
      window.location.href = '/';
    });
    if (this.language !== localStorage.getItem('lang')) {
      this.events.publish('language:languageChanged', this.language);
    }
    const htmlSelect: any = document.querySelector("html");

    if (this.language = lang === 'en') {
      htmlSelect.setAttribute("dir", "ltr");
      htmlSelect.setAttribute("lang", "en");
      localStorage.setItem('lang', 'en')
      this.language = localStorage.getItem('lang');
     
    } else {
      
      htmlSelect.setAttribute("dir", "rtl");
      htmlSelect.setAttribute("lang", "ar");
      localStorage.setItem('lang', 'ar')
      this.language = localStorage.getItem('lang');
      // $("#arebic").css("padding", "0px 23px 0px 0px");

    }
    window.location.reload();
    this.cdRef.detectChanges();
  }


  async ngOnInit() {
    this.language = localStorage.getItem('lang');
    if (this.language  === 'ar') {
      $("#img").css("margin", "0px -26px");
      $("#heading").css("padding", "0px 63px 0px 0px");
      $("#google").css("padding", "0px 0px 0px -25px");
      $("#google").css("margin", "0px -14px 0px 0px");
      $("#arebic").css("padding", "0px 0px 0px 0px");
      $("#arebic").css("margin", "0px 0px -4px -63px");

      $("#aws").css("margin", "-4px -19px 0px 0px");
      $("#nvdia").css("margin", "0px -22px 0px 0px");
      $("#g").css("margin", "0px 0px -4px -23px");
      $("#googleimg").css("margin", "0px 5px -4px -68px");
      $("#awsimg").css("margin", "0px -14px 0px 0px");
      $("#nvdiaimg").css("margin", "0px -25px 0px 0px");
      $("#logo").css("margin", "0px -15px");




    } else{
      $("#arebic").css("padding", "0px 12px 0px 0px");
      $("#nvdiaimg").css("margin", "0px 0px 0px -18px");
      $("#awsimg").css("margin", "0px 0px 0px -9px");


    }
    
    setTimeout(async () => {
      try {
        const services = await this.serviceProvider.getlocalStorage('Services');
        const industries = await this.serviceProvider.getlocalStorage('Industries');
        const product = await this.serviceProvider.getlocalStorage('product');


        this.industries = industries
        this.services = services
        this.product = product
        this.sharedDataService.services = services; // Store in shared service
        this.sharedDataService.industries = industries; // Store in shared service
        this.sharedDataService.product = product; // Store in shared service

        
        
        
        console.log("Header Component - Services:", services);
        console.log("Header Component - Industries:", industries);
        console.log("Header Component - product:", product);

     


      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 1000);
  }
  
}
