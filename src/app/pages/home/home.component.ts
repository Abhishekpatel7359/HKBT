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
import { ProductModalComponent } from 'src/app/component/product-modal/product-modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { PdfFlipbookComponent } from 'src/app/pages/pdf-flipbook/pdf-flipbook.component';






@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss", "mobile.scss"],
})
export class HomeComponent implements OnInit {
  emailValid =
    /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,25})$/;
  videoSource = "./assets/video/intro.mp4";
  videolink="./assets/video/e-shirt.mp4";
  pdflink: string | null = null;  // Set type to string or null

  // industries: any = industriesDetails;
  // services: any =  serviceDetails;

  services: any;
  industries: any;
  product:any;
  isPopupOpen = false;
  modalData: any;
  PopupOpen:boolean = false;
  showSuccess: boolean = false

  isMuted: boolean = true; // Initially muted


  toggleMute(videoPlayer: HTMLVideoElement): void {
    this.isMuted = !this.isMuted;
    videoPlayer.muted = this.isMuted; // Sync the video element's muted property
  }
  contactForm = {
    username: "",
    email: "",
    phoneNumber: "",
    selectInquries: "1",
    message: "",
  };

  inquires = [
    { id: "1", nameEn: "Client Opportunities", nameAr: "فرص العملاء" },
    { id: "2", nameEn: "Partners Opportunities", nameAr: "فرص الشراكة" },
  ];
  

  contactDetails = [
    {
      headingEn: "Client Opportunities",
      headingAr: "فرص العملاء",
      descriptionEn:
        "Interested in our services? Know how our services can help your business.",
      descriptionAr:
      "هل أنت مهتم بخدماتنا؟ اكتشف كيف يمكن لخدماتنا أن تساعد في نمو عملك.",
      id: "1",
    },
    {
      headingEn: "Partners Opportunities",
      headingAr: "فرص الشركاء",
      descriptionEn:
        "Interested in partnering with us? Learn how we can collaborate.",
      descriptionAr:
      "هل أنت مهتم بالشراكة معنا؟ اكتشف كيف يمكننا التعاون معًا.",
      id: "2",
    },
  ];

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
    private http: HttpClient, private sanitizer: DomSanitizer

  ) { 

  }
  // loadPdf() {
  //   this.http.get('./assets/video/hkb_pdf.pdf', { responseType: 'blob' })
  //    .subscribe((blob) => {
  //       this.pdflink = URL.createObjectURL(blob);
  //       console.log("done===",this.pdflink);  // Check if pdflink is a valid URL
  //     }, error => {
  //       console.error('Failed to load PDF:', error);
  //     });
  // }
  pdfPoup(){
    this.PopupOpen=true;
    // alert("hello" + this.PopupOpen);
    // console.log(object);

  }
  Popupclose() {
    this.PopupOpen = false;
  }
  

  presentModal(item: any) {
    this.modalData = this.modalService.open(ProductModalComponent, {
      fullscreen: true,
      animation: true,
      scrollable: true,
    });
    // this.modalData.componentInstance.teamDetails = item;
    // console.log("item iss",item);
   
  }
  openPdf(){
    this.modalData = this.modalService.open(PdfFlipbookComponent, {
      fullscreen: true,
      animation: true,
      scrollable: true,
    });

  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  activeInquiry(item: any) {
    this.contactForm.selectInquries = item.id;
  }

  loadcarousel() {

    new flickity(this.elementRef.nativeElement.querySelector(".services"), {
      prevNextButtons: true,
      contain: true,
      groupCells: 1,
      autoPlay: false,
      pageDots: false,
    });

    new flickity(
      this.elementRef.nativeElement.querySelector(".sector-navigation"),
      {
        contain: true,
        pageDots: false,
        autoPlay: false,
        prevNextButtons: false,
        asNavFor: ".carousel-main",
      }
    );

    new flickity(
      this.elementRef.nativeElement.querySelector(".carousel-main"),
      {
        pageDots: false,
        prevNextButtons: true,
        autoPlay: false,
        adaptiveHeight: false,
        setGallerySize: true,
      }
    );


  }

  async navigate(item: any, id: any, type: any) {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { type: item.title },
      state: {
        details: item,
      },
    };

    if (type === "I") {
      this.router.navigate(["/industries"], navigationExtras);
    }
    else if (type === "S") {
      this.router.navigate(["/services"], navigationExtras);
    }
  }

  async getServices() {
    const language = localStorage.getItem("lang")
    if(language=="en"){
      const url = '../assets/json/services/services.json'
      this.serviceProvider.getWebService(url).subscribe({
        next: async (response: any) => {
          this.services = response;
          localStorage.setItem('Services', JSON.stringify(response));
          this.cdRef.detectChanges();
        }
      })
    }else{
      const url = '../assets/json/services/services_ar.json'
      this.serviceProvider.getWebService(url).subscribe({
        next: async (response: any) => {
          this.services = response;
          localStorage.setItem('Services', JSON.stringify(response));
          this.cdRef.detectChanges(); // Trigger change detection
        }
      })
    }
  }

  async getindustries() {
    const language = localStorage.getItem("lang")
    if (language=="en"){
      const url = '../assets/json/industries/industries.json'
      this.serviceProvider.getWebService(url).subscribe({
        next: async (response: any) => {
          console.log("Data received from JSON:", response); 

          this.industries = response;
          localStorage.setItem('Industries', JSON.stringify(response));
          this.cdRef.detectChanges();
        }
      })
    }else{
      const url = '../assets/json/industries/industries_ar.json'
      this.serviceProvider.getWebService(url).subscribe({
        next: async (response: any) => {
          this.industries = response;
          
          localStorage.setItem('Industries', JSON.stringify(response));
          this.cdRef.detectChanges();
        }
      })
    }
  }
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

  async sendEmail() {
    const emailData = {
      to: "info@hkb.sa",
      cc: 'subhankit@easehawk.com',
      subject: "Contact Us",
      name: this.contactForm.username,
      email: this.contactForm.email,
      phoneNumber: this.contactForm.phoneNumber,
      message: this.contactForm.message,
    };
    
    this.emailService.sendEmail(emailData).subscribe((response) => {
      this.showSuccess = true
      setTimeout(()=>{this.showSuccess=false},6000)
      this.contactForm = {
        username: "",
        email: "",
        phoneNumber: "",
        selectInquries: "1",
        message: "",
      };
    });
  }

  ngAfterViewInit() {
    setTimeout(async () => {
      this.loadcarousel();
    }, 1000);
    const video: HTMLVideoElement | null = document.getElementById('videoPlayer') as HTMLVideoElement;
    if (video) {
      video.muted = false; // Ensure video starts with sound
      video.play().catch((error) => {
        console.error('Autoplay with sound failed:', error);
      });
    }
  
  }

  async ngOnInit() {
    await this.getServices();
    await this.getindustries();
    await this.getProducts();
    // this.loadPdf();

  }
}
