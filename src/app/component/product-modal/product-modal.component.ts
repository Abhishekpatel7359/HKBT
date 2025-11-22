import { Component, OnInit, ElementRef, NgZone, ChangeDetectorRef } from "@angular/core";
import {
  NavigationExtras,
  ActivatedRoute,
  Router,
  NavigationStart,
} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as flickity from "flickity";
import "flickity-as-nav-for";
import { CommonserviceService } from "src/app/service/commonservice.service";
import industriesDetails from "../../../assets/json/industries/industries.json";
// import serviceDetails from "../../../assets/json/services/services.json";
import { EmailService } from "src/app/service/email-service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {

  product:any;

  constructor(
    private serviceProvider: CommonserviceService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    private router: Router,
    private zone: NgZone,
    private elementRef: ElementRef,
    private emailService: EmailService,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private ActiveModal : NgbActiveModal,


  ) { }

  async getProducts() {
    const language = localStorage.getItem("lang");
    if (language=="en"){
    const url = '../assets/json/ourProducts/ourProduct.json' 
               
    this.serviceProvider.getWebService(url).subscribe({
      next: async (response: any) => {
        console.log("Data received from JSON:", response); 

        this.product = response;
        localStorage.setItem('product', JSON.stringify(response));
        this.cdRef.detectChanges();
      }
    })
  }else{
    const url = '../assets/json/ourProducts/ourProduct_ar.json'
    this.serviceProvider.getWebService(url).subscribe({
      next: async (response: any) => {
        this.product = response;
        
        localStorage.setItem('product', JSON.stringify(response));
        this.cdRef.detectChanges();
      }
    })
  }
}
dismiss(){
  this.ActiveModal.close();
}


async ngOnInit() {
 
  await this.getProducts();
}

}
